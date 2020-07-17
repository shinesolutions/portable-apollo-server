const { RESTDataSource } = require("apollo-datasource-rest");

exports.HelloWorldDataSource = class extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:8882";
  }

  async getMessage() {
    return this.get("/message");
  }
};
