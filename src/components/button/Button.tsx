import React from 'react';

type ButtonProps = {
	className: string;
	children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, children }) => {
	return (
		<button
			className={`bg-btn hover:bg-btnHover text-white font-bold flex items-center justify-center ${className}`}
		>
			{children}
		</button>
	);
};
export default Button;
