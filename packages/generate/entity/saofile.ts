import { GeneratorConfig } from "sao";

const generator: GeneratorConfig = {
  actions() {
    const answers = this.opts.answers as { name: string };

    return [];
  },
};
