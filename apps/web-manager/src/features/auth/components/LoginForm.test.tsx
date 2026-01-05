import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders email input and submit button", () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/adres email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /zaloguj się/i })
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText(/adres email/i);
    const submitButton = screen.getByRole("button", { name: /zaloguj się/i });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    expect(
      await screen.findByText(/podaj poprawny adres email/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error for empty email", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: /zaloguj się/i });
    await user.click(submitButton);

    expect(
      await screen.findByText(/podaj poprawny adres email/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with email when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText(/adres email/i);
    const submitButton = screen.getByRole("button", { name: /zaloguj się/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith("test@example.com");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("has correct input attributes", () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText(/adres email/i);

    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "twoj@email.com");
    expect(emailInput).toHaveAttribute("autocomplete", "email");
  });

  it("sets aria-invalid on email input when there is an error", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText(/adres email/i);
    const submitButton = screen.getByRole("button", { name: /zaloguj się/i });

    expect(emailInput).toHaveAttribute("aria-invalid", "false");

    await user.type(emailInput, "invalid");
    await user.click(submitButton);

    await screen.findByText(/podaj poprawny adres email/i);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });
});
