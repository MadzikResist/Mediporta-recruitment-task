import type { Meta, StoryObj } from "@storybook/react";

import DataTable from "./DataTable";

const meta: Meta<typeof DataTable> = {
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    data: [
      { name: "Java", count: 1111 },
      { name: "JavaScript", count: 123456 },
    ],
    page: 1,
    setPage: () => {},
    hasMore: false,
    isLoading: false,
    rowsPerPageSelect: "2",
    setRowsPerPageSelect: () => {},
    order: "asc",
    setOrder: () => {},
    orderBy: "popular",
    setOrderBy: () => {},
    error: null,
  },
};

export const NotFoundData: Story = {
  args: {
    data: undefined,
    page: 1,
    setPage: () => {},
    hasMore: false,
    isLoading: false,
    rowsPerPageSelect: "1",
    setRowsPerPageSelect: () => {},
    order: "asc",
    setOrder: () => {},
    orderBy: "popular",
    setOrderBy: () => {},
    error: null,
  },
};
export const DataError: Story = {
  args: {
    data: undefined,
    page: 1,
    setPage: () => {},
    hasMore: false,
    isLoading: false,
    rowsPerPageSelect: "1",
    setRowsPerPageSelect: () => {},
    order: "asc",
    setOrder: () => {},
    orderBy: "popular",
    setOrderBy: () => {},
    error: new Error("Error fetching data"),
  },
};
export const Loading: Story = {
  args: {
    data: undefined,
    page: 1,
    setPage: () => {},
    hasMore: false,
    isLoading: true,
    rowsPerPageSelect: "1",
    setRowsPerPageSelect: () => {},
    order: "asc",
    setOrder: () => {},
    orderBy: "popular",
    setOrderBy: () => {},
    error: null,
  },
};
