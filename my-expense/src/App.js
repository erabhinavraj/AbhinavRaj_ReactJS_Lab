import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/add" element={<AddExpense />} />
      </Routes>
    </div>
  );
};

export default App;