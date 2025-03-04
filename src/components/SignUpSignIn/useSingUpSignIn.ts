import { useCallback, useState } from "react";
import { ActiveTab } from "./utils";

export default function useSingUpSignIn() {
	const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.SignIn);

	const setSignInActive = useCallback(() => {
		setActiveTab(ActiveTab.SignIn);
	}, []);

	const setSignUpActive = useCallback(() => {
		setActiveTab(ActiveTab.SignUp);
	}, []);

	const signInIsActive = activeTab === ActiveTab.SignIn;
	const signUpIsActive = activeTab === ActiveTab.SignUp;

	return {
		activeTab: {
			value: activeTab,
			setValue: setActiveTab,
			setSignInActive,
			setSignUpActive,
		},
		signInIsActive,
		signUpIsActive,
	};
}
