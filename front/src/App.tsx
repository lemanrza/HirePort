import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes/Route";
import { SnackbarProvider } from "notistack";
// import { Provider } from "react-redux";

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
        <RouterProvider router={router} />
        <SnackbarProvider />
      {/* </Provider> */}

    </>
  );
}

export default App;
