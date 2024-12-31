// mohdlatif
//
// https://github.com/withastro/adapters/issues/445#issuecomment-2564233900

import type { AstroIntegration } from "astro";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Utility function for formatted logging
function formatLog(tag: string, message: string) {
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });

  // eslint-disable-next-line no-console
  console.log(
    "\n" + // Add space above
      `\x1b[90m${timestamp}\x1b[0m ` + // Gray timestamp
      `[\x1b[36m${tag}\x1b[0m] ` + // Cyan colored tag
      `${message}` + // Message
      "\n", // Add space below
  );
}

async function copyFiles(srcDir: string, destDir: string) {
  const files = await fs.readdir(srcDir);

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyFiles(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

export function CopyFilesPlugin(): AstroIntegration {
  return {
    hooks: {
      "astro:build:done": async ({ dir }) => {
        formatLog("copy-files", "Copying files to .vercel/output/static");

        const distDir = fileURLToPath(dir.href);
        const staticDir = path.resolve(".vercel/output/static");

        await fs.mkdir(staticDir, { recursive: true });
        await copyFiles(distDir, staticDir);
      },
    },
    name: "copy-files",
  };
}
