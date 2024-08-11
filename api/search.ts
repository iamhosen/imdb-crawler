// import
import cypress from "cypress";
import express, { Request, Response } from "express";
import { readJsonFile } from "../utils/helper";
import files from "../constants/files";
const PORT = 3000;
const app = express();

app.get("/", async (req: Request, res: Response) => {
  const search = req.query.search;

  await cypress.run({
    spec: "scripts/imdb_search.cy.ts",
    env: {
      search,
    },
  });

  const result = readJsonFile(files.search);

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
