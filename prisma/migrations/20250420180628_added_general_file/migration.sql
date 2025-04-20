-- CreateTable
CREATE TABLE "GeneralFile" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GeneralFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneralFile_userId_key_key" ON "GeneralFile"("userId", "key");

-- AddForeignKey
ALTER TABLE "GeneralFile" ADD CONSTRAINT "GeneralFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
