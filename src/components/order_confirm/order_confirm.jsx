import {BsCheckLg} from "react-icons/bs"
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from "../Button/Button";
import { selectorOrder } from "../store/order/order.selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setIsOrderComplete} from "../store/order/order.action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { darkScrollbar } from "@mui/material";
// import FormControlLabel from '@mui/material/FormControlLabel';
const OrderConfirm = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const isOrderComplete = useSelector(selectorOrder)
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/shop')
            dispatch(setIsOrderComplete(false))
        }, 3000)
        
    },[])
    const ClickHandler = ()=>{ 
        navigate('/shop')
    }
    return(
        <div>
            <div>
        <BsCheckLg/>
        <h3>Thanks for your order! Page will automatically return to shop in {} s</h3>
        </div>
        <Button onClick={ClickHandler}>Order Again</Button>
        </div>
    )

}

export default OrderConfirm;