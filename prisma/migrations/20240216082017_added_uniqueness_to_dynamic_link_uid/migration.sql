/*
  Warnings:

  - A unique constraint covering the columns `[dynamicLinkUid]` on the table `QRCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QRCode_dynamicLinkUid_key" ON "QRCode"("dynamicLinkUid");
