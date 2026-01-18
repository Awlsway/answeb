import { useState } from 'react';
import { useManagementData } from '../../hooks/useManagementData';
import { LeadsTable, FinanceTable, ClientsTable } from './ManagementTables';

export default function Dashboard({ onExit }) {
    const [activeTab, setActiveTab] = useState('leads');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Use custom hooks for each table
    const leads = useManagementData('leads');
    const finance = useManagementData('finance_ledger');
    const clients = useManagementData('clients');
    const logs = useManagementData('audit_logs');

    const handleLogin = (e) => {
        e.preventDefault();
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'ans123';
        if (password === adminPassword) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Incorrect password. Please try again.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="login-overlay">
                <div className="login-card">
                    <h2>A&S Management</h2>
                    <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
                        Please enter your password to access the internal dashboard.
                    </p>
                    <form onSubmit={handleLogin}>
                        <div className="form-group" style={{ marginBottom: 'var(--spacing-md)' }}>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {loginError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: 'var(--spacing-md)' }}>{loginError}</p>}
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                <span>Login</span>
                            </button>
                            <button type="button" className="btn ghost" onClick={onExit} style={{ flex: 1 }}>
                                Back Home
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="container">
                <header className="dashboard-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Management Dashboard</h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Track your leads, finances, and active clients in real-time.</p>
                        </div>
                        <button className="btn ghost" onClick={onExit}>
                            Exit Dashboard
                        </button>
                    </div>
                </header>

                <nav className="dashboard-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leads')}
                    >
                        📋 Sales Leads
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'finance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('finance')}
                    >
                        💰 Finance Ledger
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`}
                        onClick={() => setActiveTab('clients')}
                    >
                        🤝 Client Success
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('logs')}
                    >
                        📜 Change Logs
                    </button>
                </nav>

                <main>
                    {activeTab === 'leads' && (
                        <LeadsTable
                            data={leads.data}
                            onAdd={leads.addRecord}
                            onUpdate={leads.updateRecord}
                            onDelete={leads.deleteRecord}
                        />
                    )}

                    {activeTab === 'finance' && (
                        <FinanceTable
                            data={finance.data}
                            onAdd={finance.addRecord}
                            onDelete={finance.deleteRecord}
                        />
                    )}

                    {activeTab === 'clients' && (
                        <ClientsTable
                            data={clients.data}
                            onAdd={clients.addRecord}
                            onUpdate={clients.updateRecord}
                            onDelete={clients.deleteRecord}
                        />
                    )}

                    {activeTab === 'logs' && (
                        <div className="fade-in">
                            <div className="table-container">
                                <table className="mgt-table">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Action</th>
                                            <th>Table</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.data.map(log => (
                                            <tr key={log.id}>
                                                <td>{new Date(log.created_at).toLocaleString()}</td>
                                                <td>
                                                    <span className={`badge badge-${log.action === 'INSERT' ? 'success' :
                                                        log.action === 'UPDATE' ? 'info' : 'danger'
                                                        }`}>
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td>{log.table_name}</td>
                                                <td style={{ fontSize: '0.8rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {JSON.stringify(log.new_data || log.old_data)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
