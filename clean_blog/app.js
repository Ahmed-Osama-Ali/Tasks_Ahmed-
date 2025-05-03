const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layout");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Clean Blog - Start Bootstrap Theme",
    posts: [
      {
        title: "Man must explore, and this is exploration at its greatest",
        subtitle: "Problems look mighty small from 150 miles up",
        author: "Start Bootstrap",
        date: "September 24, 2023",
      },
      {
        title: "Science has not yet mastered prophecy",
        subtitle:
          "We predict too much for the next year and yet far too little for the next ten.",
        author: "Start Bootstrap",
        date: "August 24, 2023",
      },
      {
        title: "Failure is not an option",
        subtitle:
          "Many say exploration is part of our destiny, but it's actually our duty to future generations.",
        author: "Start Bootstrap",
        date: "July 8, 2023",
      },
    ],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About - Clean Blog",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact - Clean Blog",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
