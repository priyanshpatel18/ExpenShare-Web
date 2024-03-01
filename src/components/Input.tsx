import React from "react";

interface InputProps {
    icon: string;
    type: string;
    placeholder: string;
    required?: boolean;
    field: {
        value: string;
        onChange: (e: React.ChangeEvent<any>) => void;
        onBlur: (e: React.FocusEvent<any>) => void;
    };
}

function Input({
    icon,
    type,
    placeholder,
    field,
    required = false,
}: InputProps): React.JSX.Element {
    return (
        <div className="inputContainer">
            <img src={icon} alt="" className="icon" />
            <input
                type={type}
                placeholder={placeholder}
                required={required}
                {...field}
            />
        </div>
    );
}

export default Input;
