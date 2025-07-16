import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
    const {addIncome, getIncomes, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate inputs
        if (!title || !amount || !date || !category || !description) {
            setError('All fields are required!')
            return
        }

        if (isNaN(amount) || amount <= 0) {
            setError('Amount must be a positive number!')
            return
        }

        try {
            await addIncome({
                ...inputState,
                amount: parseFloat(amount),
                date: date.toISOString()
            })
            
            setInputState({
                title: '',
                amount: '',
                date: new Date(),
                category: '',
                description: '',
            })
        } catch (err) {
            console.error('Form submission error:', err)
        }
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Income Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    type="number"
                    value={amount}
                    name={'amount'} 
                    placeholder="Income Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder='Add A Reference' 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-green)'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        transition: all 0.3s ease;
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
        &:focus {
            border-color: var(--color-green);
            box-shadow: 0px 1px 15px rgba(66, 173, 0, 0.2);
        }
    }
    .input-control {
        input {
            width: 100%;
        }
    }
    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
                opacity: 0.8;
                transform: translateY(-2px);
            }
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        gap: 1.5rem;

        input, textarea, select {
            padding: 0.6rem 0.8rem;
            font-size: 0.9rem;
            border-radius: 8px;
        }

        .selects {
            justify-content: stretch;

            select {
                width: 100%;
            }
        }

        .submit-btn {
            button {
                width: 100%;
                padding: 0.8rem 1rem;
                font-size: 0.9rem;
            }
        }
    }

    @media (max-width: 480px) {
        gap: 1rem;

        input, textarea, select {
            padding: 0.5rem 0.6rem;
            font-size: 0.8rem;
            border-radius: 6px;
        }

        textarea {
            rows: 3;
        }

        .submit-btn {
            button {
                padding: 0.7rem 0.8rem;
                font-size: 0.8rem;
                border-radius: 20px;
            }
        }
    }

    @media (max-width: 360px) {
        gap: 0.8rem;

        input, textarea, select {
            padding: 0.4rem 0.5rem;
            font-size: 0.75rem;
        }
    }
`;

export default Form