import { SearchBar } from '../../molecules/SearchBar'
import { SortDropdown, type SortOption } from '../../molecules/SortDropdown'
import { FilterDropdown } from '../../molecules/FilterDropdown'
import './Header.css'

export interface HeaderProps {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
  rightContent?: React.ReactNode
  showControls?: boolean
  onSearch?: (searchTerm: string) => void
  onSort?: (sortBy: SortOption) => void
  sortValue?: SortOption
  onTypeFilter?: (type: string) => void
  onClearTypeFilter?: () => void
  selectedType?: string
}

export const Header = ({
  title = 'Pokédex',
  showBackButton = false,
  onBack,
  rightContent,
  showControls = false,
  onSearch,
  onSort,
  sortValue,
  onTypeFilter,
  onClearTypeFilter,
  selectedType
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__left">
            {showBackButton && (
              <button
                onClick={onBack}
                className="header__back-button"
                aria-label="Go back"
              >
                <img
                  src="/src/assets/Vector.svg"
                  alt="Back"
                  width="24"
                  height="24"
                />
              </button>
            )}

            <div className="header__title-container">
              <div className="header__logo">
                <img
                  src="/src/assets/pokeball.svg"
                  alt="Pokeball"
                  width="24"
                  height="24"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <h1 className="header__title">{title}</h1>
            </div>
          </div>

          {rightContent && <div className="header__right">{rightContent}</div>}
        </div>

        {showControls && (
          <div className="header__controls">
            <div className="header__search">
              <SearchBar placeholder="Search Pokemon..." onSearch={onSearch} />
            </div>

            <div className="header__filters">
              <FilterDropdown
                selectedType={selectedType}
                onTypeSelect={onTypeFilter}
                onClear={onClearTypeFilter}
              />

              <SortDropdown
                selectedSort={sortValue || 'number'}
                onSortSelect={onSort}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
