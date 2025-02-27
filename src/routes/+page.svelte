<script>
    import { supabase } from "$lib/supabase";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    let loading = $state(true);

    onMount(async () => {
        const { data } = await supabase.auth.getSession();
        
        // Redirect depending on whether user is logged in or not
        if (data.session) {
            goto('/chat');
        } else {
            goto('/login');
        }
    });
</script>

<div class="flex h-screen w-full items-center justify-center bg-[#101828] text-white">
    <div class="text-center">
        <h1 class="text-2xl font-semibold mb-4">Welcome</h1>
        <div class="flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
        <p class="mt-4 text-gray-400">Redirecting you to the right place...</p>
    </div>
</div>