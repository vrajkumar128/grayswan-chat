<script>
    import { supabase } from "$lib/supabase";
    
    let email = $state("");

    async function loginWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) console.error(error.message);
    }

    async function loginWithDiscord() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "discord",
        });
        if (error) console.error(error.message);
    }
    
    function updateEmail(e) {
        email = e.target.value;
    }
</script>

<div class="grid h-[100vh] w-full place-items-center bg-[#101828] px-5 py-16">
  <div class="max-w-md w-full">
    <h1 class="text-3xl font-semibold mb-4 text-white font-onest">Welcome back</h1>
    <p class="text-gray-400 mb-6 font-onest">Sign in with an existing provider, or we'll send you a link to your email.</p>
    
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
    
    <button class="w-full py-3.5 px-4 rounded bg-gray-900 border border-gray-800 text-white hover:bg-gray-800 transition-colors">
      Continue with email
    </button>
    
    <div class="mt-6 text-xs text-gray-400 leading-relaxed font-onest">
      <p>
        By continuing, you agree to our <a href="/terms" class="text-white hover:underline">Terms of Service</a>,
        and acknowledge that you have reviewed our
        <a href="/privacy" class="text-white hover:underline">Privacy</a> and <a href="/acceptable-use" class="text-white hover:underline">Acceptable Use</a> policies.
      </p>
    </div>
    
    <div class="mt-6 text-center text-gray-400 text-sm font-onest">
      <p>Don't have an account? <a href="/signup" class="text-white hover:underline">Sign Up</a></p>
    </div>
  </div>
</div>