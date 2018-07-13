const express = require("express");
const cors = require("cors");
const data = require("./api/cat-api");
const port = parseInt(process.env.PORT || 8080);
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

function getById(data, id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      return data[i];
    }
  }
  return null;
}

app.get("/", function(request, response) {
  response.json({
    data
  });
});

app.get("/:id", function(request, response) {
  var nerd = getById(data, request.params.id);
  if (!nerd) {
    response.status(404).json({
      error: {
        message: "No nerd found!"
      }
    });
  } else {
    response.json({
      data: nerd
    });
  }
});

app.listen(port, () => console.log("Listening on http://localhost:8080/"));
