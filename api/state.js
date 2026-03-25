import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('shield_state')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error("STATE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    // 🔥 SAFE RETURN (no crash)
    if (!data || data.length === 0) {
      return res.status(200).json({});
    }

    return res.status(200).json(data[0]);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
