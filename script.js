'use strict';

const buttonCalculate = document.getElementById('start');

const buttonIncome = document.getElementsByTagName('button')[0];
const buttonExpenses = document.getElementsByTagName('button')[1];

const checkBox = document.querySelector('#deposit-check');

const additionalIncomeItem= document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];


const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const range = document.querySelector('.period-select');
const rangeAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');

const inputs = document.getElementsByTagName('input');

let isNumber = function(n){
 return (!isNaN(parseFloat(n)) && isFinite(n));
};
buttonCalculate.disabled = true;



let appData ={
 income: {},
 addIncome: [],
 incomeMonth: 0,
 expenses: {},
 addExpenses: [],
 budgetDay: 0,
 budgetMonth: 0,
 expensesMonth: 0,
 deposit: false,
 percentDeposit: 0,
 moneyDeposit: 0,
 budget: 0,
 start: function(){

   appData.budget = +salaryAmount.value;
   appData.getExpenses();
   appData.getIncome();
   appData.getExpensesMonth();
   appData.getAddExpenses();
   appData.getAddIncome();
   appData.getBudget();

   appData.showResult();
 },
 showResult: function(){
  budgetMonthValue.value = appData.budgetMonth;
  budgetDayValue.value = appData.budgetDay;
  expensesMonthValue.value = appData.expensesMonth;
  additionalExpensesValue.value = appData.addExpenses.join(', ');
  additionalIncomeValue.value = appData.addIncome.join(', ');
  targetMonthValue.value = appData.getTargetMonth();
  incomePeriodValue.value = appData.calcSavedMoney();

  range.addEventListener('input', function(){
    incomePeriodValue.value = appData.calcSavedMoney();
  });
 },
 addExpensesBlock: function(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.childNodes.forEach(function(item){
   item.value = '';
  });
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpenses);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
   buttonExpenses.style.display = 'none';
  }
 },
 addIncomeBlock: function(){
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.childNodes.forEach(function(item){
   item.value = '';
  });
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncome);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length ===3) {
   buttonIncome.style.display = 'none';
  }
 },
 getExpenses: function(){
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== ''){
     appData.expenses[itemExpenses] = +cashExpenses;
    }
  });
 },
 getIncome: function(){
  incomeItems.forEach(function(item){
   let itemIncome = item.querySelector('.income-title').value;
   let cashIncome = item.querySelector('.income-amount').value;
   if (itemIncome !== '' && cashIncome !== ''){
    appData.income[itemIncome] = +cashIncome;
   }
  });
 
  for (let key in appData.income) {
   appData.incomeMonth += +appData.income[key];
  }
 },
 getAddExpenses: function() {
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
   item = item.trim();
   if (item !== '') {
    appData.addExpenses.push(item);
   }
  });
 },
 getAddIncome: function(){
  additionalIncomeItem.forEach(function(item){
   let itemValue = item.value.trim();
   if (itemValue !== '') {
    appData.addIncome.push(itemValue);
   }
  });
 },
 asking: function(){
  const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
  appData.addExpenses = addExpenses.toLowerCase().split(', ');
  appData.deposit = confirm('Есть ли у вас депозит в банке?');
  
 },
 getExpensesMonth: function(){
  for (let key in appData.expenses){
   appData.expensesMonth += +appData.expenses[key];
  }
 },
 getBudget: function(){
  appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
  appData.budgetDay = Math.floor(appData.budgetMonth/30);
 },
 getTargetMonth:  function(){
  return Math.ceil(targetAmount.value/appData.budgetMonth);
 },
 getStatusIncome: function(){
  if (appData.budgetDay >= 1200) { return ('У вас высокий уровень дохода');
  } else if (appData.budgetDay >=600) {return ('У вас средний уровень дохода');
  } else if (appData.budgetDay>=0 && appData.budgetDay<600) {return ('К сожалению у вас уровень дохода ниже среднего');
  } else {return ('Что то пошло не так');}
 },
 getInfoDeposit: function(){
  if (appData.deposit){
   do{
   appData.percentDeposit = prompt('Какой годовой процент?');
   } while(!isNumber(appData.percentDeposit));
   do{
   appData.moneyDeposit = prompt('Какая сумма заложена?');
   } while(!isNumber(appData.moneyDeposit));
  }
 },
 calcSavedMoney: function(){
  return appData.budgetMonth * range.value;
 }
};

salaryAmount.addEventListener('input', function(){
 if (salaryAmount.value.trim() === '') {
  buttonCalculate.disabled = true;
 } else {
  buttonCalculate.disabled = false;
 }
});

buttonCalculate.addEventListener('click', appData.start);
buttonExpenses.addEventListener('click', appData.addExpensesBlock);
buttonIncome.addEventListener('click', appData.addIncomeBlock);

range.addEventListener('input', function(){
rangeAmount.textContent = range.value;
});

Array.from(inputs).forEach(function(item){
 if (item.getAttribute('placeholder') === 'Наименование' || item.getAttribute('placeholder') === 'название') {
  item.addEventListener('input',()=> {
   item.value = item.value.replace(/[^а-яА-Я-.?!)(,: ёЁ]/,'');
  });
 } else if (item.getAttribute('placeholder') === 'Сумма') {
  item.addEventListener('input',()=> {
   item.value = item.value.replace(/\D/,'');
  });
 }
});