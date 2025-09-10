import { useState, useRef, useEffect } from 'react'
import { Icon } from '../../atoms/Icon'
import { TypeBadge } from '../../atoms/TypeBadge'
import {
  pokemonTypes,
  capitalizeFirstLetter
} from '../../../utils/pokemonUtils'
import './FilterDropdown.css'

export interface FilterDropdownProps {
  selectedType?: string
  onTypeSelect?: (type: string) => void
  onClear?: () => void
}

export const FilterDropdown = ({
  selectedType,
  onTypeSelect,
  onClear
}: FilterDropdownProps) => {
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

  const handleTypeSelect = (type: string) => {
    if (onTypeSelect) {
      onTypeSelect(type)
    }
    setIsOpen(false)
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    }
    setIsOpen(false)
  }

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="filter-dropdown__trigger"
      >
        <Icon name="filter" size={20} />
      </button>

      {isOpen && (
        <div className="filter-dropdown__content">
          <div className="filter-dropdown__header">
            <span className="filter-dropdown__title">Filter by Type</span>
            {selectedType && (
              <button onClick={handleClear} className="filter-dropdown__clear">
                Clear
              </button>
            )}
          </div>

          <div className="filter-dropdown__options">
            {pokemonTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`filter-dropdown__option ${
                  selectedType === type ? 'filter-dropdown__option--active' : ''
                }`}
              >
                <TypeBadge type={type} size="sm" />
                <span>{capitalizeFirstLetter(type)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
