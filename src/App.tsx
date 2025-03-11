import SignUpSignIn from "@/components/SignUpSignIn/SingUpSignIn";
import styles from "./App.module.scss";
import { observer } from "mobx-react-lite";
import User from "./store/user";
import Socket from "./store/socket";
import GameRoom from "./components/GameRoom/GameRoom";

const App = observer(() => {
	return (
		<div className={styles.App}>
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
