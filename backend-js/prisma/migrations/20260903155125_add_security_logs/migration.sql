-- CreateTable
CREATE TABLE "security_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "event" VARCHAR(50) NOT NULL,
    "ip" VARCHAR(45),
    "user_agent" VARCHAR(500),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "security_logs_user_id_created_at_idx" ON "security_logs"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "security_logs" ADD CONSTRAINT "security_logs_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
