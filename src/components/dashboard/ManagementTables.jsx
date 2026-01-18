import { useState } from 'react';

/**
 * Leads Management Table
 */
export function LeadsTable({ data, onAdd, onUpdate, onDelete }) {
    const [newLead, setNewLead] = useState({ customer_name: '', phone_number: '', status: 'Interested', notes: '' });

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newLead.customer_name || !newLead.phone_number) return;
        await onAdd(newLead);
        setNewLead({ customer_name: '', phone_number: '', status: 'Interested', notes: '' });
    };

    return (
        <div className="fade-in">
            <form className="form-inline" onSubmit={handleAdd}>
                <div className="form-group">
                    <label>Customer Name</label>
                    <input
                        className="form-control"
                        value={newLead.customer_name}
                        onChange={e => setNewLead({ ...newLead, customer_name: e.target.value })}
                        placeholder="Name"
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        className="form-control"
                        value={newLead.phone_number}
                        onChange={e => setNewLead({ ...newLead, phone_number: e.target.value })}
                        placeholder="Phone"
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={newLead.status}
                        onChange={e => setNewLead({ ...newLead, status: e.target.value })}
                    >
                        <option value="Interested">Interested</option>
                        <option value="Demo Done">Demo Done</option>
                        <option value="SOLD">SOLD</option>
                        <option value="Not Interested">Not Interested</option>
                    </select>
                </div>
                <div className="form-group" style={{ flexGrow: 1 }}>
                    <label>Notes</label>
                    <input
                        className="form-control"
                        value={newLead.notes}
                        onChange={e => setNewLead({ ...newLead, notes: e.target.value })}
                        placeholder="Additional notes"
                    />
                </div>
                <button className="btn btn-primary" type="submit" style={{ marginTop: 'auto' }}>
                    <span>Add Lead</span>
                </button>
            </form>

            <div className="table-container">
                <table className="mgt-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(lead => (
                            <tr key={lead.id}>
                                <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                                <td>{lead.customer_name}</td>
                                <td>{lead.phone_number}</td>
                                <td>
                                    <span className={`badge badge-${lead.status === 'SOLD' ? 'success' :
                                            lead.status === 'Demo Done' ? 'info' :
                                                lead.status === 'Not Interested' ? 'danger' : 'warning'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td>{lead.notes}</td>
                                <td>
                                    <button onClick={() => onDelete(lead.id)} className="btn-theme" style={{ width: '30px', height: '30px', fontSize: '1rem' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/**
 * Finance Ledger Table
 */
export function FinanceTable({ data, onAdd, onDelete }) {
    const [newEntry, setNewEntry] = useState({ description: '', money_in: 0, money_out: 0, proof_url: '', category: 'Revenue' });

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newEntry.description) return;
        await onAdd(newEntry);
        setNewEntry({ description: '', money_in: 0, money_out: 0, proof_url: '', category: 'Revenue' });
    };

    const totalIn = data.reduce((sum, item) => sum + parseFloat(item.money_in || 0), 0);
    const totalOut = data.reduce((sum, item) => sum + parseFloat(item.money_out || 0), 0);
    const balance = totalIn - totalOut;

    return (
        <div className="fade-in">
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Revenue (+)</h3>
                    <div className="value" style={{ color: '#22c55e' }}>{totalIn.toLocaleString()} MMK</div>
                </div>
                <div className="stat-card">
                    <h3>Total Expenses (-)</h3>
                    <div className="value" style={{ color: '#ef4444' }}>{totalOut.toLocaleString()} MMK</div>
                </div>
                <div className="stat-card">
                    <h3>Net Profit</h3>
                    <div className="value" style={{ color: balance >= 0 ? 'var(--accent-primary)' : '#ef4444' }}>
                        {balance.toLocaleString()} MMK
                    </div>
                </div>
            </div>

            <form className="form-inline" onSubmit={handleAdd}>
                <div className="form-group" style={{ flexGrow: 1 }}>
                    <label>Description</label>
                    <input className="form-control" value={newEntry.description} onChange={e => setNewEntry({ ...newEntry, description: e.target.value })} placeholder="e.g. Sold App to Clinic A" />
                </div>
                <div className="form-group">
                    <label>Money IN (+)</label>
                    <input className="form-control" type="number" value={newEntry.money_in} onChange={e => setNewEntry({ ...newEntry, money_in: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Money OUT (-)</label>
                    <input className="form-control" type="number" value={newEntry.money_out} onChange={e => setNewEntry({ ...newEntry, money_out: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Proof Link</label>
                    <input className="form-control" value={newEntry.proof_url} onChange={e => setNewEntry({ ...newEntry, proof_url: e.target.value })} placeholder="Screenshot URL" />
                </div>
                <button className="btn btn-primary" type="submit" style={{ marginTop: 'auto' }}>
                    <span>Add Record</span>
                </button>
            </form>

            <div className="table-container">
                <table className="mgt-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>IN (+)</th>
                            <th>OUT (-)</th>
                            <th>Proof</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{new Date(item.transaction_date).toLocaleDateString()}</td>
                                <td>{item.description}</td>
                                <td style={{ color: '#22c55e', fontWeight: 600 }}>{item.money_in > 0 ? `+${parseFloat(item.money_in).toLocaleString()}` : '-'}</td>
                                <td style={{ color: '#ef4444', fontWeight: 600 }}>{item.money_out > 0 ? `-${parseFloat(item.money_out).toLocaleString()}` : '-'}</td>
                                <td>{item.proof_url ? <a href={item.proof_url} target="_blank" rel="noreferrer">View</a> : 'No Proof'}</td>
                                <td>
                                    <button onClick={() => onDelete(item.id)} className="btn-theme" style={{ width: '30px', height: '30px', fontSize: '1rem' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/**
 * Clients Management Table
 */
export function ClientsTable({ data, onAdd, onUpdate, onDelete }) {
    const [newClient, setNewClient] = useState({ client_name: '', app_version: 'v1.0', device_count: 1, notes: '' });

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newClient.client_name) return;
        await onAdd(newClient);
        setNewClient({ client_name: '', app_version: 'v1.0', device_count: 1, notes: '' });
    };

    return (
        <div className="fade-in">
            <form className="form-inline" onSubmit={handleAdd}>
                <div className="form-group">
                    <label>Client Name</label>
                    <input className="form-control" value={newClient.client_name} onChange={e => setNewClient({ ...newClient, client_name: e.target.value })} placeholder="Clinic Name" />
                </div>
                <div className="form-group">
                    <label>App Version</label>
                    <input className="form-control" value={newClient.app_version} onChange={e => setNewClient({ ...newClient, app_version: e.target.value })} placeholder="v1.1" />
                </div>
                <div className="form-group">
                    <label>Devices</label>
                    <input className="form-control" type="number" value={newClient.device_count} onChange={e => setNewClient({ ...newClient, device_count: e.target.value })} />
                </div>
                <div className="form-group" style={{ flexGrow: 1 }}>
                    <label>Notes</label>
                    <input className="form-control" value={newClient.notes} onChange={e => setNewClient({ ...newClient, notes: e.target.value })} placeholder="Software details" />
                </div>
                <button className="btn btn-primary" type="submit" style={{ marginTop: 'auto' }}>
                    <span>Add Client</span>
                </button>
            </form>

            <div className="table-container">
                <table className="mgt-table">
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Version</th>
                            <th>Last Visit</th>
                            <th>Device Count</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(client => (
                            <tr key={client.id}>
                                <td style={{ fontWeight: 700 }}>{client.client_name}</td>
                                <td><span className="badge badge-info">{client.app_version}</span></td>
                                <td>{new Date(client.last_visit_date).toLocaleDateString()}</td>
                                <td>{client.device_count} PCs</td>
                                <td>{client.notes}</td>
                                <td>
                                    <button onClick={() => onDelete(client.id)} className="btn-theme" style={{ width: '30px', height: '30px', fontSize: '1rem' }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
