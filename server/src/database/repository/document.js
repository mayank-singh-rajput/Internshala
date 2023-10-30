const { documentModel } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-error");

class DocumentRepository {
  async CreateFile({ title, content, value1, value2, value3, value4, value5, File }) {
    try {
      const existingFile = await documentModel.findOne({ title: title });

      if (existingFile) {
        return null;
      }

      const { path: filePath, mimetype: mimeType, size: fileSize } = File;

      const FileData = new documentModel({
        title: title,
        content: content,
        value1: value1,
        value2: value2,
        value3: value3,
        value4: value4,
        value5: value5,
        File: { filePath, mimeType, fileSize },
      });

      const FileResult = await FileData.save();
      return FileResult;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, error.message);
    }
  }

  async FindFile({ query }) {
    try {
      const files = await documentModel.find(query);
      if (files.length === 0) {
        return null;
      }
  
      const fileData = await Promise.all(
        files.map(async (file) => {
          return {
            _id: file._id,
            title: file.title,
            content: file.content,
            value1: file.value1,
            value2: file.value2,
            value3: file.value3,
            value4: file.value4,
            value5: file.value5,
            File: file.File.filePath,
            createdAt: file.createdAt,
            updatedAt: file.updatedAt,
          };
        })
      );
  
      return fileData;
    } catch (error) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, error.message);
    }
  }
  
}

module.exports = DocumentRepository;
