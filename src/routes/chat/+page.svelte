<script>
    import { supabase } from "$lib/supabase";
    import { goto } from '$app/navigation';
    import { onMount, onDestroy } from 'svelte';
    import { messages, loadMessages, sendMessage, subscribeToMessages } from '$lib/stores.js';
    
    let user = $state(null);
    let loading = $state(true);
    let newMessage = $state('');
    let messagesContainer;
    
    // Clean up function for subscription
    let unsubscribe;
    
    onMount(async () => {
        // Check if user is logged in
        const { data } = await supabase.auth.getSession();
        
        // Not logged in, redirect to login page
        if (!data.session) {
            goto('/login');
            return;
        }
        
        // Set user data
        user = data.session.user;
        
        // Load initial messages
        await loadMessages();
        
        // Subscribe to real-time updates
        unsubscribe = subscribeToMessages();
        
        loading = false;
        
        // Scroll to bottom of messages on initial load
        scrollToBottom();
    });
    
    // Clean up subscription when component is destroyed
    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
    
    // Function to send a message
    async function handleSendMessage(e) {
        e.preventDefault();
        
        if (!newMessage.trim() || !user) return;
        
        // Send message
        await sendMessage(user.id, newMessage, user.email);
        
        // Clear input field
        newMessage = '';
        
        // Scroll to bottom to show the new message
        scrollToBottom();
    }
    
    // Helper function to scroll to the bottom of messages
    function scrollToBottom() {
        setTimeout(() => {
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }, 100);
    }
    
    // Helper to format timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Listen for Enter key to send message
    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage(e);
        }
    }
    
    // Watch for changes to messages length to auto-scroll
    $effect(() => {
        if ($messages?.length) {
            scrollToBottom();
        }
    });
</script>

<div class="min-h-screen bg-[#101828] text-white p-4">    
    {#if loading}
        <div class="flex justify-center items-center h-[calc(100vh-100px)]">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
    {:else}
        <div class="max-w-4xl mx-auto mt-8 pt-8">
            <div class="bg-gray-900 rounded-lg p-4 h-[calc(100vh-200px)] flex flex-col">
                <div 
                    bind:this={messagesContainer}
                    class="flex-1 overflow-y-auto mb-4 p-2 space-y-4"
                >
                    {#if $messages.length === 0}
                        <p class="text-center text-gray-400 my-8">No messages yet. Start the conversation!</p>
                    {:else}
                        {#each $messages as message (message.id)}
                            <div class={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                                <div class={`max-w-[80%] rounded-lg p-3 ${
                                    message.user_id === user?.id // Check if a message belongs to the current user
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-800 text-gray-100'
                                }`}>
                                    <p class="text-xs font-bold mb-1">
                                        {message.username}
                                    </p>
                                    <p class="break-words">{message.text}</p>
                                    <p class="text-xs opacity-70 mt-1 text-right">{formatTimestamp(message.timestamp)}</p>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
                
                <div class="border-t border-gray-800 pt-4">
                    <form class="flex gap-2" onsubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            placeholder="Type your message..." 
                            bind:value={newMessage}
                            onkeydown={handleKeyDown}
                            class="flex-1 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                        />
                        <button 
                            type="submit"
                            class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!newMessage.trim()}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    {/if}
</div>