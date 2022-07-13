import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss'

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    console.log("current user (from navigation) : ",currentUser);
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>Shop</Link>
                <Link className='nav-link' to='/auth'>Sign In</Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;