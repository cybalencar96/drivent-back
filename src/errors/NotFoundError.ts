export default class NotFoundError extends Error {
  constructor() {
    super("Nenhum resultado para esta pesquisa!");

    this.name = "NotFoundError";
  }
}
