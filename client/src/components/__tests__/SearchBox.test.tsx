import { render, screen, fireEvent } from "@testing-library/react"
import { SearchBox } from "../SearchBox"

describe("SearchBox Component", () => {
  const mockOnSearchChange = jest.fn()

  beforeEach(() => {
    mockOnSearchChange.mockClear()
  })

  it("renders with default placeholder", () => {
    render(
      <SearchBox
        searchTerm=""
        onSearchChange={mockOnSearchChange}
      />
    )
    expect(screen.getByPlaceholderText("Search players...")).toBeInTheDocument()
  })

  it("renders with custom placeholder", () => {
    const customPlaceholder = "Custom placeholder"
    render(
      <SearchBox
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        placeholder={customPlaceholder}
      />
    )
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument()
  })

  it("calls onSearchChange when input value changes", () => {
    render(
      <SearchBox
        searchTerm=""
        onSearchChange={mockOnSearchChange}
      />
    )

    const input = screen.getByLabelText("Search players")
    fireEvent.change(input, { target: { value: "Virat" } })

    expect(mockOnSearchChange).toHaveBeenCalledWith("Virat")
  })

  it("shows clear button when searchTerm exists", () => {
    render(
      <SearchBox
        searchTerm="test"
        onSearchChange={mockOnSearchChange}
      />
    )

    const clearButton = screen.getByLabelText("Clear search")
    expect(clearButton).toBeInTheDocument()
  })

  it("clears search when clear button is clicked", () => {
    render(
      <SearchBox
        searchTerm="test"
        onSearchChange={mockOnSearchChange}
      />
    )

    const clearButton = screen.getByLabelText("Clear search")
    fireEvent.click(clearButton)

    expect(mockOnSearchChange).toHaveBeenCalledWith("")
  })

  it("does not show clear button when searchTerm is empty", () => {
    render(
      <SearchBox
        searchTerm=""
        onSearchChange={mockOnSearchChange}
      />
    )

    const clearButton = screen.queryByLabelText("Clear search")
    expect(clearButton).not.toBeInTheDocument()
  })
})
