//loader for the dashboard page
import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Intro from "../components/Intro";
import Table from "../components/Table";
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helpers/helpers"

//loading data from local storage
export function dashboardLoader() {
    const userName = fetchData('userName');
    const budgets = fetchData('budgets');
    const expenses = fetchData('expenses');
    return {
        userName,
        budgets,
        expenses
    }
}

//creating account form action
export async function dashboardAction({request}) {
  await wait();

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Welcome to MoBudget ${values.userName}!`, {
        autoClose: 1500
      });
    } catch (error) {
      toast.error('Something went wrong', {
        autoClose: 1500
      });
    }
  }

  if (_action === 'createBudget') {
    try{
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount
      });
      return toast.success(`Budget created!`, {
        autoClose: 1500
      });
    } catch {
     throw new Error('There was an error creating your budget');
    }
  }

  if (_action === 'createExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      });
      return toast.success(`Expense ${values.newExpense} created!`, {
        autoClose: 1500
      });
    } catch (error) {
      throw new Error('There was an error creating your expense');
    }
  }

  if(_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseId
      });
      return toast.success(`Expense deleted!`, {
        autoClose: 1500
      });
    } catch (error) {
      throw new Error('There was an error deleting your expense');
    }
  }
}

//dashboard page
const Dashboard = () => {
    const {userName, budgets, expenses} =useLoaderData();

    //change document title
    useEffect(() => {
      document.title = 'MoBudget - Dashboard';
    }, []);
    
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome to MoBudget <span className="accent">
          {userName}</span>
          </h1>
          <div className="grid-sm">
            {
              budgets && budgets.length > 0 ? (
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
                <AddExpenseForm budgets={budgets} />
              </div>
              <h2>Existing Budgets</h2>
              <div className="budgets">
                  {
                    budgets.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))
                  }
              </div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Recent Expenses</h2>
                        <Table 
                        expenses={expenses.sort((a , b) => b.createdAt - a.createdAt).slice(0, 8)}
                        />
                        {expenses.length > 8 && (
                          <Link
                          to="expenses"
                          className="btn btn--dark"
                          >
                          View all expenses
                          </Link>
                        )}
                      </div>
                    ) 
                  }
            </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the 
                    secret to financial freedom.
                  </p>
                  <p>Start by adding a budget below!</p>
                  <AddBudgetForm />
                </div>
              )
            }
          </div>
        </div>
      ) : (<Intro />)}
    </>
  )
}

export default Dashboard;