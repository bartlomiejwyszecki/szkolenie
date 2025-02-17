import { ThemeToggler } from "components/components/common/ThemeToggler/ThemeToggler";
import { UserButton } from "components/components/common/UserButton/UserButton";
import { APP_CONFIG } from "components/config/app";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-full px-4 mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="font-semibold text-lg hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {APP_CONFIG.name}
        </Link>

        <div className="hidden md:flex items-center gap-6">
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
