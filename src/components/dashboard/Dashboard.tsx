import DataTable from "../dataTable/DataTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Order, OrderBy, Tag } from "../../types/types";
const Dashboard: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [rowsPerPageSelect, setRowsPerPageSelect] = useState<string | null>(
    "25",
  );
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<OrderBy>("popular");
  const fetchData = async (
    page: number = 1,
    rowsPerPageSelect: string | null = "25",
    order: Order,
    orderBy: OrderBy,
  ): Promise<Tag[]> => {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/tags?pagesize=${Number(rowsPerPageSelect)}&page=${page}&order=${order}&sort=${orderBy}&site=stackoverflow`,
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const result = await response.json();
    setHasMore(result.has_more);
    return result.items.map((item: { name: string; count: number }) => ({
      name: item.name,
      count: item.count,
    }));
  };
  const { data, isLoading, error } = useQuery<Tag[]>({
    queryKey: ["data", page, rowsPerPageSelect, order, orderBy],
    queryFn: () => fetchData(page, rowsPerPageSelect, order, orderBy),
    placeholderData: keepPreviousData,
  });

  return (
        <DataTable
          data={data}
          page={page}
          setPage={setPage}
          hasMore={hasMore}
          isLoading={isLoading}
          rowsPerPageSelect={rowsPerPageSelect}
          setRowsPerPageSelect={setRowsPerPageSelect}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          error={error}
        />
  );
};

export default Dashboard;
