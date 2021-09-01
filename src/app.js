const express = require('express');

const app = express();

app.listen(process.env.PORT || 39076, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});
