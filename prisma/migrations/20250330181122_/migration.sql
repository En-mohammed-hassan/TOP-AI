/*
  Warnings:

  - Added the required column `imageCount` to the `ApiLimit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiLimit" ADD COLUMN     "imageCount" INTEGER NOT NULL;
