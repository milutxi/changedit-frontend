import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Index, { loader as indexLoader } from "./routes/index.tsx";
import SignUp, { action as signUpAction } from "./routes/SignUp.tsx";
import SignIn, { action as signInAction } from "./routes/SignIn.tsx";
import auth from "./lib/auth.ts";
import CreatePost, {
  action as createPostAction,
} from "./routes/CreatePost.tsx";
import RequireAuth from "./components/RequiredAuth.tsx";
import ShowPost, { loader as showPostLoader } from "./routes/ShowPost.tsx";
import { action as createCommentAction } from "./components/CommentForm.tsx";
import { action as voteAction } from "./components/Vote.tsx";
import PostEdit, {
  action as editPostAction,
  loader as editPostLoader,
} from "./routes/EditPost.tsx";
import { action as deletePostAction } from "./routes/DeletePostAction.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: indexLoader,
        element: <Index />,
      },
      {
        path: "/posts/:id",
        loader: showPostLoader,
        element: <ShowPost />,
      },
      {
        path: "sign-in",
        action: signInAction,
        element: <SignIn />,
      },
      {
        path: "sign-up",
        action: signUpAction,
        element: <SignUp />,
      },
      {
        path: "sign-out",
        action: () => {
          auth.signOut();
          return redirect("/");
        },
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "create-post",
            action: createPostAction,
            element: <CreatePost />,
          },
          {
            path: "/posts/:id/edit",
            loader: editPostLoader,
            action: editPostAction,
            element: <PostEdit />,
          },
          {
            path: "/posts/:postId/delete",
            action: deletePostAction,
          },
          {
            path: "/posts/:postId/comments",
            action: createCommentAction,
          },
          {
            path: "/posts/:postId/vote",
            action: voteAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
