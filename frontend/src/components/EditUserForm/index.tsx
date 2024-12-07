// packages
import { Dispatch, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";

// styles
import { InputContainer, PublicContainer } from "@/styles/Form.styled";
import { CloseButton, StyledModalForm } from "@/styles/Modal.styled";

// components / Redux
import Button from "../Button";
import FloatingMessage from "../FloatingMessage";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { usePatchUserMutation } from "@/features/users/usersApiSlice";

const EditUserForm = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
	const user = useSelector(selectCurrentUser);
	const [patchUser, { isError, isSuccess }] = usePatchUserMutation();

	const [username, setUsername] = useState(user?.username);
	const [description, setDescription] = useState(user?.description);
	const [isPublic, setIsPublic] = useState(user?.public);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await patchUser({
			id: user?._id,
			data: {
				data: { username, description, public: isPublic },
			},
		});

		if (!error) setOpen(false);
	};

	useEffect(() => {
		setUsername(user?.username);
		setDescription(user?.description);
		setIsPublic(user?.public);
	}, [open, user]);

	return (
		<>
			{isError && (
				<FloatingMessage type="error" message="Failed to edit user." />
			)}
			{isSuccess && (
				<FloatingMessage type="success" message="User edited." />
			)}

			<Modal open={open} onClose={() => setOpen(false)}>
				<StyledModalForm $gap={1} onSubmit={handleSubmit}>
					<CloseButton weight="bold" onClick={() => setOpen(false)} />

					<h3>Edit User</h3>

					<InputContainer>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</InputContainer>

					<InputContainer>
						Description
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</InputContainer>

					<PublicContainer>
						<b>Do you want your profile to be public?</b>

						<div>
							<label>
								<input
									type="radio"
									name="public"
									value="true"
									checked={isPublic === true}
									onChange={() => setIsPublic(true)}
								/>
								Yes
							</label>

							<label>
								<input
									type="radio"
									name="public"
									value="false"
									checked={isPublic === false}
									onChange={() => setIsPublic(false)}
								/>
								No
							</label>
						</div>
					</PublicContainer>

					<Button>Save</Button>
				</StyledModalForm>
			</Modal>
		</>
	);
};

export default EditUserForm;
