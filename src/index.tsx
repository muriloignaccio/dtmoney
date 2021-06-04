import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Desenvolvimento de site",
          amount: 12000,
          type: "deposit",
          category: "Venda",
          createdAt: new Date("2021-04-13 09:00:00"),
        },
        {
          id: 2,
          title: "Hamburguer",
          amount: -59,
          type: "withdraw",
          category: "Alimentação",
          createdAt: new Date("2021-04-10 09:00:00"),
        },
        {
          id: 3,
          title: "Aluguel de apartamento",
          amount: -1200,
          type: "withdraw",
          category: "Casa",
          createdAt: new Date("2021-03-27 09:00:00"),
        },
        {
          id: 4,
          title: "Computador",
          amount: 5400,
          type: "deposit",
          category: "Venda",
          createdAt: new Date("2021-03-15 09:00:00"),
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
