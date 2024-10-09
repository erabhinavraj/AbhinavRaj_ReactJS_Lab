import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddExpense.css';

const AddExpense = () => {
    const [form, setForm] = useState({ date: '', product: '', price: '', payee: 'Rahul' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedDate = new Date(form.date);
        const currentDate = new Date();
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        if (selectedDate < previousMonth) {
            setError('The selected date cannot be from the previous month.');
            return;
        }

        axios.post('http://localhost:3002/expenses', form)
            .then(() => {
                navigate('/');
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Expense</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="form-dark">
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="form-group mt-3">
                    <label>Product Purchased</label>
                    <input type="text" className="form-control" name="product" value={form.product} onChange={handleChange} required />
                </div>
                <div className="form-group mt-3">
                    <label>Price</label>
                    <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div className="form-group mt-3">
                    <label>Payee</label>
                    <select className="form-control" name="payee" value={form.payee} onChange={handleChange} required>
                        <option value="">Select Payee</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;