import React from "react";
import styles from "./Signup.module.scss";
import useSignup from "./useSignup";

export interface Props {}

const Signup: React.FC<Props> = (props) => {
	const hook = useSignup();

	return (
		<div className={styles.Signup}>
			<form
				className={styles.form}
				onSubmit={hook.onSubmit}
			>
				<div className={styles.inputContainer}>
					<label htmlFor="username">username</label>
					<input
						type="text"
						name="username"
						id="username"
					/>
				</div>
				<div className={styles.inputContainer}>
					<label htmlFor="password">password</label>
					<input
						type="password"
						name="password"
						id="password"
						autoComplete="new-password"
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Signup;
