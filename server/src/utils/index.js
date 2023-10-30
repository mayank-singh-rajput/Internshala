module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    return { message: "Data Not found!" };
  }
};