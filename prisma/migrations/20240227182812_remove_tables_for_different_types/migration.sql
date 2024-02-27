/*
  Warnings:

  - You are about to drop the `Call` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MailTo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WiFi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_qrCodeId_fkey";

-- DropForeignKey
ALTER TABLE "MailTo" DROP CONSTRAINT "MailTo_qrCodeId_fkey";

-- DropForeignKey
ALTER TABLE "Sms" DROP CONSTRAINT "Sms_qrCodeId_fkey";

-- DropForeignKey
ALTER TABLE "WiFi" DROP CONSTRAINT "WiFi_qrCodeId_fkey";

-- DropTable
DROP TABLE "Call";

-- DropTable
DROP TABLE "MailTo";

-- DropTable
DROP TABLE "Sms";

-- DropTable
DROP TABLE "WiFi";

-- DropEnum
DROP TYPE "WiFiEncryptionType";
