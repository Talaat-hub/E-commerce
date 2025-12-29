import ThemeToggler from "@/components/Theme/ThemeToggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";
import UserButton from "./UserButton";

const HeaderMenu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggler />
        <Button asChild variant="ghost" className="rounded-full">
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetTitle className="py-2 pl-5 border-b">Menu</SheetTitle>
            <div className="flex flex-col items-start gap-4 pl-5 pt-2">
              <ThemeToggler />
              <Button asChild variant="ghost">
                <Link href="/cart">
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <UserButton />
            </div>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default HeaderMenu;
