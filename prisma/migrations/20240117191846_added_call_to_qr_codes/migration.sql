-- CreateTable
CREATE TABLE "Call" (
    "id" SERIAL NOT NULL,
    "qrCodeId" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Call_qrCodeId_key" ON "Call"("qrCodeId");

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
