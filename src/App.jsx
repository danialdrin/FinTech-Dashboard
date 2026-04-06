import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, completeTransaction, toggleRole as toggleRoleAction, login, logout, setSearchQuery as setSearchQueryAction, setFilterStatus as setFilterStatusAction, addNotification, hideToast, markNotificationsRead } from './store/financeSlice';
import {
  LayoutDashboard,
  Receipt,
  LineChart,
  Settings,
  CircleHelp,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  CreditCard,
  Send,
  PieChart,
  Wallet,
  X,
  Calendar,
  Tag,
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets & Dummy Data ---

const dashboardChartData = [
  { name: 'Q1', value: 45000 },
  { name: 'Q2', value: 52000 },
  { name: 'Q3', value: 48000 },
  { name: 'Q4', value: 61400 },
  { name: 'Current', value: 125000 },
];

const spendingData = [
  { name: 'Food', value: 40, color: '#3525cd', amount: '₹50,000' },
  { name: 'Housing', value: 25, color: '#712ae2', amount: '₹31,250' },
  { name: 'Travel', value: 20, color: '#4f46e5', amount: '₹25,000' },
  { name: 'Misc', value: 15, color: '#8a4cfc', amount: '₹18,750' },
];

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

const insightsData = [
  { month: 'May', income: 42000, expense: 31000 },
  { month: 'Jun', income: 48000, expense: 35000 },
  { month: 'Jul', income: 45000, expense: 34000 },
  { month: 'Aug', income: 52000, expense: 38000 },
  { month: 'Sep', income: 50000, expense: 39500 },
  { month: 'Oct', income: 55000, expense: 32000 },
];

const contacts = [
  { id: 1, name: 'Alex', initial: 'A' },
  { id: 2, name: 'Sarah', initial: 'S' },
  { id: 3, name: 'Mike', initial: 'M' },
  { id: 4, name: 'Emma', initial: 'E' },
  { id: 5, name: 'Chris', initial: 'C' },
];

const goals = [
  { name: 'New Car Fund', current: 450000, target: 800000, percent: 56 },
  { name: 'Emergency Savings', current: 120000, target: 150000, percent: 80 },
  { name: 'Holiday 2024', current: 15000, target: 100000, percent: 15 },
];

// --- Sub-components (Views) ---

const DashboardView = ({ onAction, userRole }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-content">
    <section className="stats-grid">
      <div className="stat-card fade-in">
        <div className="stat-label"><Wallet size={16} color="#3525cd" />Global Portfolio</div>
        <div className="stat-value">₹1,25,000</div>
        <div className="stat-change up"><ArrowUpRight size={14} />+12.5%</div>
      </div>
      <div className="stat-card fade-in fade-in-delay-1">
        <div className="stat-label"><Plus size={16} color="#005522" />Monthly Income</div>
        <div className="stat-value income">₹55,000</div>
        <div className="stat-change up"><ArrowUpRight size={14} />+8.2%</div>
      </div>
      <div className="stat-card fade-in fade-in-delay-2">
        <div className="stat-label"><ArrowDownRight size={16} color="#ba1a1a" />Ongoing Liabilities</div>
        <div className="stat-value expense">₹32,000</div>
        <div className="stat-change down">-₹5,000</div>
      </div>
    </section>

    <section className="quick-actions fade-in fade-in-delay-3" style={{ gridTemplateColumns: userRole === 'admin' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)' }}>
      {['send', 'cards', 'plan'].map(type => (
        <button key={type} className="action-btn" onClick={() => onAction(type)}>
          <div className="action-icon">
            {type === 'send' && <Send size={24} />}
            {type === 'cards' && <CreditCard size={24} />}
            {type === 'plan' && <PieChart size={24} />}
          </div>
          <span className="action-label">{type}</span>
        </button>
      ))}
      {userRole === 'admin' && (
        <button className="action-btn" onClick={() => onAction('add')}>
          <div className="action-icon">
            <Plus size={24} />
          </div>
          <span className="action-label">Add (Admin)</span>
        </button>
      )}
    </section>

    <div className="content-grid">
      <div className="card fade-in fade-in-delay-4">
        <div className="chart-header">
          <div><h3 className="chart-title">Balance Trend</h3><p className="chart-subtitle">Quarterly fiscal growth</p></div>
          <div className="period-tabs">
            {['1W', '1M', '1Y', 'ALL'].map(t => <button key={t} className={`period-tab ${t === '1Y' ? 'active' : ''}`}>{t}</button>)}
          </div>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={dashboardChartData}>
              <defs><linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3525cd" stopOpacity={0.3} /><stop offset="95%" stopColor="#3525cd" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="#eceef0" strokeDasharray="3 3" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#464555', fontSize: 12 }} dy={10} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="value" stroke="#3525cd" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card fade-in fade-in-delay-4">
        <h3 className="chart-title">Breakdown</h3>
        <p className="chart-subtitle">October analysis</p>
        <div style={{ width: '100%', height: 180 }}>
          <ResponsiveContainer>
            <RePieChart>
              <Pie data={spendingData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                {spendingData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
            </RePieChart>
          </ResponsiveContainer>
        </div>
        <div className="breakdown-list">
          {spendingData.map((item, idx) => (
            <div key={idx} className="breakdown-item">
              <div className="breakdown-dot" style={{ backgroundColor: item.color }}></div>
              <div className="breakdown-name">{item.name}</div>
              <div className="breakdown-amt">{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const TransactionsView = ({ transactions, searchQuery, setSearchQuery, filterStatus, setFilterStatus }) => {
  // Filtering and Sorting
  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' ? true : txn.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="page-content">
      <div className="section-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className="section-title">Transactions</h3>
            <p className="section-subtitle">A detailed history of your payments</p>
          </div>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Export
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-container-low)', padding: '0.75rem', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Completed', 'Pending', 'Failed'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`filter-pill ${filterStatus === status ? 'active' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
            <input 
              type="text" 
              placeholder="Search merchants or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="transaction-list">
          {/* Header Row */}
          <div className="txn-item" style={{
            background: 'var(--surface-container-low)',
            padding: '1rem var(--spacing-6)',
            cursor: 'default',
            borderRadius: 0,
            borderBottom: '1px solid var(--surface-container-high)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ width: 42 }}></div>
            <div style={{ flex: 1, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--outline)', marginLeft: '1rem' }}>Merchant/Transfer</div>
            <div style={{ width: 140, textAlign: 'center', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--outline)' }}>Category</div>
            <div style={{ width: 120, textAlign: 'center', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--outline)' }}>Status</div>
            <div style={{ width: 100, textAlign: 'right', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--outline)' }}>Amount</div>
          </div>

          {/* Data Rows */}
          {filteredTransactions.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
              No transactions found.
            </div>
          ) : (
            filteredTransactions.map((txn) => (
              <div key={txn.id} className="txn-item" style={{
                padding: '1.25rem var(--spacing-6)',
                borderBottom: '1px solid var(--surface-container)',
                borderRadius: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center'
              }}>
                <div className="txn-icon" style={{
                  backgroundColor: txn.type === 'credit' ? '#7ffc97' : '#e2dfff'
                }}>
                  {txn.icon}
                </div>
                <div style={{ flex: 1, marginLeft: '1rem', minWidth: 0 }}>
                  <div className="txn-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{txn.name}</div>
                  <div className="txn-date">{txn.date}</div>
                </div>
                <div style={{ width: 140, display: 'flex', justifyContent: 'center' }}>
                  <span className="category-pill">{txn.category}</span>
                </div>
                <div style={{ width: 120, display: 'flex', justifyContent: 'center' }}>
                  <span className={`status-pill ${txn.status.toLowerCase()}`}>
                    {txn.status}
                  </span>
                </div>
                <div className={`txn-amount ${txn.type}`} style={{ width: 100, textAlign: 'right' }}>
                  {txn.type === 'credit' ? `+₹${txn.amount}` : `-₹${txn.amount}`}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

const InsightsView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-content">
    <div className="section-header">
      <div>
        <h3 className="section-title">Fiscal Analytics</h3>
        <p className="section-subtitle">Predictive trends and categorical breakdown</p>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">Savings Rate</div>
        <div className="stat-value" style={{ color: 'var(--primary)' }}>38.5%</div>
        <p className="chart-subtitle">Above market average</p>
      </div>
      <div className="stat-card">
        <div className="stat-label">Asset Liquidity</div>
        <div className="stat-value" style={{ color: 'var(--tertiary)' }}>₹85K</div>
        <p className="chart-subtitle">High immediate availability</p>
      </div>
      <div className="stat-card">
        <div className="stat-label">Projected EOY Portfolio</div>
        <div className="stat-value">₹1.8M</div>
        <p className="chart-subtitle">Based on current trajectory</p>
      </div>
    </div>

    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 className="chart-title">Monthly Cashflow Pulse</h3>
      <p className="chart-subtitle">Comparison of operational income versus overheads</p>
      <div style={{ width: '100%', height: 350, marginTop: '2rem' }}>
        <ResponsiveContainer>
          <BarChart data={insightsData}>
            <CartesianGrid vertical={false} stroke="#eceef0" strokeDasharray="3 3" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#464555' }} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-card)' }} />
            <Legend iconType="circle" />
            <Bar dataKey="income" name="Operational Income" fill="#3525cd" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="expense" name="Expenditure" fill="#712ae2" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="insight-card">
      <div className="insight-label">Wealth Forecast</div>
      <div className="insight-value">₹2.4M Goal</div>
      <p className="insight-desc">
        At your current velocity, you are on track to exceed your annual preservation goal by **12.4%**.
        Consider shifting **₹15,000/mo** into higher-yield index portfolios.
      </p>
    </div>
  </motion.div>
);

const LoginView = ({ onLogin }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--background)' }}>
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ width: '100%', maxWidth: 400, textAlign: 'center', padding: 'var(--spacing-10)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.03em' }}>Financial Atelier</h1>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Please select your role</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={() => onLogin('admin')}>
          Login as Admin
        </button>
        <button className="btn-ghost" style={{ width: '100%', padding: '1rem', border: '1px solid var(--outline-variant)' }} onClick={() => onLogin('viewer')}>
          Login as Viewer
        </button>
      </div>
    </motion.div>
  </div>
);

// --- Main Application ---

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [modalType, setModalType] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  
  // Application State - Managed by Redux
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const isAuthenticated = useSelector(state => state.finance.isAuthenticated);
  const transactions = useSelector(state => state.finance.transactions);
  const userRole = useSelector(state => state.finance.userRole);
  const searchQuery = useSelector(state => state.finance.searchQuery);
  const filterStatus = useSelector(state => state.finance.filterStatus);
  const activeToast = useSelector(state => state.finance.activeToast);
  const notifications = useSelector(state => state.finance.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifRef]);

  useEffect(() => {
    if (activeToast) {
      // Manage the lifespan of the active visual popup toast
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [activeToast, dispatch]);

  const handleAction = (type) => {
    if (type === 'add' && userRole !== 'admin') {
      alert('Access Denied: Only Admin can add transactions.');
      return;
    }
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedContact(null);
  };

  const toggleRole = () => {
    dispatch(toggleRoleAction());
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={(role) => dispatch(login(role))} />;
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>Financial Atelier</h1>
          <p>Premium Wealth Management</p>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main Menu</div>
          <button className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}>
            <LayoutDashboard className="icon" /> Dashboard
          </button>
          <button className={`nav-item ${activeTab === 'Transactions' ? 'active' : ''}`} onClick={() => setActiveTab('Transactions')}>
            <Receipt className="icon" /> Transactions
          </button>
          <button className={`nav-item ${activeTab === 'Insights' ? 'active' : ''}`} onClick={() => setActiveTab('Insights')}>
            <LineChart className="icon" /> Insights
          </button>

          <div className="sidebar-section-label">Account</div>
          <button className="nav-item"><Settings className="icon" /> Settings</button>
          <button className="nav-item"><CircleHelp className="icon" /> Support</button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-card" onClick={() => dispatch(logout())} title="Click to logout">
            <div className="user-avatar" style={{ background: userRole === 'admin' ? 'linear-gradient(135deg, #ba1a1a, #ffdad6)' : undefined, color: userRole === 'admin' ? '#fff' : undefined }}>JD</div>
            <div className="user-info">
              <div className="user-name">Jane Doe ({userRole})</div>
              <div className="user-role" style={{ color: 'var(--error)', fontWeight: 600 }}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Render */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h2 className="topbar-title">{activeTab}</h2>
            <p className="topbar-subtitle">Real-time status for your portfolio</p>
          </div>
          <div className="topbar-actions">
            <div className="topbar-btn" ref={notifRef} style={{ position: 'relative' }} onClick={() => {
              if (!showNotifications && unreadCount > 0) dispatch(markNotificationsRead());
              setShowNotifications(!showNotifications);
            }}>
              <Bell size={20} className={activeToast ? 'icon-shake' : ''} />
              {unreadCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--error)', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unreadCount}</span>}
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: 'absolute', top: '120%', right: 0, width: 320, background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--outline-variant)', overflow: 'hidden', zIndex: 50, textAlign: 'left', cursor: 'default' }}
                  >
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--outline-variant)', fontWeight: 600, color: 'var(--on-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Recent Notifications</span>
                      <button onClick={() => setShowNotifications(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--outline)' }}>
                        <X size={16} />
                      </button>
                    </div>
                    <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                      {notifications.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>No notifications yet.</div>
                      ) : (
                        notifications.map((notif, idx) => (
                          <div key={idx} style={{ padding: '1rem', borderBottom: '1px solid var(--outline-variant)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--tertiary-fixed)', color: 'var(--on-tertiary-fixed-variant)', padding: 6, borderRadius: 'var(--radius-full)' }}><Receipt size={16} /></div>
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--on-surface)', fontSize: '0.875rem' }}>{notif.title}</div>
                              <div style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', marginTop: 2 }}>{notif.message}</div>
                              <div style={{ color: 'var(--outline)', fontSize: '0.65rem', marginTop: 4 }}>{notif.time}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {activeToast && !showNotifications && (
                  <motion.div 
                    key={activeToast.id}
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    onClick={(e) => { e.stopPropagation(); setShowNotifications(true); }}
                    style={{ position: 'absolute', top: '130%', right: 0, width: 340, background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-hover)', borderLeft: '4px solid var(--tertiary)', overflow: 'hidden', zIndex: 100, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem' }}
                  >
                    <div style={{ background: 'var(--tertiary-fixed)', color: 'var(--on-tertiary-fixed-variant)', padding: 8, borderRadius: 'var(--radius-full)' }}>
                      <Receipt size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--on-surface)', fontSize: '0.875rem' }}>{activeToast.title}</div>
                      <div style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem' }}>{activeToast.message}</div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); dispatch(hideToast()); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--outline)' }}>
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeTab === 'Dashboard' && <DashboardView onAction={handleAction} userRole={userRole} />}
          {activeTab === 'Transactions' && (
            <TransactionsView 
              transactions={transactions}
              searchQuery={searchQuery}
              setSearchQuery={(q) => dispatch(setSearchQueryAction(q))}
              filterStatus={filterStatus}
              setFilterStatus={(s) => dispatch(setFilterStatusAction(s))}
            />
          )}
          {activeTab === 'Insights' && <InsightsView />}
        </div>
      </main>

      {/* Modals Overlay */}
      <AnimatePresence>
        {modalType && (
          <div className="modal-backdrop" onClick={closeModal}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="chart-title">
                  {modalType === 'send' && 'Quick Transfer'}
                  {modalType === 'add' && 'Add Transaction'}
                  {modalType === 'cards' && 'My Cards'}
                  {modalType === 'plan' && 'Financial Goals'}
                </h3>
                <button className="topbar-btn" onClick={closeModal}><X size={20} /></button>
              </div>

              <div className="modal-body">
                {modalType === 'send' && (
                  <>
                    <label className="input-label">Select Contact</label>
                    <div className="contact-list">
                      {contacts.map((contact) => (
                        <div key={contact.id} className={`contact-item ${selectedContact === contact.id ? 'selected' : ''}`} onClick={() => setSelectedContact(contact.id)}>
                          <div className="contact-avatar">{contact.initial}</div>
                          <span className="user-role">{contact.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="input-container">
                      <label className="input-label">Amount</label>
                      <input type="text" className="premium-input" placeholder="₹0.00" defaultValue="₹5,000" />
                    </div>
                  </>
                )}

                {modalType === 'add' && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const parsedAmount = formData.get('amount').replace(/[^0-9.-]+/g,"");
                    const generatedId = Date.now();
                    const newTxn = {
                      id: generatedId,
                      name: formData.get('name'),
                      amount: parsedAmount,
                      date: formData.get('date'),
                      category: formData.get('category'),
                    };
                    
                    // Initially dispatch as pending
                    dispatch(addTransaction(newTxn));
                    closeModal();

                    // Simulate delay and then complete it
                    setTimeout(() => {
                      dispatch(completeTransaction(generatedId));
                      dispatch(addNotification({
                        title: 'Transaction Processed',
                        message: `Payment of ₹${parsedAmount} for ${newTxn.name} has been completed.`
                      }));
                    }, 3500);
                  }}>
                    <div className="input-container">
                      <label className="input-label">Transaction Name</label>
                      <div style={{ position: 'relative' }}>
                        <Tag size={16} style={{ position: 'absolute', left: 12, top: 16, color: '#464555' }} />
                        <input name="name" required type="text" className="premium-input" style={{ paddingLeft: 40 }} placeholder="e.g. Grocery Shop" />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-container">
                        <label className="input-label">Amount (₹)</label>
                        <input name="amount" required type="text" className="premium-input" placeholder="0.00" />
                      </div>
                      <div className="input-container">
                        <label className="input-label">Date</label>
                        <div style={{ position: 'relative' }}>
                          <Calendar size={16} style={{ position: 'absolute', left: 12, top: 16, color: '#464555' }} />
                          <input name="date" required type="text" className="premium-input" style={{ paddingLeft: 40 }} placeholder="DD/MM/YYYY" defaultValue={new Date().toLocaleDateString('en-GB')} />
                        </div>
                      </div>
                    </div>
                    <div className="input-container">
                      <label className="input-label">Category</label>
                      <input name="category" list="category-options" required type="text" className="premium-input" placeholder="Select or type category..." />
                      <datalist id="category-options">
                        <option value="Food & Dining" />
                        <option value="Housing" />
                        <option value="Transportation" />
                        <option value="Technology" />
                        <option value="Shopping" />
                        <option value="Entertainment" />
                        <option value="Miscellaneous" />
                      </datalist>
                    </div>
                    <div className="modal-footer" style={{ marginTop: '2rem', margin: '0 -1.5rem -1.5rem', padding: '1.5rem' }}>
                      <button type="button" className="btn-ghost" onClick={closeModal}>Cancel</button>
                      <button type="submit" className="btn-primary">Save Transaction</button>
                    </div>
                  </form>
                )}

                {modalType === 'cards' && (
                  <>
                    <div className="card-preview">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="user-name" style={{ color: '#fff', fontSize: '1.2rem' }}>Financial Atelier</div>
                        <CreditCard size={24} />
                      </div>
                      <div className="card-number">**** **** **** 8842</div>
                      <div className="card-footer">
                        <div>
                          <div className="user-role" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem' }}>CARD HOLDER</div>
                          <div className="user-name" style={{ color: '#fff' }}>Jane Doe</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="user-role" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem' }}>EXPIRES</div>
                          <div className="user-name" style={{ color: '#fff' }}>12/28</div>
                        </div>
                      </div>
                    </div>
                    <div className="breakdown-item" style={{ background: 'var(--surface-container-low)' }}>
                      <CreditCard size={20} color="var(--primary)" />
                      <div className="breakdown-name">Atelier Platinum Visa</div>
                      <div className="breakdown-amt">Active</div>
                      <ChevronRight size={16} color="var(--outline)" />
                    </div>
                  </>
                )}

                {modalType === 'plan' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {goals.map((goal, idx) => (
                      <div key={idx} className="goal-item">
                        <div className="goal-header"><span className="goal-name">{goal.name}</span><span className="goal-percent">{goal.percent}%</span></div>
                        <div className="progress-track"><motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${goal.percent}%` }} transition={{ duration: 0.8, ease: "easeOut" }} /></div>
                        <div className="goal-header" style={{ marginTop: 8 }}><span className="user-role">Current: ₹{goal.current.toLocaleString()}</span><span className="user-role">Target: ₹{goal.target.toLocaleString()}</span></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {modalType !== 'add' && (
                <div className="modal-footer">
                  <button className="btn-ghost" onClick={closeModal}>Cancel</button>
                  <button className="btn-primary" onClick={closeModal}>
                    {modalType === 'send' && 'Send Money'}
                    {modalType === 'cards' && 'Card Settings'}
                    {modalType === 'plan' && 'Adjust Goals'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
