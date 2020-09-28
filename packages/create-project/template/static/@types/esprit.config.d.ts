interface OpenAPI {
    jsonFilePath: string;
    service: string;
  }
  
  declare module "esprit.config" {
    let name: string;
    let mode: string;
  
    let openAPI: OpenAPI | null;
  }