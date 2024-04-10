const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

const { getFilePath, getContentType, serveError } = require("./utils");

async function serveResource(filePath, contentType, response) {
  try {
    const content = await fs.readFile(filePath);
    response.writeHead(200, { "Content-Type": contentType });
    response.end(content, "utf8");
  } catch (err) {
    serveError(err, response);
  }
}

const server = http.createServer((request, response) => {
  const filePath = getFilePath(request.url);
  const contentType = getContentType(path.extname(filePath));
  serveResource(filePath, contentType, response);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`started server at port ${PORT}`));
