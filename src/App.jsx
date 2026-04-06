import React, { useState } from 'react';
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

const allTransactions = [
  { id: 1, name: 'Apple Store', date: 'Oct 24, 2023', amount: '₹1,499', status: 'Completed', type: 'debit', category: 'Technology', icon: '📱' },
  { id: 2, name: 'Stripe Payout', date: 'Oct 23, 2023', amount: '₹12,500', status: 'Completed', type: 'credit', category: 'Income', icon: '💰' },
  { id: 3, name: 'Uber Technologies', date: 'Oct 22, 2023', amount: '₹450', status: 'Pending', type: 'debit', category: 'Transport', icon: '🚗' },
  { id: 4, name: 'Rent Payment', date: 'Oct 01, 2023', amount: '₹25,000', status: 'Completed', type: 'debit', category: 'Housing', icon: '🏠' },
  { id: 5, name: 'Google Cloud', date: 'Sep 28, 2023', amount: '₹8,200', status: 'Completed', type: 'debit', category: 'Work', icon: '☁️' },
  { id: 6, name: 'Amazon Shopping', date: 'Sep 25, 2023', amount: '₹3,400', status: 'Completed', type: 'debit', category: 'Shopping', icon: '📦' },
  { id: 7, name: 'Starbucks Coffee', date: 'Sep 24, 2023', amount: '₹350', status: 'Failed', type: 'debit', category: 'Food', icon: '☕' },
  { id: 8, name: 'Freelance Design', date: 'Sep 20, 2023', amount: '₹18,000', status: 'Completed', type: 'credit', category: 'Income', icon: '🎨' },
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

const DashboardView = ({ onAction }) => (
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

    <section className="quick-actions fade-in fade-in-delay-3">
      {['send', 'add', 'cards', 'plan'].map(type => (
        <button key={type} className="action-btn" onClick={() => onAction(type)}>
          <div className="action-icon">
            {type === 'send' && <Send size={24} />}
            {type === 'add' && <Plus size={24} />}
            {type === 'cards' && <CreditCard size={24} />}
            {type === 'plan' && <PieChart size={24} />}
          </div>
          <span className="action-label">{type}</span>
        </button>
      ))}
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

const TransactionsView = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="page-content">
    <div className="section-header">
      <div>
        <h3 className="section-title">Ledger of Operations</h3>
        <p className="section-subtitle">A granular record of your economic movement</p>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="topbar-btn"><Download size={18} /></button>
        <button className="topbar-btn"><Filter size={18} /></button>
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
        {allTransactions.map((txn) => (
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
              {txn.type === 'credit' ? `+${txn.amount}` : `-${txn.amount}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

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

// --- Main Application ---

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [modalType, setModalType] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const closeModal = () => {
    setModalType(null);
    setSelectedContact(null);
  };

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
          <div className="user-card">
            <div className="user-avatar">JD</div>
            <div className="user-info">
              <div className="user-name">Jane Doe</div>
              <div className="user-role">Premium Member</div>
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
            <div className="topbar-btn"><Search size={20} /></div>
            <div className="topbar-btn">
              <Bell size={20} /><span className="notif-dot"></span>
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeTab === 'Dashboard' && <DashboardView onAction={(type) => setModalType(type)} />}
          {activeTab === 'Transactions' && <TransactionsView />}
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
                  <>
                    <div className="input-container">
                      <label className="input-label">Transaction Name</label>
                      <div style={{ position: 'relative' }}>
                        <Tag size={16} style={{ position: 'absolute', left: 12, top: 16, color: '#464555' }} />
                        <input type="text" className="premium-input" style={{ paddingLeft: 40 }} placeholder="e.g. Grocery Shop" />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="input-container">
                        <label className="input-label">Amount</label>
                        <input type="text" className="premium-input" placeholder="₹0.00" />
                      </div>
                      <div className="input-container">
                        <label className="input-label">Date</label>
                        <div style={{ position: 'relative' }}>
                          <Calendar size={16} style={{ position: 'absolute', left: 12, top: 16, color: '#464555' }} />
                          <input type="text" className="premium-input" style={{ paddingLeft: 40 }} placeholder="DD/MM/YYYY" defaultValue="06/04/2026" />
                        </div>
                      </div>
                    </div>
                  </>
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

              <div className="modal-footer">
                <button className="btn-ghost" onClick={closeModal}>Cancel</button>
                <button className="btn-primary" onClick={closeModal}>
                  {modalType === 'send' && 'Send Money'}{modalType === 'add' && 'Save Transaction'}{modalType === 'cards' && 'Card Settings'}{modalType === 'plan' && 'Adjust Goals'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
