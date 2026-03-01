const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname)));

function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

app.post("/send-order", (req, res) => {

    const { name, phone, measurements, designPrice } = req.body;

    const newOrder = {
        name,
        phone,
        measurements,
        designPrice,
        dateTime: getCurrentDateTime()
    };

    const ordersFile = path.join(__dirname, "orders.json");

    const orders = JSON.parse(fs.readFileSync(ordersFile));
    orders.push(newOrder);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    res.json({ message: "Order placed successfully!" });
});

// Required for Render dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});