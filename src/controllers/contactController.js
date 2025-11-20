const fetch = require("node-fetch"); 

const sendContactToSheet = async (req, res) => {
  try {
    const data = req.body;

    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    res.json({ success: true, message: "Fila añadida correctamente" });
  } catch (err) {
    console.error("Error en sendContactToSheet:", err);
    res.status(500).json({ success: false, message: "Hubo un problema" });
  }
};

module.exports = { sendContactToSheet };
