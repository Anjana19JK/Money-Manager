import {Component} from 'react'

import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachItem => id !== eachItem.id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {amountInput, titleInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayOption} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayOption,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {amountInput, titleInput, transactionList, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balance={balanceAmount}
          income={incomeAmount}
          expenses={expensesAmount}
        />
        <div>
          <form onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              placeholder="TITLE"
              value={titleInput}
              onChange={this.onChangeTitleInput}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              placeholder="AMOUNT"
              value={amountInput}
              onChange={this.onChangeAmountInput}
            />
            <label htmlFor="select">TYPE</label>
            <select
              id="select"
              value={optionId}
              onChange={this.onChangeOptionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          <h1>History</h1>
          <ul>
            <li>
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </li>
            {transactionList.map(eachListItem => (
              <TransactionItem
                key={eachListItem.id}
                transactionItem={eachListItem}
                deleteTransaction={this.deleteTransaction}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager

