module.exports = app => {
  const product = require("../controllers/product.controller.js");

  // Create a new Med
  app.post("/products", product.create);

  // Retrieve all Meds
  app.get("/products", product.findAll);

  // Retrieve a single Med with medId
  app.get("/products/:code", product.findOne);

  // Update a Med with medId
  app.put("/products/:code", product.update);

  // Delete a Med with medId
  app.delete("/products/:code", product.delete);
};
