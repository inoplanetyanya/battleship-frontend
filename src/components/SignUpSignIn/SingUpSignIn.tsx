import React from "react";
import styles from "./SignUpSignIn.module.scss";
import useSingUpSignIn from "./useSingUpSignIn";
import Signin from "@/components/Signin/Signin";
import Signup from "../Signup/Signup";

export interface Props {}

const SignUpSignIn: React.FC<Props> = (props) => {
	const hook = useSingUpSignIn();

	return (
		<div className={styles.SignUpSignIn}>
			<div className={styles.tabs}>
				<button
					className={[
						styles.button,
						styles.buttonSignIn,
						hook.signInIsActive ? styles.tabActive : "",
					]
						.join(" ")
						.trim()}
					onClick={hook.activeTab.setSignInActive}
				>
					Sign-in
				</button>
				<button
					className={[
						styles.button,
						styles.buttonSignUp,
						hook.signUpIsActive ? styles.tabActive : "",
					]
						.join(" ")
						.trim()}
					onClick={hook.activeTab.setSignUpActive}
				>
					Sign-up
				</button>
			</div>
			{hook.signInIsActive && <Signin />}
			{hook.signUpIsActive && <Signup />}
		</div>
	);
};

export default SignUpSignIn;
