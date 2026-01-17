const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://xpense-tracking.netlify.app/",
    credentials: true
  })
);

// Routes
app.use("/api", expenseRoutes);

app.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
