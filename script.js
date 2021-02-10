"use strict";

const advertisment = document.querySelector('.adv');
const bookCollection = document.querySelectorAll('.book');
const book3Title = bookCollection[4].querySelector('a');
const book2Chapters = bookCollection[0].querySelectorAll('li');
const book5Chapters = bookCollection[5].querySelectorAll('li');
const book6Chapters = bookCollection[2].querySelectorAll('li');


bookCollection[0].before(bookCollection[1]);
bookCollection[4].after(bookCollection[3]);
bookCollection[5].after(bookCollection[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

book3Title.textContent = 'Книга 3. this и Прототипы Объектов';

advertisment.remove();

book2Chapters[3].after(book2Chapters[6]);
book2Chapters[6].after(book2Chapters[8]);
book2Chapters[9].after(book2Chapters[2]);
book5Chapters[3].before(book5Chapters[9]);
book5Chapters[5].before(book5Chapters[2]);
book5Chapters[8].before(book5Chapters[5]);

const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6 и поставить её в правильное место';
//bookCollection[2].append(newChapter);
book6Chapters[8].after(newChapter);