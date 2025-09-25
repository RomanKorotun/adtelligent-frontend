import fs from "fs";
import path from "path";
import "dotenv/config";

export default function virtualModules() {
  return {
    name: "virtual-modules",

    resolveId(id: string) {
      if (id === "virtual:plugins") {
        return id;
      }
      return null;
    },

    load(id: string) {
      if (id !== "virtual:plugins") return null;

      const modulesDir = path.resolve(__dirname, "../../src/modules");
      const moduleFolders = fs.existsSync(modulesDir)
        ? fs.readdirSync(modulesDir).filter((f) => {
            const fullPath = path.join(modulesDir, f);
            return (
              fs.statSync(fullPath).isDirectory() &&
              fs.existsSync(path.join(fullPath, "index.js"))
            );
          })
        : [];

      const enabledModules = (process.env.VITE_ENABLED_MODULES || "")
        .split(",")
        .map((m) => m.trim())
        .filter((m) => moduleFolders.includes(m));

      if (enabledModules.length === 0) return "// no enabled modules";

      return enabledModules
        .map((m) => `import "/src/modules/${m}/index.js";`)
        .join("\n");
    },
  };
}
