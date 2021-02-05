'use strict';
let money;


let isNumber = function(n){
 return (!isNaN(parseFloat(n)) && isFinite(n));
};

let start = function(){
 do{
 money = prompt('Ваш месячный доход?');
 } while(!isNumber(money));

};

start();

let appData ={
 income: {},
 addIncome: [],
 expenses: {},
 addExpenses: [],
 budgetDay: 0,
 budgetMonth: 0,
 expensesMonth: 0,
 deposit: false,
 mission: 100000,
 period: 6,
 budget: money,
 asking: function(){
  const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
  appData.addExpenses = addExpenses.toLowerCase().split(', ');
  const deposit = confirm('Есть ли у вас депозит в банке?');
  let tmpValue;
  for (let i=0; i<2; i++ ){
   let tmpExpense = prompt('Введите обязательную статью расходов');
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
  appData.period = Math.ceil(appData.mission/appData.budgetMonth);
 },
 getStatusIncome: function(){
  if (appData.budgetDay >= 1200) { return ('У вас высокий уровень дохода');
  } else if (appData.budgetDay >=600) {return ('У вас средний уровень дохода');
  } else if (appData.budgetDay>=0 && appData.budgetDay<600) {return ('К сожалению у вас уровень дохода ниже среднего');
  } else {return ('Что то пошло не так');}
 },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);
if (appData.period<0) {
console.log('Цель не будет достигнута');
} else {
console.log(`Цель будет достигнута за ${appData.period} месяцев(-а)`);
}
console.log(appData.getStatusIncome());
