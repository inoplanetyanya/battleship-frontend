import React from "react";
import User from "@/store/user";
import Socket from "@/store/socket";
import GameRoom from "@/components/GameRoom/GameRoom";
import SignUpSignIn from "@/components/SignUpSignIn/SingUpSignIn";

export interface Props {}

const PageIndex: React.FC<Props> = (props) => {
	return (
		<div>
			{User.username && Socket.socket ? (
				<>
					<GameRoom />
				</>
			) : (
				<>
					<SignUpSignIn />
				</>
			)}
		</div>
	);
};

export default PageIndex;
