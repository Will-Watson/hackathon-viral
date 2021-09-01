const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.listen(process.env.PORT || 8080, () => console.log('server is running'));
