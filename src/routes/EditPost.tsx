import React from 'react'
import { ActionFunctionArgs, Form, redirect, useActionData} from "react-router-dom";
import { ActionData } from "../types";
import auth from "../lib/auth";
import classes from "./CreatePost.module.css";

export const action = async ({request, params}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const {id} = params

    const postData = Object.fromEntries(formData.entries());

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getJWT()}`,
            },
            body: JSON.stringify(postData),
    });

    if(!response.ok) {
        const { message } = await response.json();

        return {message};
    }
    return redirect('/posts/' + id)
};


const PostEdit = () => {
    const error = useActionData()as ActionData
  return (
    <div>
        <h2>EDIT POST</h2>
        <Form method="put">
            {/* { error && <p><b>Error:</b>{error.message}</p>} */}
            <div className={classes.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" required />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="link">Link (optional)</label>
                <input type="text" name="link" id="link" />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="body">Body (optional)</label>
                <textarea name="body" id="body" />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="image"> Image(optional)</label>
                <input type="file" name="image" id="image" accept="image/*" />
            </div>
           
            <div>
                <button type="submit">Update Post</button>
            </div>
        </Form>
    </div>
  )
};

export default PostEdit;