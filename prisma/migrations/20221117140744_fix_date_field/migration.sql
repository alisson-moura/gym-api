/*
  Warnings:

  - Made the column `date` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "date" SET NOT NULL;
