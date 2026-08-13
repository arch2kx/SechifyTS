import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import stripJsonComments from "strip-json-comments";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcPath = path.join(__dirname, "..", "manifest.src.json");
const outPath = path.join(__dirname, "..", "dist", "manifest.json");

const raw = fs.readFileSync(srcPath, "utf8");
const stripped = stripJsonComments(raw);
const parsed = JSON.parse(stripped);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));

console.log(`manifest.json written to ${outPath}`);
