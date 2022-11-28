-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "height" SET DEFAULT 0,
ALTER COLUMN "weight" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
