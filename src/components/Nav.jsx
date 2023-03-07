import logomark from "../images/favi.png";
import { Form, NavLink } from "react-router-dom";

//library imports
import {TrashIcon} from "@heroicons/react/24/solid"

const Nav = ({userName}) => {
  return (
    <nav>
        <NavLink
        to={'/'}
        aria-label='Go to home page'
        >
            <img src={logomark} alt="logo" height={30} />
            <span>MoBudget</span>
        </NavLink>
        {
            userName && (
                <Form
                method="POST"
                action="/logout"
                onSubmit={(e) => {
                    if(!confirm('Delete user and all data?')) {
                        e.preventDefault();
                    }
                }}
                >
                    <button
                    className="btn btn--warning" 
                    type="submit">
                        <span>
                            Delete User
                        </span>
                        <TrashIcon width={20} />
                    </button>
                </Form>
            )
        }
    </nav>
  )
}

export default Nav