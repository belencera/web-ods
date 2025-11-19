document.addEventListener("DOMContentLoaded", function () {
  // Manejo de la librería intl-tel-input para el campo de teléfono
  const input = document.querySelector("#phone");
  if (input) {
    window.intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io/json?token=b0b065e9440fe0")
          .then((resp) => resp.json())
          .then((resp) => callback(resp.country))
          .catch(() => callback("es"));
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });
  } else {
    console.warn("No se pudo inicializar intl-tel-input");
  }

  // Manejo de la librería countrySelect para el campo de país
  const countryInput = document.querySelector("#country");
  if (countryInput && typeof $ !== "undefined" && typeof $.fn.countrySelect !== "undefined") {
    $(countryInput).countrySelect({
      preferredCountries: ['es', 'mx', 'ar'],
      defaultCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io/json?token=b0b065e9440fe0")
          .then(resp => resp.json())
          .then(resp => callback(resp.country))
          .catch(() => callback("es"));
      }
    });
  } else {
    console.warn("No se pudo inicializar countrySelect");
  }

  // Envío del formulario de contacto mediante Google Apps Script
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Obtener el país formateado del selector
      let selectedCountry = "";
      try {
        selectedCountry = $("#country")
          .countrySelect("getSelectedCountryData")
          .name;
      } catch {
        selectedCountry = document.getElementById("country").value;
      }

      const data = {
        name: document.getElementById("name").value.trim(),
        company: document.getElementById("company").value.trim(),
        country: selectedCountry,
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        if (result.success) {
          alert("¡Gracias! Tu mensaje fue enviado correctamente.");
          form.reset();
        } else {
          alert("Hubo un problema al enviar el formulario.");
        }
      } catch (error) {
        console.error("Error enviando datos:", error);
        alert("No se pudo enviar el formulario. Inténtalo más tarde.");
      }
    });
  }
});