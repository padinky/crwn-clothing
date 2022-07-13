import { useState, useContext } from "react";
import { UserContext } from "../../context/user.context";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const {setCurrentUser} = useContext(UserContext)

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle  = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(user);

            setCurrentUser(user);

            resetFormField();
        } catch (error) {
            alert(error.code);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>I already have an account?</h2>
            <span>Sign In using Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;