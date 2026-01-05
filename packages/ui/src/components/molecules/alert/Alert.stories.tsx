import type { Meta, StoryObj } from "@storybook/react";
import { Terminal, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Molecules/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "The visual style of the alert",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[450px]">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[450px]">
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert className="w-[450px]">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon. It still looks great!
      </AlertDescription>
    </Alert>
  ),
};

export const OnlyDescription: Story = {
  render: () => (
    <Alert className="w-[450px]">
      <Terminal />
      <AlertDescription>
        A simple alert with only a description and an icon.
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[450px]">
      <Alert>
        <Terminal />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is the default alert variant with an informational message.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive alert used for errors and warnings.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
