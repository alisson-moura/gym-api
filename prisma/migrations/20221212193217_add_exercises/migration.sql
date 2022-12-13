-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercises" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cover" TEXT,
    "description" TEXT,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
