const { DocumentRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-error");

// All Business logic will be here
class DocumentService {
  constructor() {
    this.repository = new DocumentRepository();
  }

  async CreateFile(userInputs) {
    const { title, content, value1, value2, value3, value4, value5, File } = userInputs;
    try {
      const FileData = await this.repository.CreateFile({ title, content, value1, value2, value3, value4, value5, File });
      return FormateData({ FileData });
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async FindFile(userInputs) {
    const { value1, value2, value3, value4, value5 } = userInputs;
    try {
      const query = {};
  
      if (value1) {
        query.value1 = { $gt: value1 };
      }
  
      if (value2) {
        query.value2 = { $gt: value2 };
      }
  
      if (value3) {
        query.value3 = { $gt: value3 };
      }
  
      if (value4) {
        query.value4 = { $gt: value4 };
      }
  
      if (value5) {
        query.value5 = { $gt: value5 };
      }
  
      // Assuming FindFile is an asynchronous database query function
      const files = await this.repository.FindFile({ query });
  
      if (!files || files.length === 0) {
        return FormateData({ message: "No such files exist" });
      }
  
      return FormateData({ files });
    } catch (error) {
      throw new APIError("Data Not found", error);
    }
  }
  
}

module.exports = DocumentService;
