import ProductCarousel from "@/components/products/ProductCarousel/ProductCarousel";
import ProductList from "@/components/products/ProductList/ProductList";
import DealCountdown from "@/components/shared/deal-countdown/DealCountdown";
import IconBoxes from "@/components/shared/icon-boxes/icon-boxes";
import ViewAllProductsButton from "@/components/shared/view-all/ViewAllProudctsButton";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" />
      <ViewAllProductsButton />
      <IconBoxes />
      <DealCountdown />
    </>
  );
}
