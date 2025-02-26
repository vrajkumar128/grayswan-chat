<script>
    let email = "";
</script>

<body>
    <section
        class="grid h-[calc(100dvh)] w-full grid-cols-1 flex-col place-items-center px-5 py-16"
    >
        <div class="mx-auto w-full max-w-[400px] rounded-2xl py-8 text-white">
            <div class="mb-4 w-full sm:px-8">
                <h1 class="mb-4 text-pretty text-3xl font-medium md:text-4xl">
                    Welcome back
                </h1>
                <h2 class="text-pretty text-sm md:text-sm">
                    Sign in with an existing provider, or we'll send you a link
                    to your email.
                </h2>
            </div>
            <div class="flex w-full flex-col justify-center md:h-full">
                <div class="flex justify-center overflow-hidden md:mx-5">
                    <div class="mx-auto">
                        <div id="authContainer" class="mx-auto w-fit"></div>
                        <!---->
                    </div>
                </div>
                <div class="mx-auto -mt-4 mb-8 w-full max-w-[400px] sm:px-8">
                    <p class="text-pretty text-xs md:text-sm">
                        By continuing, you agree to our <a
                            href="https://www.grayswan.ai/terms-of-service"
                            target="_blank"
                            class="font-medium underline">Terms of Service</a
                        >, and acknowledge that you have reviewed our
                        <a
                            href="https://www.grayswan.ai/privacy-policy"
                            target="_blank"
                            class="font-medium underline">Privacy</a
                        >
                        and
                        <a
                            href="https://www.grayswan.ai/acceptable-use-policy"
                            target="_blank"
                            class="font-medium underline">Acceptable Use</a
                        > policies.
                    </p>
                </div>
                <div class="mx-auto w-full max-w-[400px] text-sm sm:px-8">
                    <!--[-->
                    <p>
                        Don't have an account? <a
                            href="/register"
                            class="underline">Sign Up</a
                        >
                    </p>
                    <!--]-->
                </div>
            </div>
        </div>
    </section>
</body>

<style>
    body {
        background: #101828;
    }
</style>
