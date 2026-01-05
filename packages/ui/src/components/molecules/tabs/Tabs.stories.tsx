import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 border rounded-md">
          <p className="text-sm">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 border rounded-md">
          <p className="text-sm">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4 border rounded-md space-y-2">
          <h3 className="font-semibold">Overview</h3>
          <p className="text-sm text-muted-foreground">
            View your dashboard overview and quick stats here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4 border rounded-md space-y-2">
          <h3 className="font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Detailed analytics and metrics for your account.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4 border rounded-md space-y-2">
          <h3 className="font-semibold">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and view reports for your data.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="available" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <div className="p-4 border rounded-md">
          <p className="text-sm">This tab is available.</p>
        </div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4 border rounded-md">
          <p className="text-sm">This content is disabled.</p>
        </div>
      </TabsContent>
      <TabsContent value="another">
        <div className="p-4 border rounded-md">
          <p className="text-sm">Another available tab.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="flex gap-4 w-[600px]"
    >
      <TabsList className="flex-col h-auto">
        <TabsTrigger value="general" className="w-full">
          General
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full">
          Security
        </TabsTrigger>
        <TabsTrigger value="notifications" className="w-full">
          Notifications
        </TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general" className="mt-0">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">General Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure your general account settings.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="security" className="mt-0">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">Security Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your security preferences and authentication.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="mt-0">
          <div className="p-4 border rounded-md">
            <h3 className="font-semibold mb-2">Notification Settings</h3>
            <p className="text-sm text-muted-foreground">
              Control how you receive notifications.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};
