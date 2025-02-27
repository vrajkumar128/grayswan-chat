import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
        realtime: {
            enabled: true,
            params: {
                eventsPerSecond: 10,
                autoJoinChannels: true,
                broadcastChannels: ['public:messages']
            }
        },
        db: {
            schema: 'public'
        },
        auth: {
            persistSession: true,
            autoRefreshToken: true
        }
    }
);