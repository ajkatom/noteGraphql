const app = require('./server/app');
const server = require('http').createServer(app);
const port = process.env.PORT || 4300;

server.listen(port);
console.log(`Server running on ${port} port`);
