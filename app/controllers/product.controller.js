const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    return res.status(400).send({
      message: "Product code can not be empty"
    });
  }

  // Create a Product
  const product = new Product({
    code: req.body.code,
    name: req.body.name,
    rent: req.body.rent,
    procurement_cost: req.body.procurement_cost,
    location: req.body.location,
    status: req.body.status,
    category: req.body.category,
    size: req.body.size,
    color: req.body.color
  });

  // Save Product in the database
  product
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.code)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.code
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.code
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with id " + req.params.code
      });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.code) {
    return res.status(400).send({
      message: "Product code can not be empty"
    });
  }

  // Find product and update it with the request body
  Product.findByIdAndUpdate(
    req.params.code,
    {
      name: req.body.name || "Untitled Product",
      rent: req.body.rent
    },
    { new: true }
  )
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.code
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.code
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + req.params.code
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.code)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.code
        });
      }
      res.send({ message: "Product deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.code
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.code
      });
    });
};
