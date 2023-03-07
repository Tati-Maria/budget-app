import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers/helpers";


//loading data from local storage
export async function expensesLoader() {
    const expenses = fetchData('expenses');
    return {
        expenses
    }
}

//expenses action
export async function expenseAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

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

const Expenses = () => {
    const {expenses} = useLoaderData();


  return (
    <div className="grid-lg">
        <h2>All Expenses</h2>
        {
            expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h3>Recent Expenses <small>({expenses.length} total)</small></h3>
                    <Table expenses={expenses} />
                </div>
            ): 
            (
                <p>No expenses yet</p>
            )
        }
    </div>
  )
}

export default Expenses;