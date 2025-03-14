import { Response as SignInResponse, SignIn } from "@/api/auth/signin";
import { CreateWS } from "@/api/websocket/connect";
import User from "@/store/user";
import Socket from "@/store/socket";
import React from "react";
import { useCallback, useEffect, useState } from "react";

export default function useSignin() {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
		async (event) => {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);
			const objFormData = Object.fromEntries(formData);
			const response = SignIn(objFormData);

			const psocket = response.then((res) => {
				res = res as SignInResponse;
				if (!res.success) return;

				User.username = objFormData["username"].toString();
				const s = CreateWS();

				s.onopen = (event) => {
					console.log("Socket onopen event: ", event);
					s.send(`/connect ${res.access}`);
				};

				s.onclose = (event) => {
					console.log("Socket onclose event: ", event);
				};

				s.onerror = (event) => {
					console.log("Socket onerror event: ", event);
				};

				const onmessage = (event: MessageEvent<any>) => {
					const ed = event.data;
					console.log("Socket message data: ", ed);
				};
				Socket.socket?.addEventListener("message", onmessage);

				const bc = () => {
					s.send(`/disconnect ${res.access}`);
				};
				Socket.socket = s;
				Socket.beforeClose = bc;

				return s;
			});
		},
		[],
	);

	return {
		onSubmit,
	};
}
