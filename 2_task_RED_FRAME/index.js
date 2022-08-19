var formElement = document.forms['formElement'];

// ЗДЕСЬ ВАРИАНТ ИЗ ЗАДАНИЯ
//
// formElement.onfocus = function(evt) {
//     var activeElement = formElement.querySelector('.focused');
// 	if (activeElement) {
// 	    activeElement.classList.remove('focused');
//     }
//     evt.target.classList.add('focused');
// };
//
// formElement.onblur = function(evt) {
// 	var activeElement = formElement.querySelector('.focused');
//     if (activeElement) {
//      	activeElement.classList.remove('focused');   
//     }
// };
//
// ЗДЕСЬ ВАРИАНТ ИЗ ЗАДАНИЯ


// НИЖЕ - мой вариант

formElement.addEventListener('focus', (evt) => {
    var activeElement = formElement.querySelector('.focused');
    if (activeElement) {
        activeElement.classList.remove('focused');
    }
    evt.target.classList.add('focused');
}, true)

formElement.addEventListener('blur', (evt) => {
    var activeElement = formElement.querySelector('.focused');
    if (activeElement) {
        activeElement.classList.remove('focused');   
    }
}, true)
