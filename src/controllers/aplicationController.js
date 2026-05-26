const fetch = require("node-fetch");

const sendAplicationToSheet = async (req, res) => {
    try {
        const data = req.body;

        const response = await fetch(process.env.GOOGLE_SCRIPT_APPLICATION_FORM_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            redirect: "follow",
        });

        const text = await response.text();
        let result;
        try {
            result = JSON.parse(text);
        } catch {
            console.error("Respuesta no JSON de Google Script:", text.slice(0, 300));
            return res.status(502).json({
                success: false,
                message: "Respuesta inválida del servicio de Google Sheets",
            });
        }

        if (!response.ok || !result.success) {
            console.error("Google Script error:", result);
            return res.status(502).json({
                success: false,
                message: result.message || "Error al guardar en Google Sheets",
            });
        }

        res.json({ success: true, message: "Solicitud enviada correctamente" });
    } catch (err) {
        console.error("Error en sendAplicationToSheet:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { sendAplicationToSheet };