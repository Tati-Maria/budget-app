import { useFetcher } from "react-router-dom";
import { useRef, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({budgets}) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    } , [isSubmitting]);

  return (
    <div className="form-wrapper">
        <h2 className="h3">Add  new{' '}<span className="accent">
                {budgets.length === 1 && `${budgets.map(budget => budget.name)}`}
            </span>{' '}
            expense
        </h2>
        <fetcher.Form 
        method="POST" 
        className="grid-sm"
        ref={formRef}
        >
            <div className="expense-inputs">
                <div className="grid-xs">
                    <label htmlFor="newExpense">Expense Name</label>
                    <input
                    type="text"
                    name="newExpense"
                    id="newExpense"
                    ref={focusRef}
                    placeholder="e.g. Coffee, Pants, etc."
                    required
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newExpenseAmount">Amount</label>
                    <input
                    type="number"
                    step={0.01}
                    name="newExpenseAmount"
                    id="newExpenseAmount"
                    placeholder="e.g. €100"
                    required
                    inputMode="decimal"
                    />
                </div>
            </div>
            <div className="grid-xs" hidden={budgets.length === 1}>
                <label htmlFor="newExpenseBudget">Budget Category</label>
                <select name="newExpenseBudget" id="newExpenseBudget" required>
                    {
                        budgets.sort((a, b) => a.createdAt - b.createdAt)
                        .map((budget) => {
                            return (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <input type="hidden" name="_action" value="createExpense" />
            <button 
            className="btn btn--dark" 
            type="submit"
            disabled={isSubmitting}
            >
                {isSubmitting ? <span>Submitting...</span> : 
                (
                    <>
                    <span>Add Expense</span>
                    <PlusCircleIcon width={20} />
                    </>
                )
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm;