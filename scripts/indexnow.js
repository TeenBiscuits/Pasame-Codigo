import dotenv from "dotenv";
import { writeFileSync } from "fs";
import { join } from "path";

dotenv.config();
const myEnvVar = process.env.INDEXNOW_KEY;

if (myEnvVar) {
  const filePath = join("./public", `${myEnvVar}.txt`);
  const fileContent = `${myEnvVar}`;
  writeFileSync(filePath, fileContent, "utf-8");
  console.log("[IndexNow] Archivo creado correctamente en ./public");
} else {
  console.error("[IndexNow] La variable de entorno no está definida");
}
