import { createSlice } from '@reduxjs/toolkit';

const initialTransactions = [
  { id: 1, name: 'Apple Store', date: 'Oct 24, 2023', amount: '1,499', status: 'Completed', type: 'debit', category: 'Technology', icon: '📱' },
  { id: 2, name: 'Stripe Payout', date: 'Oct 23, 2023', amount: '12,500', status: 'Completed', type: 'credit', category: 'Income', icon: '💰' },
  { id: 3, name: 'Uber Technologies', date: 'Oct 22, 2023', amount: '450', status: 'Pending', type: 'debit', category: 'Transport', icon: '🚗' },
  { id: 4, name: 'Rent Payment', date: 'Oct 01, 2023', amount: '25,000', status: 'Completed', type: 'debit', category: 'Housing', icon: '🏠' },
  { id: 5, name: 'Google Cloud', date: 'Sep 28, 2023', amount: '8,200', status: 'Completed', type: 'debit', category: 'Work', icon: '☁️' },
  { id: 6, name: 'Amazon Shopping', date: 'Sep 25, 2023', amount: '3,400', status: 'Completed', type: 'debit', category: 'Shopping', icon: '📦' },
  { id: 7, name: 'Starbucks Coffee', date: 'Sep 24, 2023', amount: '350', status: 'Failed', type: 'debit', category: 'Food', icon: '☕' },
  { id: 8, name: 'Freelance Design', date: 'Sep 20, 2023', amount: '18,000', status: 'Completed', type: 'credit', category: 'Income', icon: '🎨' },
];

const initialState = {
  transactions: initialTransactions,
  userRole: 'viewer', // 'viewer' or 'admin'
  isAuthenticated: false,
  searchQuery: '',
  filterStatus: 'All',
  notifications: [],
  activeToast: null,
};

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      // Add standard fields to the new transaction
      state.transactions = [
        {
          id: Date.now(), // Generate a unique timestamp ID
          status: 'Pending',
          type: action.payload.type || 'debit',
          category: action.payload.category || 'Misc',
          icon: action.payload.icon || '💸',
          ...action.payload,
        },
        ...state.transactions
      ];
    },
    completeTransaction: (state, action) => {
      const txn = state.transactions.find(t => t.id === action.payload);
      if(txn) {
        txn.status = 'Completed';
      }
    },
    addNotification: (state, action) => {
      const newNotif = { ...action.payload, id: Date.now(), time: new Date().toLocaleTimeString(), read: false };
      state.notifications.unshift(newNotif);
      state.activeToast = newNotif;
    },
    markNotificationsRead: (state) => {
      state.notifications.forEach(n => { n.read = true; });
    },
    hideToast: (state) => {
      state.activeToast = null;
    },
    toggleRole: (state) => {
      state.userRole = state.userRole === 'viewer' ? 'admin' : 'viewer';
    },
    login: (state, action) => {
      state.userRole = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = 'viewer';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    }
  }
});

export const { addTransaction, completeTransaction, toggleRole, login, logout, setSearchQuery, setFilterStatus, addNotification, hideToast, markNotificationsRead } = financeSlice.actions;

export default financeSlice.reducer;
