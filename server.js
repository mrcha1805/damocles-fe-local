const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT|| 8123;

app.use(cors());
app.disable('x-powered-by');
app.use('/actionable-insight/*',(req, res, next) => {
  res.setHeader('X-Frame-Options', 'sameorigin');
  next();
 });
app.use("/actionable-insight/healthcheck",(req, res) => { res.status(200).send("success digital co analytics"); });
app.use("/actionable-insight", express.static(path.join(__dirname, './dist/actionable-insight-fe/')));
app.use('/actionable-insight/*', (req, res) => {
  res.sendfile(path.join(__dirname, './dist/actionable-insight-fe/index.html'));
});

app.listen(port, () => {
    console.log("Starting server on port: " + port);
})