<script>
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let email = $state("");

    // Check if user is already logged in on component mount
    onMount(async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            goto("/chat");
        }
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

<div class="grid h-[100vh] w-full place-items-center bg-[#101828] px-5 py-16">
    <div class="max-w-md w-full">
        <h1 class="text-3xl font-semibold mb-4 text-white">Welcome back</h1>
        <p class="text-gray-400 mb-6">
            Sign in with an existing provider, or we'll send you a link to your
            email.
        </p>

        <button
            onclick={loginWithGoogle}
            class="flex items-center justify-center w-full py-3 px-4 mb-3 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
        >
            <span class="w-5 h-5 mr-3 flex items-center justify-center">G</span>
            Continue with Google
        </button>

        <button
            onclick={loginWithDiscord}
            class="flex items-center justify-center w-full py-3 px-4 mb-3 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
        >
            <span class="w-5 h-5 mr-3 flex items-center justify-center">D</span>
            Continue with Discord
        </button>

        <button
            onclick={loginWithGitHub}
            class="flex items-center justify-center w-full py-3 px-4 mb-3 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors"
        >
            <span class="w-5 h-5 mr-3 flex items-center justify-center">H</span>
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

        <div class="mt-6 text-xs text-gray-400 leading-relaxed">
            <p>
                By continuing, you agree to our <a
                    href="/terms"
                    class="text-white hover:underline">Terms of Service</a
                >, and acknowledge that you have reviewed our
                <a href="/privacy" class="text-white hover:underline">Privacy</a
                >
                and
                <a href="/acceptable-use" class="text-white hover:underline"
                    >Acceptable Use</a
                > policies.
            </p>
        </div>

        <div class="mt-6 text-center text-gray-400 text-sm">
            <p>
                Don't have an account? <a
                    href="/signup"
                    class="text-white hover:underline">Sign Up</a
                >
            </p>
        </div>
    </div>
</div>
