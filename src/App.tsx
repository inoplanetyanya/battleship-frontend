import SignUpSignIn from "@/components/SignUpSignIn/SingUpSignIn";
import styles from "./App.module.scss";
import { observer } from "mobx-react-lite";
import User from "./store/user";
import Socket from "./store/socket";
import GameRoom from "./components/GameRoom/GameRoom";
import { useEffect } from "react";
import store_window from "./store/window";

const App = observer(() => {
	useEffect(() => {
		const handleResize = () => {
			store_window.height = window.visualViewport?.height || 0;
		};
		window.visualViewport?.addEventListener("resize", handleResize);
		return () => {
			window.visualViewport?.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div
			className={styles.App}
			style={{ height: `${store_window.height}px` }}
		>
			{User.username && Socket.socket ? (
				<>
					<GameRoom />
				</>
			) : (
				<>
					<h1 className={styles.title}>Battleship</h1>
					<SignUpSignIn />
				</>
			)}
		</div>
	);
});

export default App;
