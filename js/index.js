let totalExpense = 0;

const btnElement = document.querySelector("#btnAddExpense");
const inputElement = document.querySelector("#inputAmount");
const headingElement = document.querySelector("#headingTotal");

btnElement.addEventListener("click", addExpenseToTotal, false);
headingElement.textContent = totalExpense;

function addExpenseToTotal() {
  const amount = Number(inputElement.value);
  totalExpense = totalExpense + amount;
  headingElement.textContent = totalExpense;
}
