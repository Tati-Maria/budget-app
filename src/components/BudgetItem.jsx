import { Link, Form } from 'react-router-dom';
import { formatCurrency, formatPercentage, totalSpentByBudget } from '../helpers/helpers';
import {BanknotesIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/24/solid";

const BudgetItem = ({budget, showDelete=false}) => {
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
            <small>{formatCurrency(spent)} spent</small>
            <small>{formatCurrency(amount - spent)} remaining</small>
        </div>
        {
            showDelete ? (
                <div className="flex-sm">
                    <Form 
                    method='post'
                    action='delete'
                    onSubmit={e => {
                        if(!window.confirm('Are you sure you want to delete this budget?')){
                            e.preventDefault();
                        }
                    }}
                    >
                       <button className='btn' type='submit'>
                            <span>Delete</span>
                            <TrashIcon width={20} />
                       </button>    
                    </Form>
                </div>
            ) : (
                <div className='flex-sm'>
                    <Link
                        to={`/budget/${id}`}
                        className='btn'
                    >
                        <span>View Details</span>
                        <BanknotesIcon width={20} />
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default BudgetItem;