import { useNavigate } from "react-router-dom";
import { StyledButton } from "./Button.styled";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	to?: string;
	$variant?: "alternate" | "gray" | "red" | "transparent";
	[key: string]: unknown;
}

const Button = ({ children, onClick, to, $variant, ...props }: ButtonProps) => {
	const navigate = useNavigate();

	return (
		<StyledButton
			onClick={to ? () => navigate(to) : onClick}
			$variant={$variant}
			{...props}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
