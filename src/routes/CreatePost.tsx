import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { ActionData } from "../types";
import auth from "../lib/auth";
import classes from "./CreatePost.module.css";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  // console.log('Form Data:', Array.from(formData.entries()));

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/posts", {
    method: "POST",
    headers: {
      Authorization: `Beare ${auth.getJWT()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const { message } = await response.json();

    return { message };
  }
  return redirect("/");
};

const CreatePost = () => {
  const error = useActionData() as ActionData;
  return (
    <div className={classes.createPostForm}>
      <h2>Create post</h2>
      <Form method="post" encType="multipart/form-data">
        {error && (
          <p>
            <b>Error:</b>
            {error.message}
          </p>
        )}
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
          <button type="submit">Create Post</button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
