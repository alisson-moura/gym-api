-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(1) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "badge" INTEGER,
    "photo" VARCHAR(255),
    "comments" VARCHAR(255),
    "birthDate" TIMESTAMP(6),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
