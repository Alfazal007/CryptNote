/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Secret` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Secret" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isDeleted";
