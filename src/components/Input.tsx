import React, { ChangeEvent } from "react";

interface InputProps {
	type: string;
	value: string;
	placeholder: string;
	setFunction: (value: string) => void;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, value, placeholder, setFunction, required = false }) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFunction(e.target.value);
	};

	return (
		<div className="inputContainer">
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				required={required}
			/>
		</div>
	);
};

export default Input;
