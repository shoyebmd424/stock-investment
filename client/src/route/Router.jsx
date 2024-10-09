import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Routes";
import { Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import Loader from "../utils/loader";

const router = createBrowserRouter(
  routes.map((route) => {
    const element = route.needsAuth ? (
      <PrivateRoute  key={Math.random()}>
        <Suspense fallback={<Loader />}>{route.element}</Suspense>
      </PrivateRoute>
    ) : (
      <Suspense fallback={<Loader />}>{route.element}</Suspense>
    );

    return {
      ...route,
      element,
      children: route.children?.map((childRoute) => ({
        ...childRoute,
        element: childRoute.needsAuth ? (
          <PrivateRoute key={Math.random()}>
            <Suspense fallback={<Loader />}>{childRoute.element}</Suspense>
          </PrivateRoute>
        ) : (
          <Suspense fallback={<Loader />}>{childRoute.element}</Suspense>
        ),
      })),
    };
  })
);
const Router = () => <RouterProvider router={router} />;
export default Router;
