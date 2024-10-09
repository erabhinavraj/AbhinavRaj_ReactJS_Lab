import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExpenseList.css';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [totals, setTotals] = useState({ total: 0, rahulPaid: 0, rameshPaid: 0, message: '' });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        axios.get('http://localhost:3002/expenses')
            .then(response => {
                setExpenses(response.data);
                calculateTotals(response.data);
            });
    };

    const calculateTotals = (expenses) => {
        let total = 0;
        let rahulPaid = 0;
        let rameshPaid = 0;
        expenses.forEach(expense => {
            total += Number(expense.price);
            if (expense.payee === 'Rahul') {
                rahulPaid += Number(expense.price);
            } else if (expense.payee === 'Ramesh') {
                rameshPaid += Number(expense.price);
            }
        });
        const balance = rahulPaid - rameshPaid;
        const message = balance === 0
            ? 'Balanced'
            : balance > 0
                ? `Ramesh should pay Rahul: Rs ${balance}`
                : `Rahul should pay Ramesh: Rs ${Math.abs(balance)}`;

        setTotals({ total, rahulPaid, rameshPaid, message });
    };

    const clearExpenses = () => {
        expenses.forEach(expense => {
            axios.delete(`http://localhost:3002/expenses/${expense.id}`)
                .then(() => {
                    fetchExpenses();
                });
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Expense Tracker</h1>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product Purchased</th>
                        <th>Price</th>
                        <th>Payee</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.date}</td>
                            <td>{expense.product}</td>
                            <td>{expense.price}</td>
                            <td>{expense.payee}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="totals mt-4">
                <p><strong>Total: Rs</strong> {totals.total}</p>
                <p><strong>Rahul paid: Rs</strong> {totals.rahulPaid}</p>
                <p><strong>Ramesh paid: Rs</strong> {totals.rameshPaid}</p>
                <p><strong>{totals.message}</strong></p>
            </div>
            <div className="text-center">
                <Link to="/add" className="btn btn-primary mt-3 mr-3">Add Expense</Link>
                <button onClick={clearExpenses} className="btn btn-danger mt-3">Clear</button>
            </div>
        </div>
    );
};

export default ExpenseList;