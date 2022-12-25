const express = require("express");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const connect = require("./schemas");
const indexRouter = require("./routes");
const postsRouter = require("./routes/posts");

const app = express();

app.set("port", process.env.PORT || 8080); // 서버가 실행될 포트
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
connect();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://gdsc-react-study.web.app", "https://gdsc-react-study.firebaseapp.com"],
  })
);

app.use("/", indexRouter);
app.use("/posts", postsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV != "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
