import React from "react"

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
        >
          <img
            className="h-12 w-auto"
            src="/cricprofilehub_header_logo.svg"
            alt="Cric Profile Hub"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white hidden sm:block">
            Cric Profile Hub
          </h1>
        </a>
        <nav className="hidden sm:flex space-x-4">
          <a
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="/players"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Players
          </a>
        </nav>
      </div>
    </header>
  )
}
