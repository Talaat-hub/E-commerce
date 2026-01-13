"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/product";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className="w-[90%] md:w-full mb-12 mx-auto"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => {
          return (
            <React.Fragment key={product.id}>
              {product.banner && (
                <CarouselItem className="w-[90%]">
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative mx-auto">
                      <Image
                        src={product.banner}
                        alt={product.name}
                        height="0"
                        width="0"
                        sizes="100vw"
                        className="w-full h-auto"
                      />

                      <div className="absolute inset-0 flex items-end justify-center">
                        <h2 className="bg-gray-900 bg-opacity-50 md:text-2xl font-bold px-2 text-white mb-2">
                          {product.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )}
            </React.Fragment>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="-left-9 xl:-left-11" />
      <CarouselNext className="-right-9 xl:-right-11" />
    </Carousel>
  );
};

export default ProductCarousel;
