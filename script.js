const money = 10000;
const income = 'Фриланс';
const addExpenses = 'Такси, одежда, кафе';
const deposit = true;
const mission = 100000;
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

const budgetDay = money / 30;
console.log(budgetDay.toFixed(2));