import { cartItemSchema, insertCartSchema } from "@/lib/validators/cart";
import z from "zod";

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
