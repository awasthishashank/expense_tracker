// Function to add a new expense
function addExpense(name, amount) {
    // Get the expense list element
    const expenseList = document.getElementById('expenseList');
  
    // Create a new list item element
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
  
    // Create spans for name and amount
    const nameSpan = document.createElement('span');
    const amountSpan = document.createElement('span');
    nameSpan.innerText = name;
    amountSpan.innerText = amount;
  
    // Create delete and edit buttons
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'btn btn-primary btn-sm float-right edit mr-2';
  
    // Append elements to the list item
    listItem.appendChild(nameSpan);
    listItem.appendChild(amountSpan);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
  
    // Append the list item to the expense list
    expenseList.appendChild(listItem);
  
    // Save expenses to local storage
    saveExpensesToLocalStorage();
  }
  
  // Function to delete an expense
  function deleteExpense(element) {
    // Remove the expense item from the DOM
    element.parentElement.remove();
    // Update local storage after deletion
    saveExpensesToLocalStorage();
  }
  
  // Function to edit an expense
  function editExpense(element) {
    // Get the expense item
    const listItem = element.parentElement;
    // Get the current name and amount
    const name = listItem.querySelector('span:first-child').innerText;
    const amount = listItem.querySelector('span:nth-child(2)').innerText;
    // Prompt the user for new name and amount
    const newName = prompt('Enter new expense name:', name);
    const newAmount = prompt('Enter new expense amount:', amount);
    // Update the name and amount if provided
    if (newName && newAmount) {
      listItem.querySelector('span:first-child').innerText = newName;
      listItem.querySelector('span:nth-child(2)').innerText = newAmount;
      // Update local storage after editing
      saveExpensesToLocalStorage();
    }
  }
  
  // Function to save expenses to local storage
  function saveExpensesToLocalStorage() {
    const expenseItems = [];
    // Get all expense items
    document.querySelectorAll('.list-group-item').forEach(item => {
      // Get name and amount for each item
      const name = item.querySelector('span:first-child').innerText;
      const amount = item.querySelector('span:nth-child(2)').innerText;
      // Push name and amount to expenseItems array
      expenseItems.push({ name, amount });
    });
    // Convert expenseItems array to JSON and save to local storage
    localStorage.setItem('expenses', JSON.stringify(expenseItems));
  }
  
  // Function to load expenses from local storage
  function loadExpensesFromLocalStorage() {
    // Retrieve expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    // If expenses exist, add them to the tracker
    if (expenses) {
      expenses.forEach(expense => {
        addExpense(expense.name, expense.amount);
      });
    }
  }
  
  // Load expenses from local storage when the page loads
  window.addEventListener('load', function() {
    loadExpensesFromLocalStorage();
  });
  
  // Event listener for form submission
  document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get expense name and amount from form inputs
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = document.getElementById('expenseAmount').value;
    // Add the expense
    addExpense(expenseName, expenseAmount);
    // Clear the form inputs
    this.reset();
  });
  
  // Event delegation for delete and edit buttons
  document.getElementById('expenseList').addEventListener('click', function(event) {
    // If delete button is clicked, delete the expense
    if (event.target.classList.contains('delete')) {
      deleteExpense(event.target);
    }
    // If edit button is clicked, edit the expense
    if (event.target.classList.contains('edit')) {
      editExpense(event.target);
    }
  });
  