import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext();

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET': return action.payload;
    case 'ADD': return [{ ...action.payload, id: Math.random().toString() }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatedItem = { ...state[updatableExpenseIndex], ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE': return state.filter((expense) => expense.id !== action.payload);
    default: return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem('@expenses');
        if (storedExpenses) dispatch({ type: 'SET', payload: JSON.parse(storedExpenses) });
      } catch (error) { console.error('Erro ao carregar', error); } 
      finally { setIsLoaded(true); }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    async function saveExpenses() {
      if (isLoaded && Array.isArray(expensesState)) {
        try { 
          await AsyncStorage.setItem('@expenses', JSON.stringify(expensesState)); 
        } catch (error) { 
          console.error('Erro ao salvar', error); 
        }
      }
    }
    saveExpenses();
  }, [expensesState, isLoaded]);

  const value = {
    expenses: expensesState,
    addExpense: (data) => dispatch({ type: 'ADD', payload: data }),
    updateExpense: (id, data) => dispatch({ type: 'UPDATE', payload: { id, data } }),
    deleteExpense: (id) => dispatch({ type: 'DELETE', payload: id }),
    clearExpenses: () => dispatch({ type: 'SET', payload: [] }),
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) throw new Error('useExpenses fora do Provider');
  return context;
}