import { useState, useContext } from "react";
import { UserContext } from "../../context/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    const {setCurrentUser} = useContext(UserContext);
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword){
            alert("gak podo cuk");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            // console.log("signuup rresponsee:",signUp);
            // user.displayName = displayName;
            const userDocRef = await createUserDocumentFromAuth(user,{displayName});
            console.log(userDocRef)
            alert("user creation succeed")

            setCurrentUser(user);

            resetFormField();
        } catch (error) {
            console.log("user creation error : ",error.code)
            if(error.code === 'auth/email-already-in-use') {
                alert("email already registered");
            }
            else if(error.code === 'auth/weak-password') {
                alert("password too weak");
            }else {
                alert(error.code);
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up using Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;