/*
  Warnings:

  - A unique constraint covering the columns `[userId,key]` on the table `Secret` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Secret` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Secret" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Secret_userId_key_key" ON "Secret"("userId", "key");

-- AddForeignKey
ALTER TABLE "Secret" ADD CONSTRAINT "Secret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
