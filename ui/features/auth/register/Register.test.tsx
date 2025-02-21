import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Register } from "./Register";
import { APP_CONFIG } from "components/config/app";

describe("Register", () => {
  it("should render register form", () => {
    render(<Register />);
    
    expect(screen.getByRole("heading", { 
      name: `Join ${APP_CONFIG.name}`,
      level: 1 
    })).toBeInTheDocument();
  });

  it("should render form elements", () => {
    render(<Register />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("should have proper heading hierarchy", () => {
    render(<Register />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveClass("text-3xl", "font-semibold", "text-center", "mb-8");
  });

  it("should have only one h1 heading", () => {
    render(<Register />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });
}); 