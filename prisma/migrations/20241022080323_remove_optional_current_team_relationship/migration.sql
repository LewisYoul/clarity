/*
-  Warnings:
-
-  - Made the column `currentTeamId` on table `User` required. This step will fail if there are existing NULL values in that column.
-
-*/
--- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_currentTeamId_fkey";

--- AlterTable
ALTER TABLE "User" ALTER COLUMN "currentTeamId" SET NOT NULL;

--- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentTeamId_fkey" FOREIGN KEY ("currentTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;