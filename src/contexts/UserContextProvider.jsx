import { createContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
	const [user, userDispatch] = useReducer(userReducer, null);

	return (
		<UserContext.Provider value={[user, userDispatch]}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
