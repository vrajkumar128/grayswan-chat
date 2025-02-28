<script>
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let email = $state("");
    let user = $state(null);
    let loading = $state(true);

    // Check if user is already logged in on component mount
    onMount(async () => {
        const { data } = await supabase.auth.getSession();

        if (data.session) {
            goto("/chat");
            return;
        }

        // Set user data
        user = data.session.user;
        loading = false;
    });

    async function loginWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) console.error(error.message);
    }

    async function loginWithDiscord() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                scopes: "identify email",
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) console.error(error.message);
    }

        async function loginWithGitHub() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) console.error(error.message);
    }

    // Update email variable above
    function updateEmail(e) {
        email = e.target.value;
    }

    async function loginWithEmail() {
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error(error.message);
        } else {
            alert("Check your email for a login link!");
        }
    }
</script>

<svelte:head>
  <title>Login - Gray Swan Chat</title>
</svelte:head>

<div class="grid h-[100vh] w-full place-items-center bg-[#101828] px-5 py-16">
    <div class="max-w-md w-full">
        <h1 class="text-3xl font-semibold mb-4 text-white font-onest">Welcome back</h1>
        <p class="text-gray-400 mb-6 font-onest">
            Sign in with an existing provider, or we'll send you a link to your
            email.
        </p>

        <button
            onclick={loginWithGoogle}
            class="flex items-center justify-center w-full py-3 px-4 mb-3 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
        >
            <span class="w-5 h-5 mr-3 flex items-center justify-center"><img src="https://supabase.com/dashboard/img/icons/google-icon.svg" alt="Google logo" width="20" height="20" /></span>
            Continue with Google
        </button>

        <button
            onclick={loginWithDiscord}
            class="flex items-center justify-center w-full py-3 px-4 mb-3 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
        >
            <span class="w-5 h-5 mr-3 flex items-center justify-center"><img src="https://supabase.com/dashboard/img/icons/discord-icon.svg" alt="Discord logo" width="20" height="20" /></span>
            Continue with Discord
        </button>

        <button
            onclick={loginWithGitHub}
            class="flex items-center justify-center w-full py-3 px-4 mb-3 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
        >
            <span class="w-5 h-5 mr-3 flex items-center justify-center"><img src="https://supabase.com/dashboard/img/icons/github-icon.svg" alt="GitHub logo" width="20" height="20" /></span>
            Continue with GitHub
        </button>

        <div class="flex items-center my-6">
            <div class="flex-1 h-px bg-gray-800"></div>
            <span class="px-4 text-sm text-gray-400">or</span>
            <div class="flex-1 h-px bg-gray-800"></div>
        </div>

        <div class="mb-3">
            <input
                type="email"
                placeholder="example@email.com"
                value={email}
                oninput={updateEmail}
                class="w-full py-3.5 px-4 rounded bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
        </div>

        <button
            onclick={loginWithEmail}
            class="w-full py-3.5 px-4 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
        >
            Continue with email
        </button>

        <div class="mt-6 text-xs text-gray-400 leading-relaxed font-onest">
            <p>
                By continuing, you agree to our <a
                    href="https://www.grayswan.ai/terms-of-service"
                    class="text-white hover:underline">Terms of Service</a
                >, and acknowledge that you have reviewed our
                <a href="https://www.grayswan.ai/privacy-policy" class="text-white hover:underline">Privacy</a
                >
                and
                <a href="https://www.grayswan.ai/acceptable-use-policy" class="text-white hover:underline"
                    >Acceptable Use</a
                > policies.
            </p>
        </div>

        <!-- <div class="mt-6 text-center text-gray-400 text-sm">
            <p>
                Don't have an account? <a
                    href="/signup"
                    class="text-white hover:underline">Sign Up</a
                >
            </p>
        </div> -->
    </div>
</div>
