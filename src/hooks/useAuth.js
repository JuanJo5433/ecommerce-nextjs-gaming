const { AuthContext } = require("@/context/AuthContext");
const { useContext } = require("react");


export const useAuth = () => useContext(AuthContext)