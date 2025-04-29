export function Card({ children, className }) {
	return <div className={`p-4 bg-white text-black rounded ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
	return <div className={`font-bold text-lg mb-2 ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
	return <div className={`${className}`}>{children}</div>;
}
