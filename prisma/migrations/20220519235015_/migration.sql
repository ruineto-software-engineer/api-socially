/*
  Warnings:

  - You are about to drop the column `followedId` on the `followers` table. All the data in the column will be lost.
  - Added the required column `followsId` to the `followers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "followers" DROP COLUMN "followedId",
ADD COLUMN     "followsId" INTEGER NOT NULL;
