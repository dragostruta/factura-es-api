module.exports = ({ user, client }) => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const taskList = () => {
    let string = "";

    for (let i = 0; i < Object.keys(client.taskInformation).length; i++) {
      string =
        string +
        `
          <div class="border-bottom border-1 py-2">
              <table class="py-2">
                <tr>
                  <td class="label" style="width: 450px">${
                    client.taskInformation[i]?.task
                  }</td>
                  <td class="data" style="width: 125px; text-align: center">
                    ${client.taskInformation[i]?.price}€
                  </td>
                  <td class="data" style="width: 100px; text-align: center">
                    ${client.taskInformation[i]?.count}
                  </td>
                  <td class="data" style="width: 125px; text-align: center">
                    ${
                      client.taskInformation[i]?.price *
                      client.taskInformation[i]?.count
                    }€
                  </td>
                </tr>
              </table>
            </div>`;
    }
    return string;
  };

  const getTotal = () => {
    let total = 0;

    for (let i = 0; i < Object.keys(client.taskInformation).length; i++) {
      total +=
        client.taskInformation[i]?.price * client.taskInformation[i]?.count;
    }
    return total;
  };

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>PDF Result Template</title>
      <!-- CSS only -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <style>
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          line-height: 24px;
          font-family: "Helvetica Neue", "Helvetica";
          color: #555;
        }
        .title {
          font-weight: bold;
          font-size: 20px;
        }
        .subtitle {
          font-weight: bold;
          font-size: 14px;
          text-align: center;
        }
        .label {
          font-weight: bold;
          font-size: 14px;
        }
        .data {
          font-size: 14px;
          text-align: center;
        }
        .margin-top {
          margin-top: 50px;
        }
        .justify-center {
          text-align: center;
        }
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }
        .invoice-box table td {
          padding: 5px;
          word-wrap: break-word;
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <div class="header">
          <div class="title p-2">Presupuesto PINTURA${user.facturalNumber}</div>
          <table class="contacts border-bottom border-1">
            <tr>
              <td class="subtitle">CLIENTE</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td class="subtitle">${client.taskInformation?.name ?? ""}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td class="subtitle">${client.taskInformation?.phone ?? ""}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td class="subtitle">${client.taskInformation?.mobile ?? ""}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div class="subheader border-bottom border-2 border-dark">
          <div class="date py-2">
            <div class="grid-container">
              <div class="grid-item-subheader label">FECHA: ${date}</div>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="table-head border-bottom border-2 border-dark py-2">
            <table>
              <tr>
                <th style="width: 450px">ARTICOLO</th>
                <th style="width: 125px; text-align: center">TARIFA</th>
                <th style="width: 100px; text-align: center">CANT.</th>
                <th style="width: 125px; text-align: center">TOTAL</th>
              </tr>
            </table>
          </div>
          <div class="table-data">
            ${taskList()}
            </div>
          </div>
        </div>
        <div class="footer">
          <table>
            <tr>
              <td
                class="py-3"
                style="width: 500px; padding-left: 400px; font-weight: bold"
              >
                TOTAL: <span style="padding-left 25px">${getTotal()}€</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>
  </html>
  
    `;
};
