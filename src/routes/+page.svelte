<!-- src/routes/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        goto('/login');
    });
</script>

<div class="h-screen w-full flex items-center justify-center bg-[#101828] text-white">
    Redirecting...
</div>