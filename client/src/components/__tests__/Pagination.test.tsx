import { render, screen, fireEvent } from "@testing-library/react"
import { Pagination } from "../Pagination"

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it("does not render if there is only one page", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it("renders pagination with correct number of pages", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    // Check current page is highlighted
    const currentPageButton = screen.getByRole("button", { current: "page" })
    expect(currentPageButton).toHaveTextContent("3")

    // Check we have buttons for all pages 1-5
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByLabelText(`Page ${i}`)).toBeInTheDocument()
    }
  })

  it("calls onPageChange when a page is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const pageThreeButton = screen.getByLabelText("Page 3")
    fireEvent.click(pageThreeButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const prevButton = screen.getByLabelText("Previous page")
    expect(prevButton).toBeDisabled()
  })

  it("enables previous button when not on first page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const prevButton = screen.getByLabelText("Previous page")
    expect(prevButton).not.toBeDisabled()

    fireEvent.click(prevButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByLabelText("Next page")
    expect(nextButton).toBeDisabled()
  })

  it("enables next button when not on last page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    )

    const nextButton = screen.getByLabelText("Next page")
    expect(nextButton).not.toBeDisabled()

    fireEvent.click(nextButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it("shows ellipsis for large page ranges", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    // Check for ellipsis presence
    const ellipsis = screen.getAllByText("...")
    expect(ellipsis.length).toBeGreaterThan(0)
  })

  it("allows navigation to first and last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    )

    const firstPageButton = screen.getByLabelText("Go to page 1")
    fireEvent.click(firstPageButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(1)

    const lastPageButton = screen.getByLabelText("Go to page 10")
    fireEvent.click(lastPageButton)
    expect(mockOnPageChange).toHaveBeenCalledWith(10)
  })
})
