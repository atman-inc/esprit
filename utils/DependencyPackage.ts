export interface DependencyPackage {
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
}
