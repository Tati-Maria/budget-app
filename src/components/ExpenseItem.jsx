import { formatCurrency, formatDate } from "../helpers/helpers";
import { getAllMatchingItems } from "../helpers/helpers";
import { Link, useFetcher } from "react-router-dom";
import {TrashIcon} from "@heroicons/react/24/solid";


const ExpenseItem = ({expense, showBudget}) => {
  const fetcher = useFetcher();
  //match the color of the category to the expense
  const budget = getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: expense.budgetId
  })[0];

  return (
    <>
        <td>{expense.name}</td>
        <td>{formatCurrency(expense.amount)}</td>
        <td>{formatDate(expense.createdAt)}</td>
        { showBudget && (<td>
          <Link
          style={{"--accent": budget.color}} 
          to={`/budget/${budget.id}`}>
          {budget.name}
          </Link>
        </td>)}
        <td>
          <fetcher.Form method="POST">
            <input type="hidden" name="_action" value='deleteExpense'/>
            <input type="hidden" name="expenseId" value={expense.id}/>
            <button type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}>
              <TrashIcon width={20} />
            </button>
          </fetcher.Form>
        </td>
    </>
  )
}

export default ExpenseItem;