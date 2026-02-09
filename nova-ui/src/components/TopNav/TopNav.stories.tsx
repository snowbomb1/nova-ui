import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/react-vite';

import TopNav from './TopNav';

const meta = {
  component: TopNav,
} satisfies Meta<typeof TopNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "header": fn()
  },
};