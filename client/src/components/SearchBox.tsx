import React from "react"

interface SearchBoxProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  placeholder?: string
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search players..."
}) => {
  return (
    <div className="w-full mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                   bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search players"
        />
        {searchTerm && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 12 12M1 13 13 1"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
