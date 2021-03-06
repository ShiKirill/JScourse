const filterByType = (type, ...values) => values.filter(value => typeof value === type), // ОбЪявление функции, которая принимает ТИП переменной и принимает значения, превращаемые в массив, которые будут сравниваться с переданным типом, отфильтровываться и возвращаться.
	hideAllResponseBlocks = () => { 
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // ищет блоки с классом dialog__response-block, превращает этот псевдо-массив в массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); //  к каждому полученному блоку массива присваивает значение дисплея none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //
		hideAllResponseBlocks(); // Вызов функции чтобы спрятать блоки
		document.querySelector(blockSelector).style.display = 'block'; // ищет блоки с переданным селектором и присваивает display = block
		if (spanSelector) { // условие проверки есть ли второй переданный селектор
			document.querySelector(spanSelector).textContent = msgText; // если есть, вставляет переданный текст
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // Объявление функции, которая принимает текст, который хотим передать пользователю, вызывает функцию showResponseBlock и передаёт туда msgText

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // Объявление функции, которая принимает текст, который хотим передать пользователю, вызывает функцию showResponseBlock и передаёт туда msgText

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // Объявление функции, которая вызывает функцию showResponseBlock, которая делает видимым блок.

	tryFilterByType = (type, values) => {
		try { // Вызываем блок try
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // Объявление переменной, которое складывается из вызова функции filterByType, полученный массив раскладывается в строку
			const alertMsg = (valuesArray.length) ? 
				`Данные с типом ${type}: ${valuesArray}` :  
				`Отсутствуют данные типа ${type}`; 
				//обЪявляем переменную, которая будет принимать значение в зависимости от условия
				// Если длина valuesArray ненулевая, принимает это значение
				// Если длина valuesArray нулевая, принимает это значение
			showResults(alertMsg); // Показываем результат
		} catch (e) {  // Отлавливаем ошибку
			showError(`Ошибка: ${e}`); // Выводим ошибку
		}
	};

const filterButton = document.querySelector('#filter-btn'); // Находим в документе кнопку по id

filterButton.addEventListener('click', e => { // добавляем слушатель событий на клик
	const typeInput = document.querySelector('#type'); // ищем элемент с id = type
	const dataInput = document.querySelector('#data'); // ищем элемент с id = data

	if (dataInput.value === '') { // если значение пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //  устанавливает передаваемое сообщение для  выбранного элемента
		showNoResults(); // вызывает функцию showNoResults
	} else { //
		dataInput.setCustomValidity(''); // устанавливает пустое сообщение
		e.preventDefault(); // предотвращает дефолтное поведение события
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызывает функцию tryFilterByType
	}
});

