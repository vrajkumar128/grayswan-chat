<script>
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let error = $state();
    let loading = $state(true);

    onMount(async () => {
        try {
            // Handle the OAuth callback
            const { data: authData, error: authError } =
                await supabase.auth.getSession();

            if (authError) {
                error = authError.message;
                loading = false;
                return;
            }

            // Check if we have a session
            if (authData.session) {
                goto("/chat");
            } else {
                // Try to exchange the auth code for a session
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");

                if (code) {
                    const { error: exchangeError } =
                        await supabase.auth.exchangeCodeForSession(code);
                    if (exchangeError) {
                        error = `Exchange error: ${exchangeError.message}`;
                        loading = false;
                        return;
                    }

                    // After exchanging code, try to get the session again
                    const { data: refreshedData } =
                        await supabase.auth.getSession();
                    if (refreshedData.session) {
                        goto("/chat");
                        return;
                    }
                }

                error = "Authentication failed. Please try again.";
                loading = false;
            }
        } catch (e) {
            error = `Unexpected error: ${e.message}`;
            loading = false;
        }
    });
</script>

<div class="grid h-screen w-full place-items-center bg-[#101828] px-5 py-16">
    <div class="max-w-md w-full text-center">
        {#if loading}
            <h1 class="text-3xl font-semibold mb-4 text-white">
                Authenticating...
            </h1>
            <div class="flex justify-center">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"
                ></div>
            </div>
        {:else if error}
            <h1 class="text-3xl font-semibold mb-4 text-white">
                Authentication Error
            </h1>
            <p class="text-red-400 mb-6">{error}</p>
            <a
                href="/login"
                class="inline-block bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
            >
                Back to Login
            </a>
        {/if}
    </div>
</div>
