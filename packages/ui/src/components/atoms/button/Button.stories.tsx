import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Loader2, ChevronRight } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "cta",
        "hero",
        "hero-outline",
      ],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: [
        "default",
        "sm",
        "lg",
        "icon",
        "icon-sm",
        "icon-lg",
        "hero",
        "hero-outline",
        "cta",
      ],
      description: "The size of the button",
    },
    asChild: {
      control: "boolean",
      description: "Whether to render as a child component",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    children: <Mail className="size-4" />,
    size: "icon",
    "aria-label": "Send email",
  },
};

export const IconSmall: Story = {
  args: {
    children: <Mail className="size-4" />,
    size: "icon-sm",
    "aria-label": "Send email",
  },
};

export const IconLarge: Story = {
  args: {
    children: <Mail className="size-4" />,
    size: "icon-lg",
    "aria-label": "Send email",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail /> Login with Email
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    children: (
      <>
        <Loader2 className="animate-spin" /> Please wait
      </>
    ),
    disabled: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const CTA: Story = {
  args: {
    children: "CTA",
    variant: "cta",
  },
};

export const Hero: Story = {
  args: {
    children: "Hero",
    variant: "hero",
  },
};

export const HeroOutline: Story = {
  args: {
    children: "Hero Outline",
    variant: "hero-outline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-sm">
          <ChevronRight />
        </Button>
        <Button size="icon">
          <ChevronRight />
        </Button>
        <Button size="icon-lg">
          <ChevronRight />
        </Button>
      </div>
    </div>
  ),
};
