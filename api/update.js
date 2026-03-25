import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Basic validation
    if (!data.balance || !data.equity) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const payload = {
      account_id: "main",
      balance: data.balance,
      equity: data.equity,
      axm_sod: data.axm_sod,
      pv_sod: data.pv_sod,
      axm_positions: data.axm_positions,
      pv_positions: data.pv_positions,
      axm_float_pct: data.axm_float_pct,
      pv_float_pct: data.pv_float_pct,
      pv_day_loss_pct: data.pv_day_loss_pct,
      pv_wiped: data.pv_wiped,
      axm_stopped: data.axm_stopped,
      sess_fired: data.sess_fired,
      news_halt: data.news_halt,
      last_trigger: data.last_trigger,
      timestamp: data.timestamp
    };

    const { error } = await supabase
      .from('shield_state')
      .insert([payload]);

    if (error) throw error;

    return res.status(200).json({ status: "ok" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
