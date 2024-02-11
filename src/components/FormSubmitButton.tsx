import React from "react";

interface ButtonProps {
	value: string;
}

const Button: React.FC<ButtonProps> = ({ value }) => {
	return <button type="submit" className="btn">{value}</button>;
};

export default Button;
