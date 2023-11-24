/*
  Warnings:

  - You are about to drop the column `permAddress` on the `Aadhar` table. All the data in the column will be lost.
  - You are about to drop the column `currAddress` on the `Applicant` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Aadhar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Applicant` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `maritalStatus` on the `Applicant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `valuation` on table `Asset` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'SEPARATED');

-- AlterTable
ALTER TABLE "Aadhar" DROP COLUMN "permAddress",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "currAddress",
ADD COLUMN     "addressId" TEXT NOT NULL,
DROP COLUMN "maritalStatus",
ADD COLUMN     "maritalStatus" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "proof" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "valuation" SET NOT NULL;

-- CreateTable
CREATE TABLE "Pin" (
    "zipcode" INTEGER NOT NULL,
    "district" VARCHAR(200) NOT NULL,
    "state" VARCHAR(200) NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("zipcode")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "pinZipcode" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_pinZipcode_fkey" FOREIGN KEY ("pinZipcode") REFERENCES "Pin"("zipcode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aadhar" ADD CONSTRAINT "Aadhar_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
