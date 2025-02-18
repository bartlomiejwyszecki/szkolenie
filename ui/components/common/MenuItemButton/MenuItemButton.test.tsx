import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuItemButton } from "./MenuItemButton";

describe("MenuItemButton", () => {
  it("should render children content", () => {
    const testContent = "Test Content";
    render(<MenuItemButton>{testContent}</MenuItemButton>);
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<MenuItemButton onClick={handleClick}>Click Me</MenuItemButton>);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 