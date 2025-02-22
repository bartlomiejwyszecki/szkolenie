import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { useRegister } from '../hooks/useRegister';

jest.mock('../hooks/useRegister', () => ({
  useRegister: jest.fn(),
}));

describe("RegisterForm", () => {
  const mockRegister = jest.fn();
  
  beforeEach(() => {
    (useRegister as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render form elements", () => {
    render(<RegisterForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("should update input values on change", () => {
    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  it("should handle form submission", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<RegisterForm />);
    
    const form = screen.getByLabelText("Register form");
    form.onsubmit = handleSubmit;

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should require all fields", () => {
    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i) as HTMLInputElement;

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    expect(confirmPasswordInput).toBeRequired();
  });

  it('shows error when passwords do not match', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText(/passwords are not the same/i)).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('clears password mismatch error when user types in password fields', () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText(/passwords are not the same/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
    expect(screen.queryByText(/passwords are not the same/i)).not.toBeInTheDocument();
  });

  it('calls register when form is submitted with matching passwords', async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockRegister).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('disables form inputs and shows loading state while submitting', () => {
    (useRegister as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: true,
      error: null,
    });

    render(<RegisterForm />);

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/^password$/i)).toBeDisabled();
    expect(screen.getByLabelText(/confirm password/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
  });

  it('displays error message from useRegister hook', () => {
    (useRegister as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: 'Registration failed',
    });

    render(<RegisterForm />);

    expect(screen.getByText('Registration failed')).toBeInTheDocument();
  });
}); 