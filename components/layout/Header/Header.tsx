import { APP_NAME } from "@/lib/constants";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Link from "next/link";
import CategoryDrawer from "./CategoryDrawer";
import Search from "./Search";

const Header = () => {
  return (
    <header className="w-full border-b bg-card">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrawer />
          <Link href="/" className="flex-start ml-4">
            <Logo width={60} height={50} />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
