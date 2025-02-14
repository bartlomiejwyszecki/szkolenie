import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggler } from "./ThemeToggler";
import { ThemeProvider } from "components/components/providers/theme/ThemeProvider";

describe("ThemeToggler", () => {
  it("toggles theme when clicked", () => {
    render(
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    
    expect(button).toHaveAccessibleName("Switch to light theme");
    
    fireEvent.click(button);
    expect(button).toHaveAccessibleName("Switch to dark theme");
    
    fireEvent.click(button);
    expect(button).toHaveAccessibleName("Switch to light theme");
  });
}); 