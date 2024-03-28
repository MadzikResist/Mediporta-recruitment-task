import { Dispatch, FC, SetStateAction } from "react";
import Pagination from "@mui/material/Pagination";

interface PageProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
}

const Content: FC<PageProps> = ({ page, setPage, hasMore }) => {
  return (
    <Pagination
      page={page}
      count={page < 10 ? 10 : hasMore ? page + 1 : page}
      onChange={(event, newPage) => {
        setPage(newPage);
      }}
      style={{marginLeft: '16px'}}
    />
  );
};

export default Content;
