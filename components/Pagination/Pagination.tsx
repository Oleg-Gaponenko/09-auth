import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  onPageChange,
  totalPages = 10,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel="←"
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
