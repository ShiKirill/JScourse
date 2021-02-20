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
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const range = document.querySelector('.period-select');
const rangeAmount = document.querySelector('.period-amount');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const rightInputs = document.querySelectorAll('.result input');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
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
    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudget();

        this.showResult();
        this.uploadStorage();

        buttonCalculate.style.display = 'none';
        buttonCancel.style.display = 'block';
        this.disableLeftPart();
    }
    reset() {
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
        checkBox.checked = false;
        this.depositHandler();
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
        this.removeStorage();
        const leftInputs = document.querySelectorAll('.data input');
        leftInputs.forEach((item) => {
            item.disabled = false;
        });
    }
    disableLeftPart(){
        const leftInputs = document.querySelectorAll('.data input');
        leftInputs.forEach((item) => {
            item.disabled = true;
        });
    }
    showResult() {
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
    resetExpensesBlock() {
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
            for (let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].remove();
            }
        }
        buttonExpenses.style.display = 'block';
    }
    addBlock(type) {
        const cloneItem = type[0].cloneNode(true);
        const nameStr = cloneItem
            .className
            .split('-')[0];
        const btn = document.querySelector(`.${nameStr}_add`);
        cloneItem
            .childNodes
            .forEach((item) => {
                item.value = '';
            });
        type[0]
            .parentNode
            .insertBefore(cloneItem, btn);
        type = document.querySelectorAll(`.${nameStr}-items`);
        inputs = document.getElementsByTagName('input');
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        this.inputEventListener();
        if (type.length === 3) {
            btn.style.display = 'none';
        }
    }
    resetIncomeBlock() {
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length > 1) {
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].remove();
            }
        }
        buttonIncome.style.display = 'block';
    }
    getExpInc() {
        const count = item => {
            const startStr = item
                .className
                .split('-')[0];
            const itemTitle = item
                .querySelector(`.${startStr}-title`)
                .value;
            const itemAmount = item
                .querySelector(`.${startStr}-amount`)
                .value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += + this.income[key];
        }
    }
    getAddExpInc() {
        const addExpenses = additionalExpensesItem
            .value
            .split(',');
        const addItem = item => {
            if (item.value === undefined) {
                item = item.trim();
                if (item !== '') {
                    this
                        .addExpenses
                        .push(item);
                }
            } else {
                let itemValue = item
                    .value
                    .trim();
                if (itemValue !== '') {
                    this
                        .addIncome
                        .push(itemValue);
                }
            }
        };
        addExpenses.forEach(addItem);
        additionalIncomeItem.forEach(addItem);
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += + this.expenses[key];
        }
    }
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome() {
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
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    changePercent() {
        const selectValue = this.value;
        if (selectValue === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', () => {
                console.log(+ depositPercent.value);
                console.log(typeof + depositPercent.value);
                if (depositPercent.value <= 100 && depositPercent.value >= 0) {
                    if (salaryAmount !== '') {
                        buttonCalculate.disabled = false;
                    }
                } else {
                    alert('Введите корректное значение в поле проценты!');
                    depositPercent.value = '';
                    buttonCalculate.disabled = true;
                }
            });
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = selectValue;
        }
    }
    depositHandler() {
        if (checkBox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    calcSavedMoney() {
        return this.budgetMonth * range.value;
    }
    inputEventListener() {
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
    isNumber(n) {
        return (!isNaN(parseFloat(n)) && isFinite(n));
    }
    eventListeners() {
        buttonCalculate.disabled = true;
        document.addEventListener('DOMContentLoaded', this.downloadStorage.bind(this));
        buttonCalculate.addEventListener('click', this.start.bind(this));
        buttonCancel.addEventListener('click', this.reset.bind(this));
        buttonExpenses.addEventListener('click', event => {
            this.addBlock(expensesItems);
        });
        buttonIncome.addEventListener('click', event => {
            this.addBlock(incomeItems);
        });
        salaryAmount.addEventListener('input', function () {
            if (salaryAmount.value.trim() === '') {
                buttonCalculate.disabled = true;
            } else {
                if (checkBox.checked) {
                    if (depositPercent.value !== '') {
                        buttonCalculate.disabled = false;
                    } else {
                        buttonCalculate.disabled = true;
                    }
                } else {
                    buttonCalculate.disabled = false;
                }

            }
        });
        range.addEventListener('input', function () {
            rangeAmount.textContent = range.value;
        });
        checkBox.addEventListener('change', this.depositHandler.bind(this));
        this.inputEventListener();
    }
    uploadStorage() {
        const inputsValues = [];
        rightInputs.forEach(item => {
            document.cookie = `${item.className.split(' ')[1]} = ${item.value}; max-age=3600`;
            inputsValues.push(item.value);
        });
        const json = JSON.stringify(inputsValues);
        localStorage.rightInputsValues = json;
        document.cookie = 'isLoad=true;max-age=3600';
    }
    downloadStorage() {
        if (this.getCookie('isLoad') === undefined) {
            this.removeStorage();
            return;
        } else {
        rightInputs.forEach(item => {
            if (this.getCookie(item.className.split(' ')[1]) === undefined) {
                this.removeStorage();
                return;
            }
        });
        this.disableLeftPart();
        buttonCalculate.style.display = 'none';
        buttonCancel.style.display = 'block';
        const arr = JSON.parse(localStorage.rightInputsValues);
        for (let i =0; i< arr.length; i++) {
            rightInputs[i].value = arr[i]; 
        }
    }
    }
    getCookie(name) {
        let matches = document
            .cookie
            .match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    removeStorage() {
        rightInputs.forEach(item => {
            document.cookie = `${item.className.split(' ')[1]} = ''; max-age=-1`;
            document.cookie = `isLoad=false;max-age=-1`;
        });
        localStorage.removeItem('rightInputsValues');
    }
}

const appData = new AppData();
appData.eventListeners();
