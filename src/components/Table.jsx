import React from 'react'
import ExpenseItem from './ExpenseItem'

const Table = ({expenses, showBudget=true}) => {
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                    {
                      ['Name', 'Amount', 'Date', showBudget ? 'Budget' : '', ""].map((header, index) => (
                        <th key={index}>{header}</th>
                      ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense) => (
                        <tr key={expense.id}>
                           <ExpenseItem expense={expense} showBudget={showBudget} />
                         </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table;