const fetch = require("node-fetch");

const REQUIRED_FIELDS = [
    "fullName",
    "company",
    "rubric",
    "email",
    "phone",
    "rrss",
    "website",
    "location",
    "products",
    "description",
    "year",
    "channels",
    "employees",
    "income",
    "expenses",
    "margins",
    "clients",
    "tools",
    "storage",
];

const sendAplicationToSheet = async (req, res) => {
    try {
        const data = req.body;

        const missing = REQUIRED_FIELDS.filter(
            (field) => !data[field] || String(data[field]).trim() === ""
        );

        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Faltan campos obligatorios: ${missing.join(", ")}`,
            });
        }

        if (!Array.isArray(data.goals) || data.goals.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Seleccioná al menos un objetivo.",
            });
        }

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
