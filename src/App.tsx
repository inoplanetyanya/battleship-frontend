import styles from "./App.module.scss";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import store_window from "./store/window";
import { Route, Routes, useNavigate } from "react-router";
import PageIndex from "./pages/Index";
import PageNotFound from "./pages/NotFound";

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
			<Routes>
				<Route
					path="/"
					element={<PageIndex />}
				/>
				<Route
					path="*"
					element={<PageNotFound />}
				/>
			</Routes>
		</div>
	);
});

export default App;
