import './Filter_Checkbox.css'


export function FilterCheckbox({ category, options, onFilterChange }) {
    return (
      <div className="filter-group">
        <h4>{category}</h4>
        <ul>
          {options.map(option => (
            <li key={option}>
              <input
                type="checkbox"
                id={option}
                value={option}
                onChange={e => onFilterChange(category, e.target.checked ? [option] : [])}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  }