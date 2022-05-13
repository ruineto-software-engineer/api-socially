import { e2eTestsRepository } from "../repositories/e2eTestsRepository.js";

async function truncate() {
  await e2eTestsRepository.truncate();
}

export const e2eTestsService = {
  truncate,
};
