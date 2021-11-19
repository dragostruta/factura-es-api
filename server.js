const express = require("express");
const cors = require("cors");
const pdf = require("html-pdf");
const app = express();
const port = 3001;
// const port = process.env.PORT;
const fs = require("fs");

app.use(express.json());
app.use(cors());

const pdfTemplate = require("./documents");

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

//POST - PDF generation and fetching the data
app.post("/createPdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

//GET - Send the generated PDF tot the client
app.get("/fetchPdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
