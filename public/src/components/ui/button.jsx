import { forwardRef } from "react";

export const Button = forwardRef(({ onClick, children, className, size }, ref) => {
	return (
		<button
			ref={ref}
			onClick={onClick}
			className={`p-2 rounded ${size === "icon" ? "w-10 h-10" : ""} ${className}`}
			type="button"
		>
			{children}
		</button>
	);
});
