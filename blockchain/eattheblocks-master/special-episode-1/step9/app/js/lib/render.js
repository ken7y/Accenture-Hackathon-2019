import { formatDate } from './utils';

const renderTransactions = ($transactions, transactions = []) => {
  if(transactions.length == 0) {
    $transactions.html('<tr><td scope="row">No transactions created yet...</td></tr>');
    return;
  }

  const html = transactions.map((transaction) => {
    return(`<tr>
      <td>${transactions[0]}</td>
      <td>${formatDate(transaction[1])}</td>
      <td>${transaction[2]}</td>
      <td>${transaction[3]}</td>
      <td><input type="checkbox" id="checkbox-${transaction[0]}" ${transaction[4] ? 'checked' : ''}/></td>
      <td>${transaction[5] ? formatDate(transaction[5]) : ''}</td>
     </tr>`);
   });
  $transactions.html(html.join(''));
};

export {
  renderTransactions
}
