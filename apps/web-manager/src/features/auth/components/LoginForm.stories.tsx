import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Features/Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
    actions: {
      handles: ["submit"],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onSubmit: {
      action: "submitted",
      description:
        "Callback function called when the form is submitted with valid email",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInteraction: Story = {
  args: {
    onSubmit: (email: string) => {
      console.log("Form submitted with email:", email);
      // Simulate async operation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, 2000);
      });
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the form with interaction. Try entering a valid email and submitting the form to see the loading state.",
      },
    },
  },
};

export const ValidationError: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Try submitting the form without entering an email or with an invalid email format to see validation errors. Examples of invalid emails: "test", "test@", "test@example".',
      },
    },
  },
};

export const InCard: Story = {
  args: {},
  render: (args) => (
    <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-bold">Zaloguj się</h2>
        <p className="text-sm text-muted-foreground">
          Wprowadź swój adres email, aby się zalogować
        </p>
      </div>
      <LoginForm {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of how the LoginForm looks when placed inside a card component with a header.",
      },
    },
  },
};

export const FullPageLayout: Story = {
  args: {},
  render: (args) => (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Witaj ponownie</h1>
          <p className="text-muted-foreground">
            Wpisz swój email, aby kontynuować
          </p>
        </div>
        <LoginForm {...args} />
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Nie masz konta?{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Zarejestruj się
            </a>
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Example of a full-page login layout with the LoginForm component.",
      },
    },
  },
};

export const WithCustomHandling: Story = {
  args: {
    onSubmit: (email: string) => {
      // Simulate API error
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Authentication failed: ${email}`));
        }, 1500);
      });
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates custom error handling. The submit handler simulates an API error after 1.5 seconds.",
      },
    },
  },
};
