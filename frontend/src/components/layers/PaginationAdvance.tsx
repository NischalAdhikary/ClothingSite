import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const PaginationAdvanced = ({ page, totalPages, setPage }) => {
  const pages = [];

  if (page > 3) {
    pages.push(1);
    pages.push("start-ellipsis");
  }

  for (let p = page - 2; p <= page + 2; p++) {
    if (p > 0 && p <= totalPages) {
      pages.push(p);
    }
  }

  if (page < totalPages - 2) {
    pages.push("end-ellipsis");
    pages.push(totalPages);
  }

  return (
    <Pagination className="mt-3">
      <PaginationContent>
        <PaginationItem onClick={() => page > 1 && setPage(page - 1)}>
          <PaginationPrevious className="cursor-pointer" />
        </PaginationItem>

        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "start-ellipsis" || p === "end-ellipsis" ? (
              <span className="px-2">...</span>
            ) : (
              <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem onClick={() => page < totalPages && setPage(page + 1)}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationAdvanced;
