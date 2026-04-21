import React from 'react'

const Button = ({ text, className = '', onClick, backico = '', disabled = false, icons, type = 'button' }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`btn ${className}`}>
            {text}
        </button>
    )
}

export default Button
