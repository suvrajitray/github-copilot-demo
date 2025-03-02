import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    // Calculate start and end page numbers to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center mt-8">
      <nav aria-label="Page navigation">
        <ul className="flex items-center">
          {/* Previous page button */}
          <li>
            <button
              className={`px-3 py-2 mx-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-blue-400"
              }`}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>

          {/* First page if not in view */}
          {getPageNumbers()[0] > 1 && (
            <>
              <li>
                <button
                  className={`px-3 py-1 mx-1 rounded-md text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-blue-400`}
                  onClick={() => onPageChange(1)}
                  aria-label="Go to page 1"
                >
                  1
                </button>
              </li>
              {getPageNumbers()[0] > 2 && (
                <li>
                  <span className="px-2 py-1 text-gray-500 dark:text-gray-400">
                    ...
                  </span>
                </li>
              )}
            </>
          )}

          {/* Page numbers */}
          {getPageNumbers().map((page) => (
            <li key={page}>
              <button
                className={`px-3 py-1 mx-1 rounded-md ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-blue-400"
                }`}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Last page if not in view */}
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] <
                totalPages - 1 && (
                <li>
                  <span className="px-2 py-1 text-gray-500 dark:text-gray-400">
                    ...
                  </span>
                </li>
              )}
              <li>
                <button
                  className={`px-3 py-1 mx-1 rounded-md text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-blue-400`}
                  onClick={() => onPageChange(totalPages)}
                  aria-label={`Go to page ${totalPages}`}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          {/* Next page button */}
          <li>
            <button
              className={`px-3 py-2 mx-1 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-blue-400"
              }`}
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
