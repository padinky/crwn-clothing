import { auth, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
// import { async } from '@firebase/util';
import './authentication.styles.scss'


const Authentication = () => {

    // --- this useEffect is used for sign in with google redirect method, ignore for now
    useEffect( () => {
        const getResponse = async () => {
            const response = await getRedirectResult(auth);
            // console.log(response);
            if(response) {
                //--- if response not null, means the user is authenticated
                await createUserDocumentFromAuth(response.user);
            }
        }
        getResponse();
    }, []);

    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;