import React from "react";

// const AuthContext = React.createContext(["isLoggedIn", () => {}]);
const AuthContext = React.createContext({
    "currentUser":"guest",
    setCurrentUser: () => {}
});
export default AuthContext;
