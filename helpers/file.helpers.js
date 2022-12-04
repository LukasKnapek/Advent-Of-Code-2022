import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const caleeLocation = process.argv[1];
const caleeDirectory = path.dirname(caleeLocation);

const getFileContents = async (fileName) => {
  const fileBuffer = await fs.readFileSync(path.join(caleeDirectory, fileName));
  const inputData = fileBuffer.toString();
  return inputData;
};

const FileHelpers = { getFileContents };
export default FileHelpers;
