import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { APP_CONFIG } from "components/config/app";
import { ThemeProvider } from "components/components/providers/theme/ThemeProvider";

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe("Navbar", () => {
  it("should render the app name as a link", () => {
    renderWithTheme(<Navbar />);
    const homeLink = screen.getByRole("link", { name: APP_CONFIG.name });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render user menu button", () => {
    renderWithTheme(<Navbar />);
    const userButton = screen.getByRole("button", { name: /user menu/i });
    expect(userButton).toBeInTheDocument();
  });

  it("should render theme toggler", () => {
    renderWithTheme(<Navbar />);
    const themeButton = screen.getByRole("button", { 
      name: /switch to (light|dark) theme/i 
    });
    expect(themeButton).toBeInTheDocument();
  });

  it("should has proper navigation structure", () => {
    renderWithTheme(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass(
      "fixed",
      "top-0",
      "w-full",
      "h-16",
      "border-b"
    );
  });
}); 