const path = require("node:path");
const fs = require("node:fs/promises");

const ROUTES = ["/", "/about", "/contact-me"];

function getFilePath(url) {
  const fileName =
    url === "/" ? "index.html" : ROUTES.includes(url) ? `${url}.html` : url;
  return path.join(__dirname, "public", fileName);
}

function getContentType(fileExt) {
  let contentType;
  switch (fileExt) {
    case ".html": {
      contentType = "text/html";
      break;
    }
    case ".js": {
      contentType = "text/javascript";
      break;
    }
    case ".css": {
      contentType = "text/css";
      break;
    }
    case ".json": {
      contentType = "application/json";
      break;
    }
  }

  return contentType;
}

async function serveError(err, response) {
  try {
    if (err.code === "ENOENT") {
      const content = await fs.readFile(
        path.join(__dirname, "public", "404.html")
      );
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end(content, "utf8");
    } else {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("server error " + err.code, "utf8");
    }
  } catch (metaErr) {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(
      "something went so wrong that even the error page didn't work :0" +
        metaErr,
      "utf8"
    );
  }
}

module.exports = {
  getFilePath,
  getContentType,
  serveError,
};
