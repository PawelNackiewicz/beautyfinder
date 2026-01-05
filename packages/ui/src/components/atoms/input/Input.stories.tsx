import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./Input"
import { Label } from "../label/Label"

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url", "file"],
      description: "The type of the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
}

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "0",
  },
}

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
}

export const File: Story = {
  args: {
    type: "file",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: "Some value",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "Invalid value",
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-2">
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Enter text..." />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email-demo">Email</Label>
        <Input id="email-demo" type="email" placeholder="email@example.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password-demo">Password</Label>
        <Input id="password-demo" type="password" placeholder="••••••••" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="number-demo">Number</Label>
        <Input id="number-demo" type="number" placeholder="0" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="search-demo">Search</Label>
        <Input id="search-demo" type="search" placeholder="Search..." />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="file-demo">File</Label>
        <Input id="file-demo" type="file" />
      </div>
    </div>
  ),
}

