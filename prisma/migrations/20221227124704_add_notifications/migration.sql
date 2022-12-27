-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationFiles" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "NotificationFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationFiles" ADD CONSTRAINT "NotificationFiles_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
