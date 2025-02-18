import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "./Login";
import { APP_CONFIG } from "components/config/app";

describe("Login", () => {
  it("should render login form", () => {
    render(<Login />);
    
    expect(screen.getByRole("heading", { name: `Login to ${APP_CONFIG.name}` })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should handle form submission", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Login attempt:', {
      email: 'test@example.com',
      password: 'password123'
    });
  });
}); 