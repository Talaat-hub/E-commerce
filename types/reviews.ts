import { insertReviewSchema } from "@/lib/validators/reviews";
import z from "zod";

export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};
