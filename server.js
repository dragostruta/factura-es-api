const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());
app.use(cors());

app.get("/getInformation", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("./database.txt").toString()));
});

app.post("/postInformation", (req, res) => {
  fs.writeFileSync("./database.txt", JSON.stringify(req.body), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
