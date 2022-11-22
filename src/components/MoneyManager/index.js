import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

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
  }
  onAddTransaction = event => {
    event.preventDefault()
    const {amountInput, titleInput} = this.state
  }

  onChangeTitleInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({titleInput: event.target.value})
  }

  render() {
    const {amountInput, titleInput} = this.state
    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
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
            <select id="select">
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
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
