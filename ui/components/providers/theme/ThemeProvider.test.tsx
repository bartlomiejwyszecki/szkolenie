import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme, ThemeProvider } from "./ThemeProvider";

jest.spyOn(Storage.prototype, "getItem");
jest.spyOn(Storage.prototype, "setItem");

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("provides initial dark theme when no preference is set", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement).not.toHaveClass("light");
  });

  it("toggles theme when toggle function is called", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(document.documentElement).toHaveClass("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");

    fireEvent.click(toggleButton);
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement).not.toHaveClass("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("uses theme from localStorage if available", () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce("dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("uses system preference when no localStorage value is present", () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement).toHaveClass("dark");
  });
});
