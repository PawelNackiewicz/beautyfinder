import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";
import { Button } from "../../atoms/button/Button";

const meta: Meta<typeof PageHeader> = {
  title: "Molecules/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The main title of the page",
    },
    description: {
      control: "text",
      description: "Optional description text below the title",
    },
    actions: {
      control: false,
      description: "Optional action buttons or elements",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Page Title",
  },
};

export const WithDescription: Story = {
  args: {
    title: "Dashboard",
    description: "Welcome back! Here's an overview of your activity.",
  },
};

export const WithSingleAction: Story = {
  args: {
    title: "Users",
    description: "Manage your user accounts and permissions",
    actions: <Button>Add User</Button>,
  },
};

export const WithMultipleActions: Story = {
  args: {
    title: "Products",
    description: "Browse and manage your product catalog",
    actions: (
      <>
        <Button variant="outline">Export</Button>
        <Button>Add Product</Button>
      </>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: "Very Long Page Title That Might Wrap On Smaller Screens",
    description:
      "This is a longer description that demonstrates how the component handles more text content and wrapping behavior.",
  },
};

export const WithComplexActions: Story = {
  args: {
    title: "Settings",
    description: "Configure your application preferences",
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="outline" size="sm">
          Reset
        </Button>
        <Button size="sm">Save Changes</Button>
      </div>
    ),
  },
};

export const MinimalTitle: Story = {
  args: {
    title: "404",
  },
};
