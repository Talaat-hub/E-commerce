import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserIcon } from "lucide-react";

console.log(Logo);

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src={Logo}
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="space-x-2">
          <Button asChild variant="ghost">
            <Link href={"/cart"}>
              <ShoppingCart /> cart
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={"/sign-in"}>
              <UserIcon /> Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
