import { Outlet,Link } from "react-router-dom"
import { Fragment } from "react";
import { ReactComponent as CrownLogo} from '../../../assets/crown.svg';
import './navigation.styles.scss'
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Signout } from "../../../utils/firebase/firebase";
import CartIcon from '../../cart-icon/cart-icon'
import CartDropDown from "../../cart-dropdown/cart-dropdown";
import { CartContext } from "../../context/cartContext";
const Navigation = ()=>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  const hanlderSignout = async ()=>{
    await Signout();
  }
    return(
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to={'/'}>
        <CrownLogo className="logo"></CrownLogo>
        </Link>
        <div className="nav-links-container">
        <Link className="nav-link" to={'/shop'}>Shop</Link>
        { currentUser == null ? <Link className="nav-link" to={'/auth'}>Sign in</Link>
        : <span className="nav-link"  onClick = {hanlderSignout}>Sign out</span>}
        <CartIcon/>
        </div>
        {isCartOpen && <CartDropDown/>}
      </div>
      <Outlet/>
      </Fragment>
 
      
    )
  }

  export default Navigation;