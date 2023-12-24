-- CreateEnum
CREATE TYPE "WiFiEncryptionType" AS ENUM ('WEP', 'WPA', 'nopass');

-- AlterEnum
ALTER TYPE "QRCodeType" ADD VALUE 'wifi';

-- CreateTable
CREATE TABLE "WiFi" (
    "id" SERIAL NOT NULL,
    "qrCodeId" INTEGER NOT NULL,
    "encryptionType" "WiFiEncryptionType" NOT NULL,
    "ssid" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "WiFi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WiFi_qrCodeId_key" ON "WiFi"("qrCodeId");

-- AddForeignKey
ALTER TABLE "WiFi" ADD CONSTRAINT "WiFi_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
