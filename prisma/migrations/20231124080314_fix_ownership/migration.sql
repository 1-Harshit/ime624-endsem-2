/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Aadhar` table. All the data in the column will be lost.
  - The primary key for the `Pin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[aadharNumber]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aadharNumber` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Aadhar" DROP CONSTRAINT "Aadhar_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_pinZipcode_fkey";

-- DropIndex
DROP INDEX "Aadhar_ownerId_key";

-- AlterTable
ALTER TABLE "Aadhar" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "pinZipcode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "aadharNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_pkey",
ALTER COLUMN "zipcode" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pin_pkey" PRIMARY KEY ("zipcode");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_aadharNumber_key" ON "Applicant"("aadharNumber");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_pinZipcode_fkey" FOREIGN KEY ("pinZipcode") REFERENCES "Pin"("zipcode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_aadharNumber_fkey" FOREIGN KEY ("aadharNumber") REFERENCES "Aadhar"("aadharNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
