import { pluginCodeOutput } from "./src/ec-output-plugin.ts"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { readFileSync } from "fs"

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
    plugins: [pluginCodeOutput(), pluginCollapsibleSections()],
    shiki: {
        langs: [JSON.parse(readFileSync("./src/pseudocodigo.json", "utf-8"))],
    },
    defaultProps: {
        collapseStyle: "collapsible-auto",
    },
  }

