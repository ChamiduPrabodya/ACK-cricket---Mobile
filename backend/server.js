const express = require("express");
const cors = require("cors");
const promotionRoutes = require("./routes/promotionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ACK cricket backend running");
});

app.use("/api/promotions", promotionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ACK cricket backend running on port ${PORT}`);
});

