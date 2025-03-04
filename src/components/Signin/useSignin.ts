import { SignIn } from "@/api/auth/signin";
import { useCallback } from "react";

export default function useSignin() {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);
			const response: Promise<Response> = SignIn(formData) as Promise<Response>;
			response.then(console.log);
		},
		[],
	);

	return {
		onSubmit,
	};
}
