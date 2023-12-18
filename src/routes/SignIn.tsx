import { ActionFunctionArgs, Form, redirect, useActionData} from "react-router-dom";
import auth from "../lib/auth";
import { ActionData } from "../types";
import classes from './SignIn.module.css';


export const action = async (args: ActionFunctionArgs) => {
    const { request } = args;

    const formData = await request.formData();

    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({username, password})
    })

    if (!response.ok) {
        const { message } = await response.json();

        return { message }
    }

    const { token } = await response.json()
    auth.signIn(token);

    return redirect('/');
  
}

const SignIn = () => {
    const error = useActionData() as ActionData;
    return(
        <div className={classes.signupForm}>
            <h2>Sign In to Changedit</h2>
            <Form method="post">
                { error && <p><b>Error:</b>{error.message}</p>}
                <div className={classes.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required />
                </div>
                <div  className={classes.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div  className={classes.formGroup}>
                    <button type="submit">Sign In</button>
                </div>
            </Form>
        </div>
    )
}

export default SignIn;