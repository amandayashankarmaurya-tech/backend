const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "https://portfolio-frontend-4m7o.onrender.com",
}));
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Incoming:", req.body);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.BREVO_API_KEY,
      },
    });

    await transporter.sendMail({
      from: "Portfolio Contact <no-reply@portfolio.com>",
      to: "amandayashankarmaurya@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Email failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port http://localhost:5000"));
