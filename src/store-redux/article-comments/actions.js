export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс  и установка признака ожидания загрузки
      dispatch({type: 'article-comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(*,author(profile(name))),count&sort=order&limit=*&skip=0`
        });

        // Комментарии загружены успешно
        dispatch({type: 'article-comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'article-comments/load-error'});
      }
    }
  },
}
