import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
    title: "Atoms/Progress",
    component: Progress,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: {
                type: "range",
                min: 0,
                max: 100,
                step: 1,
            },
            description: "The progress value (0-100)",
        },
        className: {
            control: "text",
            description: "Additional CSS classes",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="space-y-2">
                <div className="text-sm font-medium">0%</div>
                <Progress value={0} />
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">25%</div>
                <Progress value={25} />
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">50%</div>
                <Progress value={50} />
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">75%</div>
                <Progress value={75} />
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">100%</div>
                <Progress value={100} />
            </div>
        </div>
    ),
};

export const CustomHeight: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="space-y-2">
                <div className="text-sm font-medium">Default height (h-1)</div>
                <Progress value={60} />
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">Custom height (h-2)</div>
                <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">Custom height (h-3)</div>
                <Progress value={60} className="h-3" />
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">Custom height (h-4)</div>
                <Progress value={60} className="h-4" />
            </div>
        </div>
    ),
};

export const WithLabels: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="font-medium">Uploading files...</span>
                    <span className="text-muted-foreground">45%</span>
                </div>
                <Progress value={45} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="font-medium">Processing data...</span>
                    <span className="text-muted-foreground">78%</span>
                </div>
                <Progress value={78} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="font-medium">Almost done...</span>
                    <span className="text-muted-foreground">92%</span>
                </div>
                <Progress value={92} />
            </div>
        </div>
    ),
};
