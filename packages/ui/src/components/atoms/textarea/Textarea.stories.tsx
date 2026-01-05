import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./Textarea"
import { Label } from "../label/Label"

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    rows: {
      control: "number",
      description: "Number of visible rows",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Type your message here...",
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
}

export const WithValue: Story = {
  args: {
    defaultValue:
      "This is some example text that demonstrates how the textarea looks with content inside it.",
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself..." />
      <p className="text-sm text-muted-foreground">
        Your bio will be visible on your public profile.
      </p>
    </div>
  ),
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "Invalid content",
  },
  render: (args) => (
    <div className="w-80 space-y-2">
      <Label htmlFor="invalid">Message</Label>
      <Textarea id="invalid" {...args} />
      <p className="text-sm text-destructive">This field is required.</p>
    </div>
  ),
}

export const WithCharacterCount: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="limited">Description</Label>
      <Textarea
        id="limited"
        placeholder="Enter description..."
        maxLength={200}
        defaultValue="This is an example description."
      />
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">32 / 200</span>
      </div>
    </div>
  ),
}

export const ContactForm: Story = {
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border p-4">
      <h3 className="font-semibold">Contact Us</h3>
      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <input
          id="contact-name"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <input
          id="contact-email"
          type="email"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="email@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="How can we help you?"
          className="min-h-[100px]"
        />
      </div>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="space-y-2">
        <Label>Default</Label>
        <Textarea placeholder="Default textarea..." />
      </div>
      <div className="space-y-2">
        <Label>With Value</Label>
        <Textarea defaultValue="Some existing content" />
      </div>
      <div className="space-y-2">
        <Label className="opacity-50">Disabled</Label>
        <Textarea placeholder="Disabled textarea..." disabled />
      </div>
      <div className="space-y-2">
        <Label>Invalid</Label>
        <Textarea
          aria-invalid
          defaultValue="Invalid content"
        />
      </div>
    </div>
  ),
}

