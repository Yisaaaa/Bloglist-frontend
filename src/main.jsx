import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import NotificationContextProvider from "./contexts/NotificationContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<NotificationContextProvider>
			<App />
		</NotificationContextProvider>
	</Provider>
);
