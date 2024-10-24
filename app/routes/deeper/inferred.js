const fs = require("fs");
const path = require("path");

const EXTENSIONS_SUPPORTED_RENDER = ["html", "ejs", "jsx"];

function inferred({ nodes, last }) {
  nodes = [...nodes];
  for (const ext of EXTENSIONS_SUPPORTED_RENDER) {
    const params = { ext, nodes, last };
    const inferred = extension(params) ?? index(params) ?? homonim(params);
    if (inferred) {
      return inferred;
    }
  }
  return simple({ routeArr: nodes });
}

function index({ nodes, ext }) {
  const routeIndex = [...nodes, `index.${ext}`];
  return routeExists({ routeArr: routeIndex });
}

function homonim({ nodes, ext, last }) {
  const routeHomonim = [...nodes, `${last}.${ext}`];
  return routeExists({ routeArr: routeHomonim });
}

function extension({ nodes, ext }) {
  const nodext = [...nodes];
  const lastext = `${nodext.pop()}.${ext}`;
  nodext.push(lastext);
  return routeExists({ routeArr: nodext });
}

function simple({ routeArr }) {
  return routeExists({ routeArr });
}

function routeExists({ routeArr }) {
  let ruta = path.join(__dirname_index, "public", ...routeArr);
  if (fs.existsSync(ruta)) {
    return ruta;
  }
}

module.exports = inferred;
