import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

const meta = {
  title: "Organisms/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Calendar
        mode="single"
        selected={new Date()}
        onSelect={() => {}}
        className="rounded-md border"
      />
    );
  },
};

export const Multiple: Story = {
  render: () => (
    <Calendar
      mode="multiple"
      selected={[]}
      onSelect={() => {}}
      className="rounded-md border"
    />
  ),
};

export const Range: Story = {
  render: () => {
    return (
      <Calendar
        mode="range"
        selected={{ from: new Date(2024, 0, 20), to: new Date(2024, 0, 25) }}
        onSelect={() => {}}
        className="rounded-md border"
      />
    );
  },
};

export const WithDropdowns: Story = {
  render: () => {
    return (
      <Calendar
        mode="single"
        selected={new Date()}
        onSelect={() => {}}
        captionLayout="dropdown-months"
        fromYear={2020}
        toYear={2030}
        className="rounded-md border"
      />
    );
  },
};

export const DisabledDates: Story = {
  render: () => {
    return (
      <Calendar
        mode="single"
        selected={new Date()}
        onSelect={() => {}}
        disabled={[
          { from: new Date(2024, 0, 1), to: new Date(2024, 0, 5) },
          new Date(2024, 0, 15),
          { dayOfWeek: [0, 6] },
        ]}
        className="rounded-md border"
      />
    );
  },
};

export const WithWeekNumbers: Story = {
  render: () => {
    return (
      <Calendar
        mode="single"
        selected={new Date()}
        onSelect={() => {}}
        showWeekNumber
        className="rounded-md border"
      />
    );
  },
};
