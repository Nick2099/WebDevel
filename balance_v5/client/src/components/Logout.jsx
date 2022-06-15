import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import * as MyFunctions from "../components/MyFunctions";

function Logout({logedin, handleLogedin}) {
    const navigate = useNavigate();
    MyFunctions.addToLogFile(logedin, 7, "");
    // delete all items in sessionStorage and set user_id=0 (when user are not loged in)
    sessionStorage.clear();
    sessionStorage.setItem("user_id", 0)
    // set logedin value (number of loged user) to 0 => logout
    useEffect(() => {
        handleLogedin(0);
        navigate("/");
    },[])
}

export default Logout;