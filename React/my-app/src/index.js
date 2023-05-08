import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostsPage from "./practice/pages/PostsPage";
import PostPage, { loader as postPageLoader } from "./practice/pages/PostPage";
import NotFoundPage from "./practice/pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <h1>Home</h1>,
            },
            {
                path: "/posts",
                element: <PostsPage />,
            },
            {
                path: `/posts/:postId`,
                element: <PostPage />,
                loader: postPageLoader,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
