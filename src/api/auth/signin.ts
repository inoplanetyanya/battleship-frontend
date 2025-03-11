import { baseurl } from "../baseurl";

export interface Response {
	access: string;
	success: boolean;
}

export async function SignIn(formData: Object) {
	return fetch(`${baseurl}/api/sign-in`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((res): Response => res.json() as unknown as Response)
		.catch(console.error);
}
