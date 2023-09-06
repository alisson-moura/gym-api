-- CreateTable
CREATE TABLE "Schedule" (
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_date_key" ON "Schedule"("date");
