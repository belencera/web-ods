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
  });