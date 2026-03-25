import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('shield_state')
      .select('*')
      .eq('account_id', 'main')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return res.status(200).json(data[0] || {});

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
