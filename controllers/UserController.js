const supabase = require('../client/SupabaseClient');

exports.syncFirebaseUser = async (req, res) => {
  const { uid, email, name } = req.user;

  console.log('Incoming user:', { uid, email, name });

  const { data, error } = await supabase
    .from('Customer')
    .upsert([
      {
        Firebase_uiid: uid,
        email,
        "Full Name": name
      }
    ], { onConflict: ['Firebase_uiid'] });

  console.log('Supabase response:', { data, error });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'User synced', data });
};