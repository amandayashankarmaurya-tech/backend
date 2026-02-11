const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "https://portfolio-frontend-4m7o.onrender.com",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Incoming:", req.body);

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Portfolio Contact",
          email: "amandayashankarmaurya@gmail.com", // must be verified in Brevo
        },
        to: [
          {
            email: "amandayashankarmaurya@gmail.com",
            name: "Aman Maurya",
          },
        ],
        subject: `New Contact Form Submission from ${name}`,
        textContent: `
Name: ${name}
Email: ${email}
Message: ${message}
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("Brevo API Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Email failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
