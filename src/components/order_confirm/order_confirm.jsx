import {BsCheckLg} from "react-icons/bs"
// import Box from '@mui/material/Box';
// import Switch from '@mui/material/Switch';
// import Paper from '@mui/material/Paper';
// import Fade from '@mui/material/Fade';
import Button from "../Button/Button";
import { selectorOrder } from "../store/order/order.selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setIsOrderComplete} from "../store/order/order.action";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrderAlertContainer, OrderConfirmContainer } from "./order_confirm.style";
// import FormControlLabel from '@mui/material/FormControlLabel';
const OrderConfirm = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var amount = 3
    let [second,setSecond] = useState(amount)
    // const isOrderComplete = useSelector(selectorOrder)
    useEffect(()=>{
        setInterval(()=>{
            setSecond(second--)
        },1000)
        
        setTimeout(()=>{
            navigate('/shop')
            dispatch(setIsOrderComplete(false))
        },4000)
        
    },[])
    const ClickHandler = ()=>{ 
        navigate('/shop')
    }
    return(
        <OrderConfirmContainer>
        <OrderAlertContainer>
        <BsCheckLg width="100px" height="100px"/>
        <h3>Thanks for your order!</h3> 
        <h4>Page will automatically return to shop in {second} s</h4>
        </OrderAlertContainer>
        <Button onClick={ClickHandler}>Order Again</Button>
        </OrderConfirmContainer>
    )

}

export default OrderConfirm;