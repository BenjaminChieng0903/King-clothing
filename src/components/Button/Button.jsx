import Spinner from "../spinner/spinner";
import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, paymentLoading, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      disabled={paymentLoading}
      {...otherProps}
    >
     {paymentLoading?<Spinner/>:children} 
    </button>
  );
};

export default Button;