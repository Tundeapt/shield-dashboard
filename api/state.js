import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      return res.status(500).json({
        error: "Missing Supabase environment variables"
      });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { data, error } = await supabase
      .from('shield_state')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({});
    }

    return res.status(200).json(data[0]);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
