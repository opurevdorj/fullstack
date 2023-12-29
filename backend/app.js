const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const notesRoutes = require("./routes/notes");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://fullstack-leap-frontend-livid.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

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
app.use("/notes", notesRoutes);

// middleware ---> error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    console.log("Connected to MongoDB successfully"),
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    })
  )

  .catch((err) => console.log(err));
