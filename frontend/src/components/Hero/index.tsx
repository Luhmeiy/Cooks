import { CallToAction, StyledHero } from "./Hero.styled";
import HomeHeroImage from "@/assets/HomeHeroImage";
import Button from "../Button";

const Hero = () => {
	return (
		<StyledHero>
			<CallToAction>
				<div>
					<p>Organize, Share, Cook</p>
					<h2>Your Personal Recipe Box!</h2>
				</div>
				<p>
					Effortlessly manage your recipes, ingredients and shopping
					list.
				</p>

				<Button to="/auth/login">Get Started</Button>
			</CallToAction>

			<HomeHeroImage />
		</StyledHero>
	);
};

export default Hero;
