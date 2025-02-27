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
            username: email ? email.split('@')[0] : 'anonymous' // Define username as everything that comes before the @ in a user's email address
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
    console.log('Setting up real-time subscription...');

    const channel = supabase
        .channel('public:messages')
        .on('postgres_changes',
            {
                event: '*', // Listen for all events (INSERT, UPDATE, DELETE)
                schema: 'public',
                table: 'messages'
            },
            (payload) => {
                console.log('Real-time message received:', payload);

                // Reload all messages to ensure consistency
                if (payload.eventType === 'INSERT') {
                    messages.update(currentMessages => {
                        // Check if message already exists to avoid duplicates
                        const messageExists = currentMessages.some(msg => msg.id === payload.new.id);

                        if (!messageExists) {
                            return [...currentMessages, payload.new];
                        }

                        return currentMessages;
                    });
                } else {
                    // For other event types or to ensure full sync, reload all messages
                    loadMessages();
                }
            }
        )
        .subscribe((status) => {
            console.log('Subscription status:', status);
            if (status !== 'SUBSCRIBED') {
                console.warn('Subscription status is not SUBSCRIBED:', status);
            }
        });

    return () => {
        console.log('Unsubscribing from real-time updates');
        supabase.removeChannel(channel);
    };
}