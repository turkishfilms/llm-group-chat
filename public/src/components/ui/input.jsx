import { forwardRef } from "react";

export const Input = forwardRef(({ value, onChange, onKeyDown, placeholder, className }, ref) => {
	return (
		<input
			ref={ref}
			type="text"
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
			className={`p-2 border rounded ${className}`}
		/>
	);
});

