import { useState, useRef, useEffect } from 'react'
import './SortDropdown.css'

export type SortOption = 'name' | 'number'

export interface SortDropdownProps {
  selectedSort: SortOption
  onSortSelect?: (sort: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'number', label: 'Number' },
  { value: 'name', label: 'Name' }
]

export const SortDropdown = ({
  selectedSort,
  onSortSelect
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSortSelect = (sort: SortOption) => {
    if (onSortSelect) {
      onSortSelect(sort)
    }
    setIsOpen(false)
  }

  const getSelectedIcon = () => {
    return (
      <span
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1d1d1d',
          lineHeight: 1
        }}
      >
        #
      </span>
    )
  }

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sort-dropdown__trigger"
      >
        {getSelectedIcon()}
      </button>

      {isOpen && (
        <div className="sort-dropdown__content">
          <div className="sort-dropdown__header">
            <span className="sort-dropdown__title">Sort by:</span>
          </div>

          <div className="sort-dropdown__options">
            {sortOptions.map((option) => (
              <label key={option.value} className="sort-dropdown__option">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={selectedSort === option.value}
                  onChange={() => handleSortSelect(option.value)}
                  className="sort-dropdown__radio"
                />
                <span className="sort-dropdown__radio-custom"></span>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
