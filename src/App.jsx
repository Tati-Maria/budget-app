import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { logoutActions } from "./actions/logout";
import Main, { mainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Expenses, { expenseAction, expensesLoader } from "./pages/Expenses";
import ExpenseCategory, {budgetAction, budgetLoader} from "./pages/ExpenseCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: 'expenses',
        element: <Expenses />,
        loader: expensesLoader,
        action: expenseAction,
        errorElement: <Error />
      },
      {
        path: 'budget/:id',
        element: <ExpenseCategory />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />
      },
      {
        path: 'logout',
        action: logoutActions
      }
    ]
  },
]);

function App() {
  
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
