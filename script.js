'use strict';
const money = +prompt('Ваш месячный доход?');
const income = 'Фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = +prompt('Во сколько это обойдётся?');
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = +prompt('Во сколько это обойдётся?');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 200000;
const period = 12;

// alert('Good day!');
// console.log('Hello world!');

let showTypeOf = function(data){
 console.log(data, typeof data);
};

const getExpensesMonth = function(arg1, arg2){
 return arg1 + arg2;
};

const getAccumulatedMonth = function(income, expenses){
 return (income - expenses(amount1, amount2));
};

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth);

const getTargetMonth = function(){
 return Math.ceil(mission/accumulatedMonth);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));

console.log(addExpenses.toLowerCase().split(', '));

console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев(-а)`);

const budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

const getStatusIncome = function(){
 if (budgetDay >= 1200) { return ('У вас высокий уровень дохода');
 } else if (budgetDay >=600) {return ('У вас средний уровень дохода');
 } else if (budgetDay>=0 && budgetDay<600) {return ('К сожалению у вас уровень дохода ниже среднего');
 } else {return ('Что то пошло не так');}
};

console.log(getStatusIncome());