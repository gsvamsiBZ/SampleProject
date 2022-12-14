var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var path = require("path");
const cors = require("cors");
var db = require("./backend/db/connections");
db.connect(true);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/frontend/build")));

var allRoutes = require("./backend/routes/allRoutes");
app.use("/api", allRoutes);

app.get("/*", async (req, res) => {
	res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Running at ", port);
});
