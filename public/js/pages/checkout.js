document.addEventListener("DOMContentLoaded", function () {
    // 1️⃣ Obtener el producto de la URL
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product"); 

    // 2️⃣ Guardarlo en el input hidden
    const productInput = document.getElementById("product");
    if (productInput) productInput.value = product;

    // 3️⃣ Capturar submit del formulario
    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        document.getElementById("loading").style.display = "block";

        // 4️⃣ Recoger datos del formulario
        const data = {
            name: document.getElementById("name").value.trim(),
            company: document.getElementById("company").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            terms: document.getElementById("terms").checked,
            extraCheck: document.getElementById("extraCheck").checked,
            product // siempre un solo campo universal
        };

        try {
            // 5️⃣ Enviar datos al backend
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            // 6️⃣ Redirigir a Stripe
            if (result.url) {
                window.location.href = result.url;
            } else {
                throw new Error("El servidor no devolvió la URL de Stripe.");
            }

        } catch (err) {
            console.error(err);
            alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
        }
    });
});
