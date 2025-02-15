import { ThemeToggler } from "components/components/common/ThemeToggler/ThemeToggler";
import { UserButton } from "components/components/common/UserButton/UserButton";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-full mx-auto flex items-center justify-between">
        <div className="font-semibold text-lg">Brand</div>

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
