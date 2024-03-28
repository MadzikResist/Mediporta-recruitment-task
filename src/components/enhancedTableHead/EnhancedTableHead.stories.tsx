import type { Meta, StoryObj } from '@storybook/react';

import EnhancedTableHead from './EnhancedTableHead';

const meta: Meta<typeof EnhancedTableHead> = {
    component: EnhancedTableHead,
};

export default meta;
type Story = StoryObj<typeof EnhancedTableHead>;

export const Default: Story = {
    args: {
        onRequestSort: () => {},
        order: 'asc',
        orderBy: 'popular',
        rowCount: 1,
    },
};