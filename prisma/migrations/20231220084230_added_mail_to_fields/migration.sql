/*
  Warnings:

  - Added the required column `body` to the `MailTo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `MailTo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `MailTo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MailTo" ADD COLUMN     "bcc" TEXT,
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "cc" TEXT,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;
