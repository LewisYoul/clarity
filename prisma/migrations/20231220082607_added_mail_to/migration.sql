-- CreateTable
CREATE TABLE "MailTo" (
    "id" SERIAL NOT NULL,
    "qrCodeId" INTEGER NOT NULL,

    CONSTRAINT "MailTo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MailTo_qrCodeId_key" ON "MailTo"("qrCodeId");

-- AddForeignKey
ALTER TABLE "MailTo" ADD CONSTRAINT "MailTo_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
