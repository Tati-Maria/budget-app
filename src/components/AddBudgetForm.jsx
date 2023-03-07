import { Form, useFetcher } from "react-router-dom";
import { CurrencyEuroIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";


const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef =  useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting]);

  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Add a new budget
        </h2>
        <fetcher.Form
        ref={formRef}
        method="POST"
        className="grid-sm"
        >
            <div className="grid-xs">
                <label htmlFor="newBudget">Budget Name</label>
                <input
                ref={focusRef} 
                type="text" 
                name="newBudget" 
                id="newBudget"
                placeholder="e.g. Groceries, Rent, etc."
                required
                />
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Budget Amount</label>
                <input 
                type="number"
                step={0.01} 
                name="newBudgetAmount" 
                id="newBudgetAmount"
                placeholder="e.g. €1000"
                required 
                inputMode="decimal"
                />
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button 
            className="btn btn--dark" 
            type="submit"
            disabled={isSubmitting}
            >
                {isSubmitting ? <span>Submitting...</span> : 
                (
                    <>
                    <span>Add Budget</span>
                    <CurrencyEuroIcon width={20} />
                    </>
                )
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm;