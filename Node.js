const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware per CORS e JSON
app.use(cors());
app.use(express.json());

// Configura Nodemailer per Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onebeat1985@gmail.com', // La tua email
    pass: 'juxd ykox yyuj bcxx',   // La tua password o App Password
  },
});

// Endpoint per inviare email
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email, // Mittente (chi compila il form)
    to: 'onebeat1985@gmail.com', // Email destinatario (la tua)
    subject: subject,
    text: `Nuovo messaggio da ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email inviata con successo!' });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ success: false, message: 'Errore durante l\'invio.' });
  }
});

// Avvia il server
app.listen(3000, () => {
  console.log('Server in ascolto su http://localhost:3000');
});