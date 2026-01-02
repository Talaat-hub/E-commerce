import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound, redirect } from "next/navigation";
import { ShippingAddress } from "@/types/shipping-adress";
import OrderDetailsTable from "./OrderDetailsTable";
import { auth } from "@/lib/auth/auth";

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
    redirect("/sign-in");
  }

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
