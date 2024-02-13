import React from "react";

interface buttonProps {
	value: string;
}

function Button({ value }: buttonProps): React.JSX.Element {
	return (
		<button type="submit" className="btn">
			{value}
		</button>
	);
}

export default Button;
