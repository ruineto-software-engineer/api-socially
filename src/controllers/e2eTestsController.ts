import { Request, Response } from "express";
import { e2eTestsService } from "../services/e2eTestsService.js";

async function reset(_req: Request, res: Response) {
  await e2eTestsService.truncate();

  res.sendStatus(200);
}

export default {
  reset,
};
