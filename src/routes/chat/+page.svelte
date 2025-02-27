<script>
    import { supabase } from "$lib/supabase";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    let user = $state(null);
    let loading = $state(true);
    
    onMount(async () => {
        // Check if user is logged in
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
            // Not logged in, redirect to login page
            goto('/login');
            return;
        }
        
        // Set user data
        user = data.session.user;
        loading = false;
    });
    
    async function signOut() {
        await supabase.auth.signOut();
        goto('/login');
    }
</script>

<div class="min-h-screen bg-[#101828] text-white p-4">
    <header class="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 class="text-2xl font-bold">Chat Room</h1>
        
        {#if user}
        <div class="flex items-center gap-4">
            <div class="text-sm">
                <span class="block text-gray-400">Signed in as</span>
                <span class="font-medium">{user.email}</span>
            </div>
            <button 
                onclick={signOut}
                class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded text-sm"
            >
                Sign Out
            </button>
        </div>
        {/if}
    </header>
    
    {#if loading}
        <div class="flex justify-center items-center h-[calc(100vh-100px)]">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
    {:else}
        <div class="max-w-4xl mx-auto">
            <div class="bg-gray-900 rounded-lg p-4 h-[calc(100vh-200px)] flex flex-col">
                <div class="flex-1 overflow-y-auto mb-4 p-2">
                    <!-- Chat messages will go here -->
                    <p class="text-center text-gray-400 my-8">Your messages will appear here</p>
                </div>
                
                <div class="border-t border-gray-800 pt-4">
                    <form class="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Type your message..." 
                            class="flex-1 bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-700"
                        />
                        <button 
                            type="submit"
                            class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    {/if}
</div>