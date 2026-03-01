const design = document.getElementById("design");
const total = document.getElementById("total");

design.addEventListener("change", () => {
    total.innerText = design.value || 0;
});

document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const measurements = document.getElementById("measurements").value;
    const designPrice = design.value;

    const orderData = { name, phone, measurements, designPrice };

    // Save to server
    await fetch("/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    });

    // WhatsApp message
    const ownerNumber = "919384546594"; // <-- Put your mom number with 91

    const message = `New Order Received:
Name: ${name}
Phone: ${phone}
Measurements: ${measurements}
Amount: ₹${designPrice}`;

    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});