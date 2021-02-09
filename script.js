'use strict';

const buttonCalculate = document.getElementById('start');

const buttonIncome = document.getElementsByTagName('button')[0];
const buttonExpenses = document.getElementsByTagName('button')[1];

const checkBox = document.querySelector('#deposit-check');

const additionalIncome= document.querySelectorAll('.additional_income-item');

const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');


const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const range = document.querySelector('.period-select');



let money;
let isNumber = function(n){
 return (!isNaN(parseFloat(n)) && isFinite(n));
};

let start = function(){
 do{
 money = prompt('Ваш месячный доход?');
 } while(!isNumber(money));

};

//start();

let appData ={
 income: {},
 addIncome: [],
 expenses: {},
 addExpenses: [],
 budgetDay: 0,
 budgetMonth: 0,
 expensesMonth: 0,
 deposit: false,
 percentDeposit: 0,
 moneyDeposit: 0,
 mission: 100000,
 period: 6,
 budget: money,
 asking: function(){
  if (confirm('Есть ли у вас дополнительный источник заработка?')){
   let itemIncome;
   let cashIncome;
   do{
   itemIncome = prompt('Какой у вас дополнительный источник заработка?');
   } while(!isNaN(parseFloat(itemIncome)));
   do{
   cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
  } while(!isNumber(cashIncome));
   appData.income[itemIncome] = cashIncome;
  }

  const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
  appData.addExpenses = addExpenses.toLowerCase().split(', ');
  appData.deposit = confirm('Есть ли у вас депозит в банке?');
  let tmpValue;
  for (let i=0; i<2; i++ ){
   let tmpExpense;
   do{
   tmpExpense = prompt('Введите обязательную статью расходов');
   } while(!isNaN(parseFloat(tmpExpense)));
   do{
    tmpValue = prompt('Во сколько это обойдётся?');
   } while (!isNumber(tmpValue));
   appData.expenses[tmpExpense] = tmpValue;
  }
 },
 getExpensesMonth: function(){
  for (let key in appData.expenses){
   appData.expensesMonth += +appData.expenses[key];
  }
 },
 getBudget: function(){
  appData.budgetMonth = appData.budget - appData.expensesMonth;
  appData.budgetDay = Math.floor(appData.budgetMonth/30);
 },
 getTargetMonth:  function(){
  return Math.ceil(appData.mission/appData.budgetMonth);
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
  return appData.budgetMonth * appData.period;
 }
};

/*appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);
if (appData.getTargetMonth()<0) {
console.log('Цель не будет достигнута');
} else {
console.log(`Цель будет достигнута за ${appData.getTargetMonth()} месяцев(-а)`);
}
console.log(appData.getStatusIncome());

console.log('Наша программа включает:');
for (let key in appData){
 console.log(key + ': ' + appData[key]);
}

function capitalizeFirstLetter(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}
for (let i =0;i<appData.addExpenses.length;i++){
 appData.addExpenses[i] = capitalizeFirstLetter(appData.addExpenses[i]);
}
console.log(appData.addExpenses.join(', '));
*/