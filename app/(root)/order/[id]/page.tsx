import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound, redirect } from "next/navigation";
import { ShippingAddress } from "@/types/shipping-adress";
import OrderDetailsTable from "./OrderDetailsTable";
import { auth } from "@/lib/auth/auth";
import Stripe from "stripe";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Order Details",
};

type OrderDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const OrderDetailsPage = async (props: OrderDetailsPageProps) => {
  const { id } = await props.params;

  const session = await auth();

  if (!session?.user) {
    const headersList = headers();
    const pathname = (await headersList).get("x-pathname") || id;

    redirect(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  const order = await getOrderById(id);
  if (!order) notFound();

  let client_secret = null;

  // Check if is not paid and using stripe
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    // Init stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!}
      stripeClientSecret={client_secret}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
