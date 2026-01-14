import { Metadata } from "next";
import { auth } from "@/lib/auth/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import CheckoutSteps from "@/components/checkout-steps/CheckoutSteps";
import PaymentMethodForm from "./PaymentMethodForm";
import { headers } from "next/headers";
// import PaymentMethodForm from "./payment-method-form";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();

  if (!session?.user) {
    const headersList = headers();
    const pathname = (await headersList).get("x-pathname") || "/payment-method";

    redirect(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
