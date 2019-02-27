const express = require('express');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 9000))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
});