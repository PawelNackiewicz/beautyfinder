import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./Spinner"
import { Button } from "../button/Button"

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    className: "size-3",
  },
}

export const Medium: Story = {
  args: {
    className: "size-6",
  },
}

export const Large: Story = {
  args: {
    className: "size-8",
  },
}

export const ExtraLarge: Story = {
  args: {
    className: "size-12",
  },
}

export const WithColor: Story = {
  args: {
    className: "size-6 text-primary",
  },
}

export const Destructive: Story = {
  args: {
    className: "size-6 text-destructive",
  },
}

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner />
      Loading...
    </Button>
  ),
}

export const InButtonSmall: Story = {
  render: () => (
    <Button size="sm" disabled>
      <Spinner className="size-3" />
      Please wait
    </Button>
  ),
}

export const Centered: Story = {
  render: () => (
    <div className="flex h-32 w-32 items-center justify-center rounded-lg border">
      <Spinner className="size-8" />
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-3" />
        <span className="text-xs text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-xs text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6" />
        <span className="text-xs text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8" />
        <span className="text-xs text-muted-foreground">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-12" />
        <span className="text-xs text-muted-foreground">XL</span>
      </div>
    </div>
  ),
}

