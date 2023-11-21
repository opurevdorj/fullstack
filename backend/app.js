const express = require("express");
require("dotenv").config();
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// middleware -- logging ---> saving user activity
app.use((req, res, next) => {
  console.log(
    `this user requested ${req.method} metod from this: ${
      req.path
    } path: ${new Date().toLocaleString()}`
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// middleware ---> error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
