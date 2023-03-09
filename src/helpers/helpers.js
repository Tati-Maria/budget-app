import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800));


//generate random color
const generateRandomColor = () => {
    const existingBudgetLength = fetchData('budgets')?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

//Local storage helper
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//get all items from the local storage
export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) || [];
    return data.filter(item => item[key] === value);
}

//create new budget
export const createBudget = ({
    name,
    amount,
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    }

    const existingBudgets = fetchData('budgets') || [];
    return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]));
}

//create new expense
export const createExpense = ({
    name,
    amount,
    budgetId,
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    }

    const existingExpenses = fetchData('expenses') || [];
    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]));
}

//delete an item from the local storage
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter(item => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

//total spent by budget
export const totalSpentByBudget = (budgetId) => {
    //get the expenses
    const expenses = fetchData('expenses') || [];
    const totalSpent = expenses.reduce((acc, expense) => {
        //if budgetId matches, add to accumulator and return
        if (expense.budgetId === budgetId) {
            return acc += expense.amount;
        }
        return acc;
    }, 0);

    return totalSpent;
}

//format percentage
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 0,
    })
}

//Format currency to EUR
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: 'currency',
        currency: 'EUR',
    });
}

//format date
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
}

//scroll to top
export const ScrollToTop = () => {
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;

};