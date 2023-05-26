import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      good: {},
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       good: json.result,
    }, 'Загружен товар из АПИ');
  }
}

export default Article;
