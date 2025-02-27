import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const messages = writable([]);

export const loadMessages = async () => {
    let { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: true });

    if (error) console.log('Error loading messages:', error);
    else messages.set(data);
};