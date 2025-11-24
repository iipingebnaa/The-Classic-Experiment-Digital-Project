const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false; // production mode
const app = next({ dev, dir: '.' }); // dir: '.' ensures it uses current project root
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, () => {
    console.log("Next.js app running on port " + (process.env.PORT || 3000));
  });
});
