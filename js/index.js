let totalExpense = 0;
const allExpenses = [];

// Get DOM elements by reference
const addExpense = document.querySelector("#button-add-expense"),
  amountSpent = document.querySelector("#amount-spent"),
  spentOn = document.querySelector("#spent-on"),
  totalExpenses = document.querySelector("#total-expenses"),
  expenseTable = document.querySelector("#expense-table");

// Initialize TotalExpense on page load
function init() {
  _setTotalExpense(totalExpense);
}

/** Controller Functions */

// Calculate Total Expenses
function _calculateExpenseTotal() {
  if (amountSpent.value !== "" && spentOn.value !== "") {
    const expenseItem = {},
      amount = Number(amountSpent.value),
      description = spentOn.value;

    expenseItem.amount = amount;
    expenseItem.description = description;
    expenseItem.moment = new Date();

    allExpenses.push(expenseItem);

    // Render Expense List
    _generateExpenseList(allExpenses);
    // Clear form data after expense added to the list
    _clearForm();

    totalExpense = totalExpense + amount;
    _setTotalExpense(totalExpense);
  }
}

// Clear Form Data
function _clearForm() {
  (amountSpent.value = ""), (spentOn.value = "");
}

// Set Total Expenses
function _setTotalExpense() {
  let totalExpenseLabel = `Total: ${totalExpense}`;
  totalExpenses.textContent = totalExpenseLabel;
}

// Get Date in the desired format [MMM DD, YYYY]
function _getDateString(moment) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return moment.toLocaleDateString("en-US", options);
}

// Delete Expense
function _deleteExpense(expenseItem) {
  allExpenses.forEach((expense, index) => {
    if (expense.moment.valueOf() === expenseItem) {
      totalExpense = totalExpense - expense.amount;
      allExpenses.splice(index, 1);
    } else {
      return allExpenses;
    }
  });
  _generateExpenseList(allExpenses);
  _setTotalExpense(totalExpense);
}

// Generate Expense List
function _generateExpenseList(expenseList) {
  const expenseListContent = expenseList
    .map((expense) => _createListItem(expense))
    .join("");
  expenseTable.innerHTML = expenseListContent;
}

/** VIEW Layer */

// Create Expense Item
function _createListItem({ description, amount, moment }) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex flex-column">
      ${description}
      <small class="text-muted">${_getDateString(moment)}</small>
    </div>
    <div>
      <span class="px-5">
      ₹ ${amount}
      </span>
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="_deleteExpense(${moment.valueOf()})">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </li>
  `;
}
