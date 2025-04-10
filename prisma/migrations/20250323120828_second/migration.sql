-- CreateTable
CREATE TABLE "ApiLimit" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_period_end" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiLimit_userID_key" ON "ApiLimit"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_customer_id_key" ON "UserSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_subscription_id_key" ON "UserSubscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_price_id_key" ON "UserSubscription"("stripe_price_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_period_end_key" ON "UserSubscription"("stripe_period_end");
