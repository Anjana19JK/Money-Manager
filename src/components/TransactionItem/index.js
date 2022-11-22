const TransactionItem = props => {
  const {transactionItem, deleteTransaction} = props
  const {id, title, amount, type} = transactionItem
  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" testid="delete" onClick={onDeleteTransaction}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
