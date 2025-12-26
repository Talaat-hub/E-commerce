import { Product } from "../Products.types";

export type ProductListProps = {
  data: Product[];
  title: string;
  limit: number;
};
