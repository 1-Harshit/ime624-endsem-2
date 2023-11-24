-- CreateEnum
CREATE TYPE "Type" AS ENUM ('LAND', 'VEHICLE', 'ANIMAL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "LoanApplication" (
    "acNumber" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "principalAmt" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "purpose" TEXT,

    CONSTRAINT "LoanApplication_pkey" PRIMARY KEY ("acNumber")
);

-- CreateTable
CREATE TABLE "Asset" (
    "assetId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "assetType" "Type" NOT NULL,
    "assetQuantifier" INTEGER NOT NULL,
    "description" TEXT,
    "valuation" INTEGER,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "Aadhar" (
    "aadharNumber" VARCHAR(255) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "sex" "Gender" NOT NULL,
    "permAddress" VARCHAR(255) NOT NULL,

    CONSTRAINT "Aadhar_pkey" PRIMARY KEY ("aadharNumber")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "phoneNumber" VARCHAR(20) NOT NULL,
    "income" INTEGER NOT NULL,
    "pan" VARCHAR(20),
    "currAddress" VARCHAR(255) NOT NULL,
    "maritalStatus" BOOLEAN NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("phoneNumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aadhar_ownerId_key" ON "Aadhar"("ownerId");

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Applicant"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aadhar" ADD CONSTRAINT "Aadhar_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Applicant"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
