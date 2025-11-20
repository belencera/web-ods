const fetch = require("node-fetch");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const sendPlanToSheet = async (req, res) => {
    try {
        // 1️. Recibir datos del formulario
        const { name, company, email, phone, terms, extraCheck, plan } = req.body;

        // 2️. Enviar datos a Google Sheets
        const sheetResponse = await fetch(process.env.GOOGLE_SCRIPT_CHECKOUT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        if (!sheetResponse.ok) {
            console.error("Error en respuesta de Google Sheets");
            throw new Error("No se pudo guardar en Google Sheets");
        }


        // 3️.Crear sesión de Stripe SOLO si Sheets respondió bien
        const priceIds = {
            starter: process.env.STRIPE_PRICE_STARTER,
            growth: process.env.STRIPE_PRICE_GROWTH,
            scale: process.env.STRIPE_PRICE_SCALE,
            equity: process.env.STRIPE_PRICE_EQUITY
        };

        const planKey = plan.toLowerCase();

        if (!priceIds[planKey]) {
            return res.status(400).json({ success: false, message: "El plan recibido no es válido." });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price: priceIds[planKey],
                    quantity: 1
                }
            ],
            customer_email: email,
            success_url: `${process.env.BASE_URL}/pages/success.html`,
            cancel_url: `${process.env.BASE_URL}/pages/cancel.html`
        });

        // 4️. Enviar URL al frontend
        return res.json({ success: true, url: session.url });

    } catch (err) {
        console.error("Error en sendPlanToSheet:", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = { sendPlanToSheet };
