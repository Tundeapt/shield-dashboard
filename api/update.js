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
    const data = req.body;

    // 🔥 ADD REQUIRED FIELDS
    const payload = {
      ...data,
      account_id: "CEO-001", // required
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('shield_state')
      .insert([payload]);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ status: 'ok' });

  } catch (err) {


