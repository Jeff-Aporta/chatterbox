const fs = require("fs");
const path = require("path");

function processing(params) {
  const result =
    processingJSON(params) ??
    processingJSX(params) ??
    processingEJS(params) ??
    processingDefault(params);

  return result;
}

function processingDefault({ template, res }) {
  if (!res.headersSent) {
    res.sendFile(template);
    return true;
  }
}

function getNodesTemplate(template) {
  const _tmplt = template
    .replace(global.__dirname_index, "")
    .split(path.sep)
    .filter(Boolean);
  if (_tmplt[0] === "public") {
    _tmplt.shift();
  }
  return _tmplt;
}

function processingEJS({ template, last, nodes, res }) {
  if (template.endsWith(".ejs") && !res.headersSent) {
    const _deep = nodes.length + 1;
    const upDir = Array.from({ length: _deep })
      .map(() => "../")
      .join("");
    const user = {};
    const logged = !!user;
    const _template = getNodesTemplate(template);
    const filename = _template.at(-1);
    const extension = filename.split(".").pop();
    const filenameJSX = filename.replace(`.${extension}`, ".jsx");
    const filenameCSS = filename.replace(`.${extension}`, ".css");
    if (!fs.existsSync(filenameCSS)) {
      filenameCSS = "";
    }
    const info = {
      path: _template,
      filename,
      extension,
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
    res.render(template, variables);
    return true;
  }
}

function processingJSX({ template, res, nodes }) {
  if (template.endsWith(".jsx") && !res.headersSent) {
    const tmplts = [
      ...["logged", "unlogged"].map((name) => {
        return {
          name,
          rule: function () {
            const patternUser = (logstate) => `user/${logstate}`;
            return nodes.join("/").startsWith(patternUser(this.name));
          },
        };
      }),
    ];
    const _filenameJSX = `/${getNodesTemplate(template).join("/")}`;
    for (const tmpl of tmplts) {
      if (tmpl.rule()) {
        require("../ejs/template").search({
          res,
          _filenameJSX,
          search: tmpl.name,
        });
        return true;
      }
    }
    require("../ejs/template").search({
      res,
      _filenameJSX,
      search: "default",
    });
    return true;
  }
}

function processingJSON({ template, res }) {
  if (template.endsWith(".json") && !res.headersSent) {
    res.json(template);
    return true;
  }
}

module.exports = processing;
