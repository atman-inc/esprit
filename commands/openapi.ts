import Commander, { createCommand } from "commander";
import { config } from "../utils/config";
import { execSync } from "child_process";
import { IndentationText, Project } from "ts-morph";
import path from "path";
import fs from "fs";
import { classify } from "underscore.string";

export function createOpenapiCommand(): Commander.Command {
  const openapiCommand = createCommand().name("openapi");

  openapiCommand.command("update").action(async () => {
    // generate d.ts file from openapi json
    execSync(
      `dtsgen --out ./@types/openapi.d.ts ${config.openAPI.jsonFilePath}`
    );
    console.log("generated: @types/openapi.d.ts");

    // generate service.ts
    const currentDir = process.cwd();
    const project = new Project({
      tsConfigFilePath: path.join(currentDir, "tsconfig.json"),
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
      },
    });
    const serviceFile = project.getSourceFileOrThrow(
      path.join(currentDir, `${config.openAPI.service}.ts`)
    );
    const serviceClass = serviceFile.getClassOrThrow("Service");

    const openapiJSON = JSON.parse(
      fs.readFileSync(
        path.join(currentDir, config.openAPI.jsonFilePath),
        "utf8"
      )
    );
    const openapiPaths = openapiJSON["paths"];

    Object.keys(openapiPaths).forEach((path: string) => {
      const pathObj = openapiPaths[path];
      Object.keys(pathObj).forEach((pathMethod: string) => {
        const endpointObj = pathObj[pathMethod];
        const operationId = endpointObj["operationId"];

        let method = serviceClass.getMethod(operationId);
        if (!method) {
          method = serviceClass.addMethod({
            name: operationId,
          });
        }

        let requestParameter = method.getParameter("req");
        if (requestParameter) requestParameter.remove();
        requestParameter = method.insertParameter(0, {
          name: "req",
          type: (writer) => {
            const genericParameter = requestGenericParameter(
              operationId,
              endpointObj
            );
            if (genericParameter) {
              writer
                .write("FastifyRequest<")
                .inlineBlock(() => {
                  writer.write(genericParameter);
                })
                .write(">");
            } else {
              writer.write("FastifyRequest");
            }
          },
        });
      });
    });

    const securityFile = project.getSourceFileOrThrow(
      path.join(currentDir, `${config.openAPI.security}.ts`)
    );
    const securityClass = securityFile.getClassOrThrow("Security");
    const openapiComponents = openapiJSON["components"];

    if (openapiComponents) {
      const securitySchemes = openapiComponents["securitySchemes"];
      Object.keys(securitySchemes).forEach((securityKey: string) => {
        let method = securityClass.getMethod(securityKey);
        if (!method) {
          method = securityClass.addMethod({ name: securityKey });
        }

        const requestParameter = method.getParameter("req");
        if (requestParameter) requestParameter.remove();
        method.insertParameter(0, { name: "req", type: "FastifyRequest" });
      });
    }

    await project.save();
    console.log(`modified: ${config.openAPI.service}.ts`);
    console.log(`modified: ${config.openAPI.security}.ts`);
  });

  return openapiCommand;
}

function requestGenericParameter(
  operationId: string,
  endpoint: {
    requestBody?: any;
    parameters?: { in: string }[];
  }
): string {
  const generic = [];
  const classifyOperationId = classify(operationId);

  if (endpoint.requestBody) {
    generic.push(`Body: Paths.${classifyOperationId}.RequestBody`);
  }

  if (
    endpoint.parameters &&
    endpoint.parameters.some((p) => {
      return p.in === "path";
    })
  ) {
    generic.push(`Params: Paths.${classifyOperationId}.PathParameters`);
  }

  if (
    endpoint.parameters &&
    endpoint.parameters.some((p) => {
      return p.in === "query";
    })
  ) {
    generic.push(`Querystring: Paths.${classifyOperationId}.QueryParameters`);
  }

  return generic.join(",\n");
}
