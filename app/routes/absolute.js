function routesAbsolute(app) {
  app.get("/", (req, res) => {
    return require("./ejs/template").search({
      res,
      _filenameJSX: "index.jsx",
      search: "default",
    });
  });
}

module.exports = routesAbsolute;
