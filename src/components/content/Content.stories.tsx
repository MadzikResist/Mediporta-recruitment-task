import type { Meta, StoryObj } from "@storybook/react";

import Content from "./Content";

const meta: Meta<typeof Content> = {
  component: Content,
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Default: Story = {
  args: {
    page: 100,
    setPage: () => {},
    hasMore: true,
  },
};
