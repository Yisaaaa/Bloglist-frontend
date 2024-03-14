import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import NotificationContextProvider from "./contexts/NotificationContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</Provider>
	</QueryClientProvider>
);
