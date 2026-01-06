import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./Sonner";
import { Button } from "@repo/ui/components";
import { toast } from "sonner";

const meta = {
  title: "Organisms/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => toast("Event has been created")}
        >
          Show Default Toast
        </Button>
      </div>
    </>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => toast("This is a default toast")}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Operation completed successfully")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Please review your input")}
        >
          Warning
        </Button>
        <Button variant="outline" onClick={() => toast.info("Did you know?")}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast.loading("Loading...")}>
          Loading
        </Button>
      </div>
    </>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Monday, January 3rd at 6:00pm",
            })
          }
        >
          Show Toast with Description
        </Button>
      </div>
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast with Action
        </Button>
      </div>
    </>
  ),
};

export const WithDuration: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast("This toast will close in 10 seconds", {
              duration: 10000,
            })
          }
        >
          Long Duration (10s)
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("This toast will close in 1 second", {
              duration: 1000,
            })
          }
        >
          Short Duration (1s)
        </Button>
      </div>
    </>
  ),
};

export const Custom: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast.custom((t) => (
              <div className="flex items-center gap-2 rounded-lg border bg-background p-4 shadow-lg">
                <div className="flex-1">
                  <p className="font-semibold">Custom Toast</p>
                  <p className="text-sm text-muted-foreground">
                    This is a completely custom toast component
                  </p>
                </div>
                <Button size="sm" onClick={() => toast.dismiss(t)}>
                  Close
                </Button>
              </div>
            ))
          }
        >
          Show Custom Toast
        </Button>
      </div>
    </>
  ),
};

export const Position: Story = {
  render: () => (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => toast("This toast is at the top center")}
        >
          Show Toast (Top Center)
        </Button>
      </div>
    </>
  ),
};
