import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers/helpers";
import {toast} from "react-toastify";

export async function logoutActions () {
    //delete user from local storage to log user out
    deleteItem({
        key: 'userName'
    });
    deleteItem({
        key: 'budgets'
    });
    deleteItem({
        key: 'expenses'
    });
    toast.success("You've successfully deleted your account 😄!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500
    });
    //return redirect
    return redirect('/');
}