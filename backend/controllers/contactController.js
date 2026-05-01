export const sendMessage = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Contact Message:', req.body);

  res.status(200).json({ message: 'Message received' });
};
