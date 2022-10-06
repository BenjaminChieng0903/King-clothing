import { selectorCurrentUser } from "../store/user/user.selector";
import { useSelector } from "react-redux";
const UserInfo = ()=>{
    const {email,password} = useSelector(selectorCurrentUser)
    return(
        <div>
        <p>{email}</p>
        </div>
    )
}


export default UserInfo;