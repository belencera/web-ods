const fetch = require("node-fetch");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const sendProductToSheet = async (req, res) => {
    try {
        const { name, company, email, phone, address, city, postalCode, province, country, terms, extraCheck, product } = req.body;

        // 1️⃣ Guardar en Google Sheets
        const sheetResponse = await fetch(process.env.GOOGLE_SCRIPT_CHECKOUT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        if (!sheetResponse.ok) {
            console.error("Error en respuesta de Google Sheets");
            throw new Error("No se pudo guardar en Google Sheets");
        }

        // 2️⃣ Mapear producto a ID de Stripe
        const priceIds = {
            // Planes
            "plan-starter": process.env.STRIPE_PRICE_STARTER,
            "plan-growth": process.env.STRIPE_PRICE_GROWTH,
            "plan-scale": process.env.STRIPE_PRICE_SCALE,
            "plan-equity": process.env.STRIPE_PRICE_EQUITY,
            // Workspaces
            "workspace-base-monthly": process.env.STRIPE_PRICE_WORKSPACE_BASE_MONTHLY,
            "workspace-base-annual": process.env.STRIPE_PRICE_WORKSPACE_BASE_ANNUAL,
            "workspace-advanced-monthly": process.env.STRIPE_PRICE_WORKSPACE_ADVANCED_MONTHLY,
            "workspace-advanced-annual": process.env.STRIPE_PRICE_WORKSPACE_ADVANCED_ANNUAL,
        };

        // 3️⃣ Crear Customer en Stripe con los datos del formulario
        const customer = await stripe.customers.create({
            name,
            email,
            phone,
            address: {
                line1: address,
                city,
                state: province,
                postal_code: postalCode,
                country
            }
        });


        // 4️⃣ Crear sesión Stripe solo si hay priceId
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            customer: customer.id,
            line_items: [
                {
                    price: priceIds[product],
                    quantity: 1
                }
            ],
            allow_promotion_codes: true,
            success_url: `${process.env.BASE_URL}/pages/success.html`,
            cancel_url: `${process.env.BASE_URL}/pages/cancel.html`
        });

        return res.json({ success: true, url: session.url });

    } catch (err) {
        console.error("Error en sendProductToSheet:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { sendProductToSheet };
