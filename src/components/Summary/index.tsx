import { useTransactions } from "../../hooks/useTransactios";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { Container, AmountBox } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, current) => {
    if (current.type === 'deposit') {
      acc.deposits += current.amount
      acc.total += current.amount
    } else {
      acc.withdraws += current.amount
      acc.total -= current.amount
    }
    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  return (
    <Container>
      <AmountBox>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.deposits)
          }
        </strong>
      </AmountBox>

      <AmountBox>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          {
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.withdraws)
          }
        </strong>
      </AmountBox>

      <AmountBox 
        isTotal={true}
        isPositive={summary.total > 0}
      >
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(summary.total)
          }
        </strong>
      </AmountBox>
    </Container>
  );
}
