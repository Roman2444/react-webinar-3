/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

// добавляет "-" в зависимости от количества родителей
export function modifyCategoryItems(items) {
  // Создаем новый массив для измененных объектов
  const newItems = [];

  // Проходим по каждому элементу в исходном массиве items
  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i];
    
    // Проверяем есть ли у элемента родитель
    if (currentItem.parent && currentItem.parent._id) {
      let parentCount = 1;
      let currentParentID = currentItem.parent._id;

      // Ищем всех предков до корневого
      while (currentParentID) {
        const parentItem = items.find(item => item._id === currentParentID);

        if (parentItem && parentItem.parent && parentItem.parent._id) {
          parentCount++;
          currentParentID = parentItem.parent._id;
        } else {
          currentParentID = null;
        }
      }

      // Добавляем знак "-" для каждого родительского уровня
      currentItem.title = "-".repeat(parentCount) + " " + currentItem.title;
    }

    // Добавляем измененный элемент в новый массив
    newItems.push(currentItem);
  }

  return newItems;
}