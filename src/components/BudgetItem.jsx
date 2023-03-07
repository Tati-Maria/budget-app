import { formatCurrency, formatPercentage, totalSpentByBudget } from '../helpers/helpers';

const BudgetItem = ({budget}) => {
    const {name, amount, id, color} = budget;
    const spent = totalSpentByBudget(id);


  return (
    <div
     style={{"--accent": color}}
    className='budget'>
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spent}>
            {formatPercentage(spent / amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)}</small>
            <small>{formatCurrency(amount - spent)}</small>
        </div>
    </div>
  )
}

export default BudgetItem;