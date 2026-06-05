document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ar",
        preferredCountries: ["es", "ar"],
        geoIpLookup: function (success) {
            fetch("https://ipinfo.io/json?token=TU_TOKEN_IPINFO")
                .then(resp => resp.json())
                .then(resp => success(resp.country))
                .catch(() => success("us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.1/js/utils.min.js",
        separateDialCode: true
    });

    function getSelectText(id) {
        const select = document.getElementById(id);
        return select.options[select.selectedIndex].text;
    }

    function getGoals() {
        const goals = Array.from(
            document.querySelectorAll('input[type="checkbox"][name="goals[]"]:checked')
        ).map(cb => cb.value);

        const goalOther = document.getElementById("goal8").value.trim();
        if (goalOther) {
            goals.push("Otro: " + goalOther);
        }

        return goals;
    }

    const form = document.getElementById("aplicationForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const goals = getGoals();
        if (goals.length === 0) {
            alert("Seleccioná al menos un objetivo.");
            return;
        }

        document.getElementById("loading").style.display = "block";

        const data = {
            fullName: document.getElementById("fullName").value.trim(),
            company: document.getElementById("company").value.trim(),
            rubric: document.getElementById("rubric").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: iti.getNumber() || document.getElementById("phone").value.trim(),
            rrss: document.getElementById("rrss").value.trim(),
            website: document.getElementById("website").value.trim(),
            location: document.getElementById("location").value.trim(),
            products: getSelectText("products"),
            description: document.getElementById("description").value.trim(),
            year: document.getElementById("year").value.trim(),
            channels: document.getElementById("channels").value.trim(),
            employees: document.getElementById("employees").value.trim(),
            income: getSelectText("income"),
            expenses: getSelectText("expenses"),
            margins: getSelectText("margins"),
            clients: getSelectText("clients"),
            tools: getSelectText("tools"),
            storage: document.getElementById("storage").value.trim(),
            goals,
            terms: document.getElementById("terms").checked,
            communications: document.getElementById("communications").checked,
        };

        try {
            const res = await fetch("https://web-ods-api.onrender.com/api/aplication", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();

            if (res.ok && result.success) {
                fbq('track', 'CompleteRegistration');
                window.location.href = "../pages/thanks.html";
            } else {
                alert(result.message || "Hubo un problema al enviar tu solicitud. Intenta nuevamente.");
            }
        } catch (err) {
            console.error(err);
            console.error("Payload enviado:", data);
            alert("Hubo un error al procesar tu solicitud. Intenta nuevamente.");
        } finally {
            document.getElementById("loading").style.display = "none";
        }
    });
});
