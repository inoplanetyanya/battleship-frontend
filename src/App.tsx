import SignUpSignIn from "@/components/SignUpSignIn/SingUpSignIn";
import styles from "./App.module.scss";

function App() {
	return (
		<div className={styles.App}>
			<h1 className={styles.title}>Battleship</h1>
			<SignUpSignIn />
		</div>
	);
}

export default App;
