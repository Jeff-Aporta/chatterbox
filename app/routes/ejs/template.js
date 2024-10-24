const path = require("path");
const fs = require("fs");

function template({ res, _filenameJSX, tmplt }) {
  const tmpltJSX = `/${tmplt.join("/").replace(".ejs", ".jsx")}`;
  const _deep = tmplt.length;
  const upDir = Array.from({ length: _deep - 1 })
    .map((e) => "../")
    .join("");
  const _template = path.join(__dirname_index, "public", ...tmplt);
  const user = {};
  const logged = !!user;
  const filenameJSX = _filenameJSX
    .replace(path.join(__dirname_index, "public"), "")
    .split(path.sep)
    .join("/");
  let filenameCSS = filenameJSX.replace(".jsx", ".css");
  if (!fs.existsSync(path.join(__dirname_index, "public", filenameCSS))) {
    filenameCSS = "";
  }
  const p = _template
    .replace(path.join(__dirname_index, "public"), "")
    .split(path.sep)
    .join("/");
  const info = {
    path: p,
    tmpltJSX,
    filenameJSX,
    filenameCSS,
    deep: _deep,
    upDir,
    user,
    logged,
  };
  const variables = {
    info: JSON.stringify(info),
    ...info,
  };
  return res.render(_template, variables);
}

function addTmplt(tmplt, params) {
  params.tmplt = tmplt;
  return template(params);
}

const search = (params) =>
  addTmplt(`src/ejs/themes/v1/${params.search}.ejs`.split("/"), params);

module.exports = {
  search,
  template,
};
