import * as fs from "fs";

export const readJsonFile = (filePath: string): any => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
};

export const saveJsonFile = (filePath: string, data: any): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonContent, "utf8");
};
