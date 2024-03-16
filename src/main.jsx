import ReactDOM from "react-dom/client";
import App from "./App";
import NotificationContextProvider from "./contexts/NotificationContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./contexts/UserContextProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</UserContextProvider>
	</QueryClientProvider>
);
