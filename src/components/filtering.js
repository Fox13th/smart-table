import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями

    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {
                            return new Option(name, name);                        // используйте name как значение и текстовое содержимое                            // @todo: создать и вернуть тег опции
                      })
        )
     }) 

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action) {
            if (action.name === 'clear') {
                const fieldName = action.dataset.field;
                const input = action.parentElement.querySelector('.input');
                if (input) {
                    input.value = '';
                }

                console.log(state[fieldName]);
                if (fieldName && state[fieldName] !== undefined) {
                    state[fieldName] = '';
                }
                console.log(state[fieldName]);
            }
        } 
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}