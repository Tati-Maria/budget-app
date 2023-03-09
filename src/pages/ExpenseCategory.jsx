import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers/helpers";

//loader
export async function budgetLoader({params}) {
  const budget = await getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: params.id
  })[0];

  const expenses = await getAllMatchingItems({
    category: 'expenses',
    key: 'budgetId',
    value: params.id
  });

  if(!budget) throw new Error('Budget not found');

  return {budget, expenses};
}

//Actions
export async function budgetAction({request}) {
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

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

const ExpenseCategory = () => {
  const {budget, expenses} = useLoaderData();
  return (
    <div
    style={{"--accent": budget.color}} 
    className="grid-lg">
        <h1 className="h2">
          <span className="accent">{budget.name}</span>{' '}
          Overview
        </h1>
        <div className="flex-lg">
          <BudgetItem budget={budget} showDelete={true} />
          <AddExpenseForm budgets={[budget]} />
        </div>
        {
          expenses && expenses.length > 0 && (
            <div className="grid-md">
              <h2>
                  <span className="accent">{expenses.name}</span>{' '}
                  Expenses
              </h2>
              <Table expenses={expenses} showBudget={false} />
            </div>
          )
        }
    </div>
  )
}

export default ExpenseCategory;