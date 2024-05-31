import { ActionFunctionArgs, redirect } from "react-router-dom";
import auth from "../lib/auth";

export const action = async (args: ActionFunctionArgs) => {
  const { postId } = args.params;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
      {
        headers: {
          Authorization: "Bearer " + auth.getJWT(),
        },

        method: "DELETE",
      }
    );
    if (!response.ok) {
      const { message } = await response.json();

      return { message };
    }

    return redirect("/");
  } catch (error) {
    console.error("Error deleting post: " + error);
    throw error;
  }
};
