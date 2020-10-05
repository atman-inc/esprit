export class InsertFileManager {
  contentLines: string[];

  constructor(content: string) {
    this.contentLines = content.split("\n");
  }

  public beforeInsert(pattern: RegExp, data: string): this {
    const endpoint = this.findEndpoint(pattern);
    this.contentLines.splice(endpoint, 0, data);
    return this;
  }

  public afterInsert(pattern: RegExp, data: string): this {
    const endpoint = this.findEndpoint(pattern);
    this.contentLines.splice(endpoint + 1, 0, data);
    return this;
  }

  public get insertedContent(): string {
    return this.contentLines.join("\n");
  }

  private findEndpoint(pattern: RegExp): number {
    const reversedContentLines = Array.from(this.contentLines).reverse();
    const reversedFilter = reversedContentLines.filter((l) => {
      return l.match(pattern);
    });

    if (reversedFilter.length < 0) {
      return 0;
    }

    return this.contentLines.indexOf(reversedFilter[0]);
  }
}
