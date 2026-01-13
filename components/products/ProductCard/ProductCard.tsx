import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ProductCardProps } from "./ProductCard.types";
import ProductPrice from "../ProductPrice/ProductPrice";
import Rating from "../Rating/Rating";
import AddToCart from "../Cart/AddToCart";
import { getMyCart } from "@/lib/actions/cart.actions";

const ProductCard = async ({ product }: ProductCardProps) => {
  const cart = await getMyCart();

  const item = {
    productId: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    qty: 1,
    image: product.images![0],
  };

  const inStock = product.stock > 0;

  return (
    <Card className="group w-full max-w-sm rounded-2xl shadow-lg hover:shadow-xl transition">
      {/* IMAGE */}
      <Link href={`/product/${product.slug}`} className="block px-3 py-2">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-white">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <CardContent className="p-4 pt-2 space-y-3">
        {/* Brand */}
        <p className="text-xs text-muted-foreground">{product.brand}</p>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:underline mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating + Price */}
        <div className="flex items-center justify-between">
          <Rating value={Number(product.rating)} />
          {inStock ? (
            <ProductPrice
              value={Number(product.price)}
              className="text-sm font-semibold"
            />
          ) : (
            <span className="text-xs font-medium text-destructive">
              Out of stock
            </span>
          )}
        </div>

        {/* CTA */}
        {inStock ? (
          <div className="text-center">
            <AddToCart cart={cart} item={item} />
          </div>
        ) : (
          <Button
            disabled
            className="w-full rounded-lg bg-zinc-700 text-zinc-400 cursor-not-allowed"
          >
            Out of Stock
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
