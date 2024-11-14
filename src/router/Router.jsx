import { Routes, Route } from "react-router-dom";
import { routes } from "../data";

export const Router = () => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);
