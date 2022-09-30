import { Outlet,Link } from "react-router-dom"
import { Fragment } from "react";
import { ReactComponent as CrownLogo} from '../../../assets/crown.svg';
import CartIcon from "../../cart-icon/cart-icon";
import './navigation.styles.scss'
import CartDropDown from "../../cart-dropdown/cart-dropdown";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Signout } from "../../../utils/firebase/firebase";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "../../store/user/user.selector";
import { selectorCartIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = ()=>{
  //  const {isCartOpen} = useContext(CartContext)

   const currentUser = useSelector(selectorCurrentUser)
   const isCartOpen = useSelector(selectorCartIsCartOpen)
  //  console.log(currentUser)
  //  const {currentUser} =  useContext(UserContext)
    return(
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to={'/'}>
        <CrownLogo className="logo"></CrownLogo>
        </Link>
        <div className="nav-links-container">
        <Link className="nav-link" to={'/shop'}>Shop</Link>
        { currentUser ?<Link className="nav-link" to={'/auth'} onClick = {Signout}>Sign out</Link>
          :<Link className="nav-link" to={'/auth'}>Sign in</Link>
    }
        <CartIcon />
        </div>
         {
          isCartOpen&& <CartDropDown/>}
      </div>
      <Outlet/>
      </Fragment>
 
      
    )
  }

  export default Navigation;