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
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
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

class AppData {
    constructor() {
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
    }
    start () {
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
        leftInputs.forEach((item) => {
            item.disabled = true;
        });
    }
    reset () {
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
            .forEach((item) => {
                item.value = null;
            });
        range.value = 1;
        rangeAmount.textContent = 1;
        buttonCancel.style.display = 'none';
        buttonCalculate.style.display = 'block';
        buttonCalculate.disabled = true;
        const leftInputs = document.querySelectorAll('.data input');
        leftInputs.forEach((item) => {
            item.disabled = false;
        });
    }
    showResult () {
        const _this = this;
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
            incomePeriodValue.value = _this.calcSavedMoney();
        });
    }
    addExpensesBlock () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem
            .childNodes
            .forEach((item) => {
                item.value = '';
            });
        expensesItems[0]
            .parentNode
            .insertBefore(cloneExpensesItem, buttonExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        inputs = document.getElementsByTagName('input');
        this.inputEventListener();
        if (expensesItems.length === 3) {
            buttonExpenses.style.display = 'none';
        }
    }
    resetExpensesBlock () {
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
            for (let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].remove();
            }
        }
        buttonExpenses.style.display = 'block';
    }
    addIncomeBlock () {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem
            .childNodes
            .forEach((item) => {
                item.value = '';
            });
        incomeItems[0]
            .parentNode
            .insertBefore(cloneIncomeItem, buttonIncome);
        incomeItems = document.querySelectorAll('.income-items');
        inputs = document.getElementsByTagName('input');
        this.inputEventListener();
        if (incomeItems.length === 3) {
            buttonIncome.style.display = 'none';
        }
    }
    resetIncomeBlock () {
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length > 1) {
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].remove();
            }
        }
        buttonIncome.style.display = 'block';
    }
    getExpenses () {
        expensesItems.forEach((item) => {
            const itemExpenses = item
                .querySelector('.expenses-title')
                .value;
            const cashExpenses = item
                .querySelector('.expenses-amount')
                .value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }
    getIncome () {
        incomeItems.forEach((item) => {
            const itemIncome = item
                .querySelector('.income-title')
                .value;
            const cashIncome = item
                .querySelector('.income-amount')
                .value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });
    
        for (let key in this.income) {
            this.incomeMonth += + this.income[key];
        }
    }
    getAddExpenses () {
        const addExpenses = additionalExpensesItem
            .value
            .split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this
                    .addExpenses
                    .push(item);
            }
        });
    }
    getAddIncome () {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item
                .value
                .trim();
            if (itemValue !== '') {
                this
                    .addIncome
                    .push(itemValue);
            }
        });
    }
    getExpensesMonth () {
        for (let key in this.expenses) {
            this.expensesMonth += + this.expenses[key];
        }
    }
    getBudget () {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    }
    getInfoDeposit () {
        if (this.deposit) {
            do
            {
                this.percentDeposit = prompt('Какой годовой процент?');
            }
            while (!this.isNumber(this.percentDeposit)) 
            ;
            do
            {
                this.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (!this.isNumber(this.moneyDeposit)) ;
            }
    }
    calcSavedMoney () {
        return this.budgetMonth * range.value;
    }
    inputEventListener () {
        Array
            .from(inputs)
            .forEach((item) => {
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
    isNumber (n) {
        return (!isNaN(parseFloat(n)) && isFinite(n));
    }
    eventListeners () {
        buttonCalculate.disabled = true;
        buttonCalculate.addEventListener('click', this.start.bind(this));
        buttonCancel.addEventListener('click', this.reset.bind(this));
        buttonExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
        buttonIncome.addEventListener('click', this.addIncomeBlock.bind(this));
        salaryAmount.addEventListener('input', function () {
            if (salaryAmount.value.trim() === '') {
                buttonCalculate.disabled = true;
            } else {
                buttonCalculate.disabled = false;
            }
        });
        range.addEventListener('input', function () {
            rangeAmount.textContent = range.value;
        });
        this.inputEventListener();
    }
}

const appData = new AppData();
appData.eventListeners();