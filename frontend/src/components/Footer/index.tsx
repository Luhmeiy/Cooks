import { useLocation } from "react-router-dom";
import { StyledFooter } from "./Footer.styled";

const Footer = () => {
	const location = useLocation();
	const is404 = location.key === "default";

	return (
		<StyledFooter is404={is404.toString()}>
			Made with 🧡 for home cooks.
		</StyledFooter>
	);
};

export default Footer;
