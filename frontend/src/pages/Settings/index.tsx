// packages
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { X } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

// styles
import {
	StyledSettings,
	UserPanel,
	UserPanelButton,
	UserPanelContent,
} from "./Settings.styled";

// components / Redux
import Button from "@/components/Button";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import EditUserForm from "@/components/EditUserForm";
import FloatingMessage from "@/components/FloatingMessage";
import PasswordInput from "@/components/PasswordInput";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useDeleteUserMutation } from "@/features/users/usersApiSlice";

const Settings = () => {
	const navigate = useNavigate();
	const userId = useSelector(selectCurrentUserId);

	const [deleteUser, { isError }] = useDeleteUserMutation();

	const [step, setStep] = useState(0);
	const [password, setPassword] = useState("");
	const [openDelete, setOpenDelete] = useState(false);

	const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await deleteUser({ id: userId, password });

		if (!error) navigate("/");
	};

	const contentMap: { [key: number]: JSX.Element } = {
		0: <EditUserForm />,
		1: (
			<div>
				<h3>Change Password</h3>
			</div>
		),
		2: (
			<div>
				<h3>Delete User</h3>

				<Button $variant="red" onClick={() => setOpenDelete(true)}>
					Delete User <X weight="light" />
				</Button>

				<ConfirmDeleteModal
					title="your account"
					open={openDelete}
					setOpen={setOpenDelete}
					deleteFunction={handleDeleteUser}
				>
					<PasswordInput
						password={password}
						setPassword={setPassword}
					/>
				</ConfirmDeleteModal>
			</div>
		),
	};

	return (
		<>
			{isError && (
				<FloatingMessage
					type="error"
					message="Failed to delete user."
				/>
			)}

			<StyledSettings>
				<h2>Settings</h2>

				<div>
					<UserPanel>
						<UserPanelButton
							onClick={() => setStep(0)}
							$isActive={step === 0}
						>
							Edit User Info
						</UserPanelButton>

						<UserPanelButton
							onClick={() => setStep(1)}
							$isActive={step === 1}
						>
							Change Password
						</UserPanelButton>

						<UserPanelButton
							onClick={() => setStep(2)}
							$isActive={step === 2}
						>
							Delete User
						</UserPanelButton>
					</UserPanel>

					<UserPanelContent>{contentMap[step]}</UserPanelContent>
				</div>
			</StyledSettings>
		</>
	);
};

export default Settings;
