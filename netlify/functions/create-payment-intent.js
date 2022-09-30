require("dotenv").config();

 const stripe = require("@stripe")(process.env.STRIPE_SERECT_KEY)

exports.handler = async(event)=>{
    try {
        console.log(event.body)
        const {amount} = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:"usd",
            payment_method_types:["card"],
        }) // data that we want to send back
        return{
            statusCode: 200,
            body: JSON.stringify(paymentIntent)
    }

    } catch (error) {
       console.log(error)

       return{
        statusCode: 400,
        body: JSON.stringify({error})
       }
    }
 }