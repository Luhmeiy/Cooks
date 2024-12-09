import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputContainer } from "@/styles/Form.styled";
import { StyledPasswordForm } from "@/styles/Password.styled";
import Button from "@/components/Button";
import FloatingMessage from "@/components/FloatingMessage";
import PasswordInput from "@/components/PasswordInput";
import { useResetPasswordMutation } from "@/features/auth/authApiSlice";

const ResetPassword = () => {
	const { token } = useParams();

	const navigate = useNavigate();
	const [resetPassword, { isError }] = useResetPasswordMutation();

	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await resetPassword({ token, password });

		if (!error) navigate("/auth/login");
	};

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message="Failed to reset password."
				/>
			)}

			<StyledPasswordForm onSubmit={handleSubmit}>
				<h2>Reset Password</h2>

				<InputContainer>
					New Password
					<PasswordInput
						password={password}
						setPassword={setPassword}
					/>
				</InputContainer>

				<Button>Reset Password</Button>
			</StyledPasswordForm>
		</>
	);
};

export default ResetPassword;
