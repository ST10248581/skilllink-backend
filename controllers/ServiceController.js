const supabase = require('../client/SupabaseClient');

exports.getServicesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  console.log('Fetching services for category:', categoryId);

  const { data, error } = await supabase
    .from('Services')
    .select('*')
    .eq('CategoryID', categoryId);

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};