import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { ActionData, Post } from "../types";
import auth from "../lib/auth";
import classes from "./CreatePost.module.css";

// Loader function to fetch post data
export const loader = async ({ params }: ActionFunctionArgs) => {
  const { id } = params;
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/posts/" + id
  );
  if (!response.ok) {
    throw new Error("Could not fetch post");
  }
  const post: Post = await response.json();
  return post;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { id } = params;

  const postData = Object.fromEntries(formData.entries());

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/posts/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getJWT()}`,
      },
      body: JSON.stringify(postData),
    }
  );

  if (!response.ok) {
    const { message } = await response.json();

    return { message };
  }
  return redirect("/posts/" + id);
};

const PostEdit = () => {
  const post = useLoaderData() as Post;
  const error = useActionData() as ActionData;
  return (
    <div>
      <h2>EDIT POST</h2>
      <Form method="put" encType="multipart/form-data">
        {error && (
          <p className={classes.errorp}>
            <b className={classes.error}>Error:</b>{error.message}
          </p>
        )}
        <div className={classes.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post.title}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="link">Link (optional)</label>
          <input type="text" name="link" id="link" defaultValue={post.link} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="body">Body (optional)</label>
          <textarea name="body" id="body" defaultValue={post.body} />
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
  );
};

export default PostEdit;
