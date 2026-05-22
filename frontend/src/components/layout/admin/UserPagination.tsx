import Link from "next/link";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function UserPagination({
  total,
  currentPage,
  search = "",
  className =""
}: {
  total: number;
  currentPage: number;
  search?: string;
  className?:string
}) {
  const totalPages = Math.ceil(total / 10);

  const makeLink = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (search) params.set("search", search);
    return `/admin/users?${params.toString()}`;
  };

  return (
    <div className={`mt-4 flex gap-2 items-center ${className}`}>
      <Link
        href={makeLink(currentPage - 1)}
        className={` hover:text-blue-600 ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
      >
        <ChevronLeftIcon />
      </Link>
      {Array.from({ length: totalPages }).map((_, idx) => {
        const page = idx + 1;
        return (
          <Link
            key={page}
            href={makeLink(page)}
            className={`px-3 py-1 border rounded-full ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-500 hover:bg-gray-200"
            }`}
          >
            {page}
          </Link>
        );
      })}
      <Link
        href={makeLink(currentPage + 1)}
        className={` hover:text-blue-600 ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
      >
        <ChevronRightIcon/>
      </Link>
    </div>
  );
}
