require("dotenv").config();

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

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the other server or change PORT in backend/.env.`
    );
    process.exit(1);
  }

  throw error;
});
