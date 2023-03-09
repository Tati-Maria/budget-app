import { redirect } from "react-router-dom";

import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers/helpers";

export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id
        });
         //get associated expenses that are connected to the budget and delete them
         const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
         });

         associatedExpenses.forEach((expense) => {
                deleteItem({
                    key: "expenses",
                    id: expense.id
                })
         })

        toast.success("Budget deleted successfully! ");
    } catch (error) {
        throw new Error('Error deleting budget')
    }

    return redirect('/')
}