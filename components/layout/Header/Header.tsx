import { APP_NAME } from "@/lib/constants";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Logo />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
