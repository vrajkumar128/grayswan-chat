<script>
    import { supabase } from "$lib/supabase";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    let user = $state(null);
    let loading = $state(true);
    
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
        loading = false;

        console.log(data.session.user);
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
                <div class="flex-1 overflow-y-auto mb-4 p-2">
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