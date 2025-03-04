import { baseurl } from "../baseurl";

export async function SignUp(formData: FormData) {
	return fetch(`${baseurl}/api/sign-up`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(Object.fromEntries(formData)),
	})
		.then((res) => res.json())
		.catch(console.error);
}
