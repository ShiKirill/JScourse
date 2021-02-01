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

console.log('Money: ', typeof money);
console.log('Income: ', typeof income);
console.log('Deposit: ',typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

console.log(addExpenses.toLowerCase().split(', '));

const budgetMonth = money - amount1 -  amount2;
console.log('Бюджет на месяц: ', budgetMonth);

console.log(`Цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев(-а)`);

const budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

if (budgetDay >= 1200) console.log('У вас высокий уровень дохода');
else if (budgetDay >=600) console.log('У вас средний уровень дохода');
else if (budgetDay>=0 && budgetDay<600) console.log('К сожалению у вас уровень дохода ниже среднего');
else console.log('Что то пошло не так');