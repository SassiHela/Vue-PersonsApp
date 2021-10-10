// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults(['./dist']);
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);


server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})


server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
