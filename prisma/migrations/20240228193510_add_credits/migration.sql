-- CreateTable
CREATE TABLE "Credit" (
    "id" SERIAL NOT NULL,
    "qrCodeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credit_qrCodeId_key" ON "Credit"("qrCodeId");

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
