import { CardElement, useElements, useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { PaymentFormContainer, FormContainer } from "./payment-form.style";
import { selectorCartItems, selectorTotalPrice } from "../store/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import { BUTTON_TYPE_CLASSES } from "../Button/Button";
import { selectorCurrentUser } from "../store/user/user.selector";
import { useEffect, useState } from "react";
import { setIsOrderComplete } from "../store/order/order.action";
import { setOrderComplete } from "../store/cart/cart.action";

const PaymentForm = ()=>{
    // const [payLoading, setPayLoading] = useState(false)
    // useEffect(()=>{
    //     console.log(payLoading)
    // },[payLoading])
    const [isProcessingPayment, setProcessingPayment] = useState(false)
    const [paymentRequest, setPaymentRequest] = useState(null)
    const currentUser = useSelector(selectorCurrentUser)
    const totalprice = useSelector(selectorTotalPrice)
    const cartItems = useSelector(selectorCartItems)
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(stripe){
            const pr = stripe.paymentRequest({
                currency:'aud',
                country:'AU',
                total:{
                    label:'Products total',
                    amount:1
                },
                requestPayerName:true,
                requestPayerEmail:true
            })
        pr.canMakePayment().then(res=>{
            if(res){
                setPaymentRequest(pr)
            }
        })
    pr.on('paymentmethod', async(e)=>{
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount:1}) //data that we want to send a request
        }).then(res=> res.json())
        
        const clientSecret = response.client_secret;
        const {error, paymentIntent} = await stripe.confirmCardPayment(
            clientSecret,
            {payment_method: e.paymentMethod.id},
            {handleActions: false}
          );
        if(error){
            e.complete('fail')
        }else{
        e.complete('success');
        if(paymentIntent.status === 'requires_action'){
            stripe.confirmCardPayment(clientSecret)
        }
    }
    })
}
    },[ stripe, elements ])

    const paymentHandler = async(e)=>{
        e.preventDefault()
        if(!stripe || !elements){
            return;
        }
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount : totalprice*100}) //data that we want to send a request
        }).then(res=>{
            setProcessingPayment(true)
           return res.json()
        } )//waiting data send back and convert it to json
        console.log(response)

        const clientSecret = response.client_secret;
        // console.log(clientSecret)
        const paymentResult = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name: currentUser? currentUser.email:"Guest"
                }
            }
        })
        if(paymentResult.error){
            alert("Card information is invaild! Try Again")
            setProcessingPayment(false)
        }else{
            if(paymentResult.paymentIntent.status === "succeeded"){
                setProcessingPayment(false)
                alert("payment success!")
                dispatch(setIsOrderComplete(true))
                dispatch(setOrderComplete(cartItems))
            }
        }
    }

    return(
        
        <PaymentFormContainer onSubmit={paymentHandler}>
        <FormContainer>
            <h3>Credit Card payment</h3>
        <CardElement/>
       
        <Button paymentLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
        {
            paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}}/>
        }
        </FormContainer>
       
        </PaymentFormContainer>
    )
}

export default PaymentForm;