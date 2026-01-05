import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./Separator"

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is decorative",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-80">
      <Separator {...args} />
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="h-20">
      <Separator {...args} />
    </div>
  ),
}

export const InContent: Story = {
  render: () => (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
}

export const InNavigation: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-4 text-sm">
      <a href="#" className="hover:underline">
        Home
      </a>
      <Separator orientation="vertical" />
      <a href="#" className="hover:underline">
        Products
      </a>
      <Separator orientation="vertical" />
      <a href="#" className="hover:underline">
        About
      </a>
      <Separator orientation="vertical" />
      <a href="#" className="hover:underline">
        Contact
      </a>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-4">
      <h3 className="font-semibold">Account Settings</h3>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm">Email</span>
          <span className="text-sm text-muted-foreground">user@example.com</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm">Plan</span>
          <span className="text-sm text-muted-foreground">Pro</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm">Status</span>
          <span className="text-sm text-muted-foreground">Active</span>
        </div>
      </div>
    </div>
  ),
}

