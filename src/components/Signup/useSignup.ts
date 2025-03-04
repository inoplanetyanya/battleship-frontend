import { useCallback } from "react";
import { SignUp } from "@/api/auth/signup";

export default function useSignup() {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);
			const response: Promise<Response> = SignUp(formData) as Promise<Response>;
			response.then(console.log);
		},
		[],
	);

	return {
		onSubmit,
	};
}
