import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-4 border rounded">
        <Typography variant="h3" className="mb-2">Headings</Typography>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="h6">Heading 6</Typography>
      </div>

      <div className="flex flex-col gap-2 p-4 border rounded">
        <Typography variant="h3" className="mb-2">Body & Text</Typography>
        <Typography variant="p">Paragraph - The quick brown fox jumps over the lazy dog.</Typography>
        <Typography variant="lead">Lead - The quick brown fox jumps over the lazy dog.</Typography>
        <Typography variant="large">Large - The quick brown fox jumps over the lazy dog.</Typography>
        <Typography variant="small">Small - The quick brown fox jumps over the lazy dog.</Typography>
        <Typography variant="muted">Muted - The quick brown fox jumps over the lazy dog.</Typography>
      </div>

      <div className="flex flex-col gap-2 p-4 border rounded">
        <Typography variant="h3" className="mb-2">Custom Variants</Typography>
        <Typography variant="cardTitle">Card Title</Typography>
        <Typography variant="cardDescription">Card Description</Typography>
        <Typography variant="rating">4.9</Typography>
        <Typography variant="detail">(123 reviews)</Typography>
      </div>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1" asChild><h1>Heading 1</h1></Typography>
      <Typography variant="h2" asChild><h2>Heading 2</h2></Typography>
      <Typography variant="h3" asChild><h3>Heading 3</h3></Typography>
      <Typography variant="h4" asChild><h4>Heading 4</h4></Typography>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="p">Paragraph (default)</Typography>
      <Typography variant="lead">Lead text</Typography>
      <Typography variant="large">Large text</Typography>
      <Typography variant="small">Small text</Typography>
      <Typography variant="muted">Muted text</Typography>
    </div>
  ),
};

export const ApplicationExamples: Story = {
  render: () => (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <Typography variant="h2" className="text-gray-900">Najlepsze salony dla Ciebie</Typography>
        <Typography variant="muted" className="mt-1">Odkryj 12 polecanych miejsc w Twojej okolicy</Typography>
      </div>
      
      <div className="p-4 border rounded-xl max-w-sm">
        <Typography variant="cardTitle">Salon Urody "Wenus"</Typography>
        <Typography variant="cardDescription" className="flex items-center gap-2 mb-2">
           <span className="text-green-700">📍</span> Warszawa, Centrum
        </Typography>
        <div className="flex items-center gap-2">
            <Typography variant="rating">4.8</Typography>
            <Typography variant="detail">(128 opinii)</Typography>
        </div>
      </div>
    </div>
  ),
};
