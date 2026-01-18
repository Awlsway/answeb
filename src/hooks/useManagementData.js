import { useState, useEffect } from 'react';
import { supabase } from '../supabase-config';

/**
 * Generic hook for management data with audit logging capability
 */
export function useManagementData(tableName) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: records, error: fetchError } = await supabase
                .from(tableName)
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setData(records);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Real-time subscription
        const channel = supabase
            .channel(`${tableName}-changes`)
            .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [tableName]);

    const addRecord = async (newRecord) => {
        try {
            const { data: created, error: addError } = await supabase
                .from(tableName)
                .insert([newRecord])
                .select();

            if (addError) throw addError;

            // Log the action
            await logAction('INSERT', tableName, created[0].id, null, created[0]);

            return created[0];
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const updateRecord = async (id, updatedFields) => {
        try {
            const oldRecord = data.find(r => r.id === id);
            const { data: updated, error: updateError } = await supabase
                .from(tableName)
                .update(updatedFields)
                .eq('id', id)
                .select();

            if (updateError) throw updateError;

            // Log the action
            await logAction('UPDATE', tableName, id, oldRecord, updated[0]);

            return updated[0];
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteRecord = async (id) => {
        try {
            const oldRecord = data.find(r => r.id === id);
            const { error: deleteError } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            // Log the action
            await logAction('DELETE', tableName, id, oldRecord, null);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logAction = async (action, tableName, recordId, oldData, newData) => {
        try {
            await supabase.from('audit_logs').insert([{
                table_name: tableName,
                record_id: recordId,
                action: action,
                old_data: oldData,
                new_data: newData
            }]);
        } catch (err) {
            console.error('Failed to log audit:', err);
        }
    };

    return { data, loading, error, addRecord, updateRecord, deleteRecord, refresh: fetchData };
}
