import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-4 justify-center gap-4 p-4">
          <div className="space-y-2 flex flex-col items-center md:block">
            <ShoppingBag />
            <div className="text-sm font-bold">Free Shipping</div>
            <div className="text-sm text-muted-foreground">
              Free shipping on orders above $100
            </div>
          </div>
          <div className="space-y-2 flex flex-col items-center md:block">
            <DollarSign />
            <div className="text-sm font-bold">Money Back Guarantee</div>
            <div className="text-sm text-muted-foreground">
              Within 30 days of purchase
            </div>
          </div>
          <div className="space-y-2 flex flex-col items-center md:block">
            <WalletCards />
            <div className="text-sm font-bold">Flexible Payment</div>
            <div className="text-sm text-muted-foreground">
              Pay with credit card, PayPal or COD
            </div>
          </div>
          <div className="space-y-2 flex flex-col items-center md:block">
            <Headset />
            <div className="text-sm font-bold">24/7 Support</div>
            <div className="text-sm text-muted-foreground">
              Get support at any time
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
