// Manejar la selección del plan y redirigir a checkout.html
document.getElementById('goCheckout').addEventListener('click', () => {
    const selectedPlan = document.getElementById('planSelect').value;
    // Redirigir a checkout.html pasando la selección
    window.location.href = `/pages/checkout.html?product=${selectedPlan}`;
});

