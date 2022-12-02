// сначала подключаются все сторонноие пакеты
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// подключение роутов
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//создается экземпляр приложения
const app = express();

// подключаем шаблоны
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//блок подключения промежуточного ПО
//порядок подключаемого промежуточного ПО имеет значение
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //обработка статических ресурсов

//Подключение роутеров в приложение
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Вначале происходит обработка несуществующего роута или ошибка 404
app.use(function (req, res, next) {
  next(createError(404));
});

// мы создаем ошибку и пробрасываем ее дальше для обработки.
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
