import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./Switch"
import { Label } from "../label/Label"

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const WithLabelLeft: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Label htmlFor="notifications">Enable notifications</Label>
      <Switch id="notifications" />
    </div>
  ),
}

export const InSettingsRow: Story = {
  render: () => (
    <div className="flex w-80 items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label htmlFor="marketing">Marketing emails</Label>
        <p className="text-sm text-muted-foreground">
          Receive emails about new products and features.
        </p>
      </div>
      <Switch id="marketing" />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="checked" defaultChecked />
        <Label htmlFor="checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled" className="opacity-50">
          Disabled
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="opacity-50">
          Disabled Checked
        </Label>
      </div>
    </div>
  ),
}

export const SettingsForm: Story = {
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border p-4">
      <h3 className="font-semibold">Notification Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notif">Email</Label>
            <p className="text-xs text-muted-foreground">
              Receive email notifications
            </p>
          </div>
          <Switch id="email-notif" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notif">Push</Label>
            <p className="text-xs text-muted-foreground">
              Receive push notifications
            </p>
          </div>
          <Switch id="push-notif" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sms-notif">SMS</Label>
            <p className="text-xs text-muted-foreground">
              Receive SMS notifications
            </p>
          </div>
          <Switch id="sms-notif" />
        </div>
      </div>
    </div>
  ),
}

