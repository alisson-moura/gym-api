/*
  Warnings:

  - Made the column `badge` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "badge" SET NOT NULL,
ALTER COLUMN "badge" SET DEFAULT 0;
