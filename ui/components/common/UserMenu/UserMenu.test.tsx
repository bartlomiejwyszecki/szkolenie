import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserMenu } from "./UserMenu";

describe("UserMenu", () => {
  it("should not render when isOpen is false", () => {
    render(<UserMenu isOpen={false} />);
    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", () => {
    render(<UserMenu isOpen={true} />);
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  it("should render menu items when open", () => {
    render(<UserMenu isOpen={true} />);
    const loginItem = screen.getByText("Login or Sign up");
    expect(loginItem).toBeInTheDocument();
  });

  it("should have proper styling classes", () => {
    render(<UserMenu isOpen={true} />);
    const menu = screen.getByRole("menu");
    expect(menu).toHaveClass(
      "absolute",
      "right-0",
      "mt-2",
      "w-48",
      "py-2",
      "bg-white",
      "dark:bg-gray-800",
      "rounded-lg",
      "shadow-xl",
      "border",
      "border-gray-200",
      "dark:border-gray-700"
    );
  });
}); 