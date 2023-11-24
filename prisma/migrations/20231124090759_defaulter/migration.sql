-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ONGOING', 'COMPLETED');

-- AlterTable
ALTER TABLE "LoanApplication" ADD COLUMN     "defaulter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'PENDING';
