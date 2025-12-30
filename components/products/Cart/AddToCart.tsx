"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AddToCartProps } from "./AddToCart.types";

const AddToCart = ({ item }: AddToCartProps) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`${item.name.slice(0, 15)} added to cart`, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus className="mr-2 h-4 w-4" />
      Add To Cart
    </Button>
  );
};

export default AddToCart;
