/*
  Warnings:

  - Changed the type of `color` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `brand` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "color",
ADD COLUMN     "color" TEXT NOT NULL,
DROP COLUMN "brand",
ADD COLUMN     "brand" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Brand";

-- DropEnum
DROP TYPE "Color";
