import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

// Create a writable store for messages
export const messages = writable([]);

// Load messages from Supabase
export async function loadMessages() {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('timestamp', { ascending: true });

        if (error) {
            console.error('Error loading messages:', error);
            return;
        }

        // Update the store with messages
        messages.set(data || []);
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// Send a new message
export async function sendMessage(userId, text, email) {
    try {
        const newMessage = {
            user_id: userId,
            text: text.trim(),
            timestamp: new Date().toISOString(),
            username: email.split('@')[0] // Define username as everything that comes before the @ in a user's email address
        };

        // Insert message into Supabase
        const { data, error } = await supabase
            .from('messages')
            .insert([newMessage])
            .select();

        if (error) {
            console.error('Error sending message:', error);
        } else {
            console.log('Message sent successfully:', data);
            messages.update(currentMessages => [...currentMessages, data[0]]);
        }

    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Subscribe to real-time changes
export function subscribeToMessages() {
    const subscription = supabase
        .channel('public:messages')
        .on('postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages'
            },
            (payload) => {
                messages.update(currentMessages => {
                    return [...currentMessages, payload.new];
                });
            }
        )
        .subscribe();

    // Return unsubscribe function
    return () => {
        supabase.removeChannel(subscription);
    };
}