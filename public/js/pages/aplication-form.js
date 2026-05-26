document.addEventListener("DOMContentLoaded", function () {
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
    const form = document.getElementById("aplicationForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        document.getElementById("loading").style.display = "block";

        // Recoger datos del formulario
        const data = {
            fullName: document.getElementById("fullName").value.trim(),
            company: document.getElementById("company").value.trim(),
            rubric: document.getElementById("rubric").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: iti.getNumber(),
            rrss: document.getElementById("rrss").value.trim(),
            website: document.getElementById("website").value.trim(),
            location: document.getElementById("location").value.trim(),
        };

        try {
            // Enviar datos al backend
            const res = await fetch("https://web-ods-api.onrender.com/api/aplication", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();

            if (res.ok && result.success) {
                alert("¡Gracias! Tu solicitud fue enviada correctamente.");
                form.reset();
            } else {
                alert("Hubo un problema al enviar tu solicitud. Intenta nuevamente.");
            }
        } catch (err) {
            console.error(err);
            alert("Hubo un error al procesar tu solicitud. Intenta nuevamente.");
        } finally {
            document.getElementById("loading").style.display = "none";
        }
    });
});
