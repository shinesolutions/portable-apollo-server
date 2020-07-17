const { RESTDataSource } = require("apollo-datasource-rest");

exports.HelloWorldDataSource = class extends RESTDataSource {
  constructor(baseUrl) {
    super();
    this.baseURL = baseUrl;
  }

  async getMessage() {
    return this.get("/message");
  }
};
