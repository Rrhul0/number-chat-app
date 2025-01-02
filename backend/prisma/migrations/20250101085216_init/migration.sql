-- CreateTable
CREATE TABLE "Discussion" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "operation" TEXT,
    "result" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" VARCHAR(36),

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Discussion_parentId_idx" ON "Discussion"("parentId");

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Discussion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
