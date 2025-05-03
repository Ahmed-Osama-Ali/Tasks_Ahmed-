// 1) حمل متغيّرات البيئة
require('dotenv').config();

const express       = require("express");
const mongoose      = require("mongoose");
const methodOverride= require("method-override");
const path          = require("path");
const ejsLayouts    = require("express-ejs-layouts");

const app = express();

// 2) ربط MongoDB عبر URI من .env
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 3) إعدادات الـ View Engine والـ Layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(ejsLayouts);
app.set("layout", "partials/layout");

// 4) Body parsing و static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// 5) تعريف الراوتس
const employeeRoutes = require("./routes/employee.Routes");
app.use("/", employeeRoutes);

// 6) صفحة 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// 7) تشغيل السيرفر على المنفذ من .env أو 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
