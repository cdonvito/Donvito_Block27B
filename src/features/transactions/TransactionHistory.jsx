import "./transactionHistory.scss";
import { useSelector } from "react-redux";

/** Displays a table row with transaction information  */
const TransactionRow = ({
  transaction: { type, amount, balance, recipient },
  isLatestTransfer,
}) => (
  <tr>
    <th scope="row">
      {type === "transfer" && recipient ? `Transfer to ${recipient}` : type}
    </th>
    <td>{amount.toFixed(2)}</td>
    <td>{balance.toFixed(2)}</td>
  </tr>
);

/** Displays a table of the user's transaction history. */
export default function TransactionHistory() {
  // TODO: Get the transaction history from the Redux store using the useSelector hook
  const history = useSelector((state) => state.transactions.history);

  const latestTransaction = history[history.length - 1];
  const isLatestTransfer =
    latestTransaction && latestTransaction.type === "transfer";

  return (
    <section className="transactions-history container">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO
          Map over the transactions in `history`
          to render the appropriate `TransactionRow`s
          */}
          {history.length > 0 ? (
            history.map((transaction, index) => {
              const isTransactionLatest =
                index === history.length - 1 && isLatestTransfer;
              return (
                <TransactionRow
                  key={index}
                  transaction={transaction}
                  isLatestTransfer={isTransactionLatest}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>No transactions</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
