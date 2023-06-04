import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class AuthenticationState extends StoreModule {
  initState() {
    return {
      user: {},
      token: "",
      waiting: false,
      isAuth: false,
      errorMessage: "",
    };
  }

  /**
      аутентификация
   */

  async signIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const res = await fetch("/api/v1/users/sign?fields=profile(name)", {
        method: "POST",
        body: JSON.stringify({
          login: login,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!data.error) {
        localStorage.setItem("token", data.result.token);

        this.setState({
          user: data.result.user,
          token: data.result.token,
          errorMessage: "",
          waiting: false,
          isAuth: true,
        });
      } else {
        throw new Error(
          `Ошибка аутентификации: ${data.error.data.issues[0].message}`
        );
      }
    } catch (e) {
      console.error(e);
      this.setState({
        ...this.getState(),
        errorMessage: e.message,
        waiting: false,
        isAuth: false,
      });
    }
  }

  clearErrorMessage() {
    this.setState({
      ...this.getState(),
      errorMessage: ""
    });
  }

}

export default AuthenticationState;
