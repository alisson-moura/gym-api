-- CreateTable
CREATE TABLE "Guidelines" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Guidelines_pkey" PRIMARY KEY ("id")
);
