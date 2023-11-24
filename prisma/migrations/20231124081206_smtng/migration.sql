-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_pinZipcode_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "pinZipcode" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_pinZipcode_fkey" FOREIGN KEY ("pinZipcode") REFERENCES "Pin"("zipcode") ON DELETE SET NULL ON UPDATE CASCADE;
