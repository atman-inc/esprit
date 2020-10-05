import { classify } from "underscore.string";

export class GenerateFile {
  private namedArray: string[];
  private name: string;
  private classifyName: string;

  constructor(
    name: string,
    private prefix: string,
    private suffix: string = ""
  ) {
    this.namedArray = name.split("/");
    this.name = this.namedArray.pop() as string;
    this.classifyName = classify(this.name);
  }

  public get className(): string {
    return this.classifyName + this.suffix;
  }

  public get importPath(): string {
    return [this.prefix]
      .concat(this.namedArray)
      .concat([this.className])
      .join("/");
  }

  public get filePath(): string {
    return `${this.importPath}.ts`;
  }

  public get importString(): string {
    return `import { ${this.className} } from "${this.importPath}"`;
  }
}
