-- AlterEnum
ALTER TYPE "QRCodeType" ADD VALUE 'sms';

-- CreateTable
CREATE TABLE "Sms" (
    "id" SERIAL NOT NULL,
    "qrCodeId" INTEGER NOT NULL,
    "smsNumber" TEXT NOT NULL,

    CONSTRAINT "Sms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sms_qrCodeId_key" ON "Sms"("qrCodeId");

-- AddForeignKey
ALTER TABLE "Sms" ADD CONSTRAINT "Sms_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
