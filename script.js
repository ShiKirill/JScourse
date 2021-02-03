'use strict';
let money;
const income = 'Фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 200000;
const period = 12;

let isNumber = function(n){
 return (!isNaN(parseFloat(n)) && isFinite(n));
};

let start = function(){
 do{
 money = prompt('Ваш месячный доход?');
 console.log(!isNumber(money));
 } while(!isNumber(money));

};

start();

let showTypeOf = function(data){
 console.log(data, typeof data);
};

let expenses = [];

const getExpensesMonth = function(){
 let sum = 0;
 let tmp;
 for (let i=0; i<2; i++ ){
  expenses[i] = prompt('Введите обязательную статью расходов');
  do{
   tmp = prompt('Во сколько это обойдётся?');
  } while (!isNumber(tmp));
  sum += +tmp;
 }

 return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function(income, expenses){
 return (income - expenses);
};

const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

const getTargetMonth = function(){
 return Math.ceil(mission/accumulatedMonth);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц: ', expensesAmount);

console.log(addExpenses.toLowerCase().split(', '));
if (getTargetMonth()<0){
 console.log('Цель не будет достигнута');
} else{
 console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев(-а)`);
}

const budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

const getStatusIncome = function(){
 if (budgetDay >= 1200) { return ('У вас высокий уровень дохода');
 } else if (budgetDay >=600) {return ('У вас средний уровень дохода');
 } else if (budgetDay>=0 && budgetDay<600) {return ('К сожалению у вас уровень дохода ниже среднего');
 } else {return ('Что то пошло не так');}
};

console.log(getStatusIncome());