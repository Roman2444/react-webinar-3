// Начальное состояние
const initialState = {
  data: [],
  count: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article-comments/load-start":
      return { ...state, data: [], waiting: true};

    case "article-comments/load-success":
      return { ...state, data: action.payload.data.items, count: action.payload.data.count,  waiting: false};
 
    case "article-comments/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
