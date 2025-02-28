<script>
    import { page } from '$app/state';
</script>

<svelte:head>
  <title>404 - Gray Swan Chat</title>
</svelte:head>

{#if page.status === 404}
<div class="grid h-screen w-full place-items-center bg-[#101828] px-5 py-16 text-white">
    <div class="max-w-md w-full text-center">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <h2 class="text-2xl font-semibold mb-6">Page Not Found</h2>
        
        <p class="text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
        </p>
        
        <a 
            href="/"
            class="inline-block bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-colors font-medium"
        >
            Return to Home
        </a>
    </div>
</div>
{:else}
<div class="grid h-screen w-full place-items-center bg-[#101828] px-5 py-16 text-white">
    <div class="max-w-md w-full text-center">
        <h1 class="text-4xl font-bold mb-4">Error {page.status}</h1>
        <p class="text-gray-400 mb-8">{page.error?.message || 'An unexpected error occurred'}</p>
        
        <a 
            href="/"
            class="inline-block bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-colors font-medium"
        >
            Return to Home
        </a>
    </div>
</div>
{/if}