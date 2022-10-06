import { Route, Routes } from "react-router-dom";
import UserPortal from "../../user-portal/user-portal";
import UserInfo from "../../user-info/user-info";
const UserGate = ()=>{
    return(
        <Routes>
            <Route index element = <UserPortal/>></Route>
            <Route path="user-info" element=<UserInfo/>></Route>
        </Routes>
    )
}

export default UserGate;