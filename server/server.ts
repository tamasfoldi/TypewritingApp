import * as express from "express";
import * as path from "path";
import * as jwt from "express-jwt";
import * as bodyParser from "body-parser";
import { lessonRouter } from "./routes/lessons.routes";
import { userRouter } from "./routes/users.routes";
import { statisticsRouter } from "./routes/statistics.routes";

let app = express();
let jwtCheck = jwt({
  secret: new Buffer("1Jl2avFWtDPzXN3uJc9WOeXNKUiTNuTHHGWevec-8F6QcyIyZI3-VpdbGXzi-1M9", "base64"),
  audience: "nAG6Yz8t5KQu07YukjV83Wh94hOYiR4T"
});

app.use("/app", express.static(path.resolve(__dirname, "../app")));
app.use("/node_modules", express.static(path.resolve(__dirname, "../node_modules")));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", jwtCheck);
app.use("/api/users", userRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/statistics", statisticsRouter);



let renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../index.html"));
};
let renderSystemJsConf = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../systemjs.config.js"));
};

app.get("/systemjs.config.js", renderSystemJsConf);
app.get("/*", renderIndex);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});