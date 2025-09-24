import fs from "fs";
import path from "path";

export default function virtualModules() {
  return {
    name: "virtual-modules",

    resolveId(id: string) {
      if (id === "virtual:plugins") return id;
      return null;
    },

    load(id: string) {
      if (id === "virtual:plugins") {
        const modulesDir = path.resolve(__dirname, "../modules");
        const files = fs.readdirSync(modulesDir);

        return files
          .filter((f) => f.endsWith(".ts"))
          .map((f) => `import "../modules/${f}";`)
          .join("\n");
      }
      return null;
    },
  };
}
