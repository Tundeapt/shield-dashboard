import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 🔥 FORCE parse body (fix for MT5)
    const data = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data received' });
    }

    const { error } = await supabase
      .from('shield_state')
      .insert([data]);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error("PARSE ERROR:", err);
    return res.status(400).json({ error: 'Invalid JSON' });
  }
}
