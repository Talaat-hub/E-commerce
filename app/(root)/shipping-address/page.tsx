import { auth } from "@/lib/auth/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types/shipping-adress";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./ShippingAddressForm";
import CheckoutSteps from "@/components/checkout-steps/CheckoutSteps";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const session = await auth();

  if (!session?.user) {
    const headersList = headers();
    const pathname =
      (await headersList).get("x-pathname") || "/shipping-address";

    redirect(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const userId = session?.user?.id;

  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
