import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

describe("Home", () => {
  it("renders the welcome heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { 
      name: /welcome to meme app/i,
      level: 1 
    });
    expect(heading).toBeInTheDocument();
  });

  it("has proper heading hierarchy", () => {
    render(<Home />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveClass("text-4xl", "font-bold");
  });

  it("should have only one h1 heading", () => {
    render(<Home />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });
}); 