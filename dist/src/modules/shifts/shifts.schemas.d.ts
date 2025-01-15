import { Shift } from "@prisma/client";
import { z } from "zod";
export declare const createShiftSchema: z.ZodObject<{
    startAt: z.ZodString;
    endAt: z.ZodString;
    workerId: z.ZodOptional<z.ZodString>;
    workplaceId: z.ZodNumber;
    shard: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    startAt: string;
    endAt: string;
    workplaceId: number;
    workerId?: string | undefined;
    shard?: number | undefined;
}, {
    startAt: string;
    endAt: string;
    workplaceId: number;
    workerId?: string | undefined;
    shard?: number | undefined;
}>;
export type CreateShift = z.infer<typeof createShiftSchema>;
export type ShiftDTO = Omit<Shift, "shard">;
