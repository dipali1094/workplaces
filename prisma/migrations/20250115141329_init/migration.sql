-- CreateTable
CREATE TABLE "Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "shard" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Workplace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "shard" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_at" DATETIME NOT NULL,
    "end_at" DATETIME NOT NULL,
    "workplace_id" INTEGER NOT NULL,
    "worker_id" INTEGER,
    "shard" INTEGER NOT NULL DEFAULT 0,
    "cancelled_at" DATETIME,
    CONSTRAINT "Shift_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Worker" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Shift_workplace_id_fkey" FOREIGN KEY ("workplace_id") REFERENCES "Workplace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
