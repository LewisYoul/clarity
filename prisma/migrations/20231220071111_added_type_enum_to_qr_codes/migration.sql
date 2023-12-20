-- CreateEnum
CREATE TYPE "QRCodeType" AS ENUM ('link', 'pdf');

-- AlterTable
ALTER TABLE "QRCode" ADD COLUMN     "type" "QRCodeType" NOT NULL DEFAULT 'link';
