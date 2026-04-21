import React from 'react'

const Input = React.forwardRef(({ label, type = 'text', placeholder, name, value, onChange, onBlur, error, disabled = false, className = '', ...props }, ref) => {
    return (
        <div className='input-group'>
            {label && <label className="input-label">{label}</label>}
            <div className="input-wrapper">
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    className={`input-field ${className}`}
                    {...props}
                />
            </div>
            {error && <p className='input-error'>{error}</p>}
        </div>
    )
})

Input.displayName = 'Input'

export default Input
