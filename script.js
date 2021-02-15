'use strict';

const buttonCalculate = document.getElementById('start');
const buttonCancel = document.getElementById('cancel');

const buttonIncome = document.getElementsByTagName('button')[0];
const buttonExpenses = document.getElementsByTagName('button')[1];

const checkBox = document.querySelector('#deposit-check');

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

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

let inputs = document.getElementsByTagName('input');

function inputEventListener() {
    Array
        .from(inputs)
        .forEach(function (item) {
            if (item.getAttribute('placeholder') === 'Наименование' || item.getAttribute('placeholder') === 'название') {
                item.addEventListener('input', () => {
                    item.value = item
                        .value
                        .replace(/[^а-яА-Я-.?!)(,: ёЁ]/, '');
                });
            } else if (item.getAttribute('placeholder') === 'Сумма') {
                item.addEventListener('input', () => {
                    item.value = item
                        .value
                        .replace(/\D/, '');
                });
            }
        });
}

let isNumber = function (n) {
    return (!isNaN(parseFloat(n)) && isFinite(n));
};
buttonCalculate.disabled = true;

let appData = {
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
    start: function () {

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        buttonCalculate.style.display = 'none';
        buttonCancel.style.display = 'block';
        const leftInputs = document.querySelectorAll('.data input');
        leftInputs.forEach(function (item) {
            item.disabled = true;
        });
    },
    reset: function () {
        this.resetExpensesBlock();
        this.resetIncomeBlock();
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        inputs = document.getElementsByTagName('input');
        Array
            .from(inputs)
            .forEach(function (item) {
                item.value = null;
            });
        range.value = 1;
        rangeAmount.textContent = 1;
        buttonCancel.style.display = 'none';
        buttonCalculate.style.display = 'block';
        buttonCalculate.disabled = true;
        const leftInputs = document.querySelectorAll('.data input');
        leftInputs.forEach(function (item) {
            item.disabled = false;
        });
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this
            .addExpenses
            .join(', ');
        additionalIncomeValue.value = this
            .addIncome
            .join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        range.addEventListener('input', function () {
            incomePeriodValue.value = this.calcSavedMoney();
        }.bind(appData));
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem
            .childNodes
            .forEach(function (item) {
                item.value = '';
            });
        expensesItems[0]
            .parentNode
            .insertBefore(cloneExpensesItem, buttonExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        inputs = document.getElementsByTagName('input');
        inputEventListener();
        if (expensesItems.length === 3) {
            buttonExpenses.style.display = 'none';
        }
    },
    resetExpensesBlock: function () {
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
            for (let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].remove();
            }
        }
        buttonExpenses.style.display = 'block';
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem
            .childNodes
            .forEach(function (item) {
                item.value = '';
            });
        incomeItems[0]
            .parentNode
            .insertBefore(cloneIncomeItem, buttonIncome);
        incomeItems = document.querySelectorAll('.income-items');
        inputs = document.getElementsByTagName('input');
        inputEventListener();
        if (incomeItems.length === 3) {
            buttonIncome.style.display = 'none';
        }
    },
    resetIncomeBlock: function () {
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length > 1) {
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].remove();
            }
        }
        buttonIncome.style.display = 'block';
    },
    getExpenses: function () {
        expensesItems
            .forEach(function (item) {
                let itemExpenses = item
                    .querySelector('.expenses-title')
                    .value;
                let cashExpenses = item
                    .querySelector('.expenses-amount')
                    .value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    this.expenses[itemExpenses] = +cashExpenses;
                }
            }.bind(appData));
    },
    getIncome: function () {
        incomeItems
            .forEach(function (item) {
                let itemIncome = item
                    .querySelector('.income-title')
                    .value;
                let cashIncome = item
                    .querySelector('.income-amount')
                    .value;
                if (itemIncome !== '' && cashIncome !== '') {
                    this.income[itemIncome] = +cashIncome;
                }
            }.bind(appData));

        for (let key in this.income) {
            this.incomeMonth += + this.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem
            .value
            .split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this
                    .addExpenses
                    .push(item);
            }
        }.bind(appData));
    },
    getAddIncome: function () {
        additionalIncomeItem
            .forEach(function (item) {
                let itemValue = item
                    .value
                    .trim();
                if (itemValue !== '') {
                    this
                        .addIncome
                        .push(itemValue);
                }
            }.bind(appData));
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += + this.expenses[key];
        }
    },
    getBudget: function () {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            do
            {
                this.percentDeposit = prompt('Какой годовой процент?');
            }
            while (!isNumber(this.percentDeposit)) 
            ;
            do
            {
                this.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (!isNumber(this.moneyDeposit)) ;
            }
        },
    calcSavedMoney: function () {
        return this.budgetMonth * range.value;
    }
};

salaryAmount.addEventListener('input', function () {
    if (salaryAmount.value.trim() === '') {
        buttonCalculate.disabled = true;
    } else {
        buttonCalculate.disabled = false;
    }
});

buttonCalculate.addEventListener('click', appData.start.bind(appData));
buttonCancel.addEventListener('click', appData.reset.bind(appData));
buttonExpenses.addEventListener('click', appData.addExpensesBlock);
buttonIncome.addEventListener('click', appData.addIncomeBlock);

range.addEventListener('input', function () {
    rangeAmount.textContent = range.value;
});

inputEventListener();
