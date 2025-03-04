import React from "react";
import styles from "./Signin.module.scss";
import useSignin from "./useSignin";

export interface Props {}

const Signin: React.FC<Props> = (props) => {
	const hook = useSignin();

	return (
		<div className={styles.Signin}>
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

export default Signin;
