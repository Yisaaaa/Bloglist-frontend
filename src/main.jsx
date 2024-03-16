import ReactDOM from "react-dom/client";
import App from "./App";
import NotificationContextProvider from "./contexts/NotificationContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./contexts/UserContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<NotificationContextProvider>
					<App />
				</NotificationContextProvider>
			</UserContextProvider>
		</QueryClientProvider>
	</Router>
);
