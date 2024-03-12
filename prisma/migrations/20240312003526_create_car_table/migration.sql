-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('FIAT', 'TOYOTA', 'BMW', 'FORD', 'HONDA');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('GREY', 'BLACK', 'SILVER', 'WHITE', 'BLUE');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "brand" "Brand" NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");
