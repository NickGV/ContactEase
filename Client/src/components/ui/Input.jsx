import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import propTypes from 'prop-types'

export const Input = ({
  icon,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  onError,
  onClick,
  ...props
}) => (
  <div className="relative flex items-center">
    {icon && (
      <span className="absolute left-3 text-gray-400 pointer-events-none cursor-pointer" >
        <FontAwesomeIcon icon={icon} />
      </span>
    )}
    <input
      className={`w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary placeholder:text-text-secondary transition
        ${onError ? 'border-danger' : ''}
      `}
      type={type}
      name={name}
      value={value !== undefined && value !== null ? value : ''}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      {...props}
    />
  </div>
)

Input.propTypes = {
  icon: propTypes.object,
  placeholder: propTypes.string.isRequired,
  type: propTypes.string,
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  onChange: propTypes.func.isRequired,
  onBlur: propTypes.func,
  autoComplete: propTypes.string,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  onError: propTypes.string,
  onClick: propTypes.func
}
