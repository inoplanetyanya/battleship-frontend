import { baseurl } from "../baseurl";

export async function SignIn(formData: FormData) {
	return fetch(`${baseurl}/api/sign-in`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(Object.fromEntries(formData)),
	})
		.then((res) => res.json())
		.catch(console.error);
}
