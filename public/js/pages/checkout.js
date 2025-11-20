document.addEventListener("DOMContentLoaded", function () {
    // Obtener el producto de la URL
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product"); 

    // Guardarlo en el input hidden
    const productInput = document.getElementById("product");
    if (productInput) productInput.value = product;

    // Inicializar intl-tel-input
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ar",
        preferredCountries: ["es", "ar"],
        geoIpLookup: function (success, failure) {
            fetch("https://ipinfo.io/json?token=TU_TOKEN_IPINFO")
                .then(resp => resp.json())
                .then(resp => success(resp.country))
                .catch(() => success("us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.1/js/utils.min.js",
        separateDialCode: true
    });

    // Capturar submit del formulario
    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        document.getElementById("loading").style.display = "block";

        // Recoger datos del formulario
        const data = {
            name: document.getElementById("name").value.trim(),
            company: document.getElementById("company").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: iti.getNumber(),
            city: document.getElementById("city").value.trim(),
            province: document.getElementById("province").value.trim(),
            country: document.getElementById("country").value.trim(),
            terms: document.getElementById("terms").checked,
            extraCheck: document.getElementById("extraCheck").checked,
            product 
        };

        try {
            // Enviar datos al backend
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            // Redirigir a Stripe
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
