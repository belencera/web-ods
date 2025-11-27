document.addEventListener('DOMContentLoaded', function () {
    // Manejar el cambio de href según la selección del plan
    function setupSelectButton(selectId, buttonId) {
        const select = document.getElementById(selectId);
        const button = document.getElementById(buttonId);

        if (!select || !button) return; // seguridad

        function updateHref() {
            const productValue = select.value;
            button.href = `/pages/checkout.html?product=${encodeURIComponent(productValue)}`;
        }

        // Actualizar al cambiar la opción
        select.addEventListener('change', updateHref);

        // Inicializar al cargar la página
        updateHref();
    }

    // Configuramos los dos selects + botones
    setupSelectButton('workspaceBase', 'btnWorkspaceBase');
    setupSelectButton('workspaceAdvanced', 'btnWorkspaceAdvanced');
});