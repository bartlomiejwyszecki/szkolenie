import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MenuItemLink } from "./MenuItemLink";

describe("MenuItemLink", () => {
  it("should render link with correct href", () => {
    render(<MenuItemLink href="/test">Test Link</MenuItemLink>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should render children content", () => {
    const testContent = "Test Content";
    render(<MenuItemLink href="/test">{testContent}</MenuItemLink>);
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
}); 