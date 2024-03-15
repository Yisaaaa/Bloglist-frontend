import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import NotificationContextProvider from "./contexts/NotificationContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./contexts/UserContextProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<UserContextProvider>
				<NotificationContextProvider>
					<App />
				</NotificationContextProvider>
			</UserContextProvider>
		</Provider>
	</QueryClientProvider>
);
