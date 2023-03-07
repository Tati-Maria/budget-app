import React from 'react'
import { Form } from 'react-router-dom';
import {UserPlusIcon} from '@heroicons/react/24/solid';
import illustration from "../images/budget.svg";

const Intro = () => {
  return (
    <div className='intro'>
        <div>
            <h1>
                Welcome to MoBudget <span className='accent'>
                    Your Money Management App
                </span>
            </h1>
            <p>
                MoBudget is a simple app that helps you manage your money.
                Start by creating an account and adding your income and expenses.
            </p>
            <Form method='post'>
                <input 
                type="text" 
                name="userName" 
                required 
                placeholder='What is your name?' 
                aria-label='Your name' 
                autoComplete='given-name' 
                />
                <input type="hidden" name='_action' value='newUser' />
                <button
                className='btn btn--dark' 
                type="submit">
                    <span>Get Started</span>
                    <UserPlusIcon width={20} />
                </button>
            </Form>
        </div>
        <img 
        src={illustration} 
        width={600} 
        alt="Person waving money" 
        />
    </div>
  )
}

export default Intro;