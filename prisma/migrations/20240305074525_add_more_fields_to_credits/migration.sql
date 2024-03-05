/*
  Warnings:

  - Added the required column `teamId` to the `Credit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Credit" DROP CONSTRAINT "Credit_qrCodeId_fkey";

-- AlterTable
ALTER TABLE "Credit" ADD COLUMN     "teamId" INTEGER NOT NULL,
ALTER COLUMN "qrCodeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
