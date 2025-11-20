document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    document.getElementById("plan").value = plan;

    const form = document.getElementById("checkoutForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        document.getElementById("loading").style.display = "block";

        const data = {
            name: document.getElementById("name").value.trim(),
            company: document.getElementById("company").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            terms: document.getElementById("terms").checked,
            extraCheck: document.getElementById("extraCheck").checked,
            plan
        };

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            // ⬇️ Stripe redirection
            if (result.url) {
                window.location.href = result.url;
                return;
            }

            alert("Hubo un problema con la suscripción.");
            document.getElementById("loading").style.display = "none";

        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo enviar el formulario.");
            document.getElementById("loading").style.display = "none";
        }
    });
});
