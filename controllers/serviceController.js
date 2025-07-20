const { Service, Product, ProductService } = require("../Model");
const findProductsWithCost = require("../utils/findProductsWithCost");
const { sequelize } = require("../Config/dbConfig");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({
      status: "success",
      data: {
        services,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createService = catchAsync(async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { name, duration, type, serviceCode, description, profitMarginPercent, products } = req.body;

    // Validate input
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new AppError("Products array is required and must not be empty", 400);
    }

    const serviceData = { name, duration, type, serviceCode, description, profitMarginPercent };

    // Step 1: Validate and get products
    const consumedProducts = await findProductsWithCost(products, transaction);

    // Step 2: Create Product Cost Map
    const productCostMap = new Map();
    consumedProducts.forEach((product) => {
      if (!product.cost || isNaN(product.cost)) {
        throw new AppError(`Invalid cost for product ID ${product.id}`, 400);
      }
      productCostMap.set(product.id, parseFloat(product.cost));
    });

    // Step 3: Calculate total cost
    let totalCost = 0;
    const productServiceData = [];
    console.log(products);
    for (const consumedProduct of products) {
      console.log(consumedProduct);
      const { id, quantity } = consumedProduct;

      // Validate id and quantity
      if (!id || !productCostMap.has(id)) {
        throw new AppError(`Invalid or missing product ID: ${id}`, 400);
      }
      if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
        throw new AppError(`Invalid quantity for product ID ${id}`, 400);
      }

      const unitCost = productCostMap.get(id);
      const itemTotalCost = parseFloat(quantity) * unitCost;

      if (isNaN(itemTotalCost)) {
        throw new AppError(`Calculation error for product ID ${id}`, 400);
      }

      totalCost += itemTotalCost;

      productServiceData.push({
        productId: id,
        quantity,
        unitCostAtTime: unitCost,
        totalCost: itemTotalCost,
      });
    }

    // Step 4: Calculate final price with margin
    const profitMargin = parseFloat(profitMarginPercent || 20);
    if (isNaN(profitMargin)) {
      throw new AppError("Invalid profit margin percentage", 400);
    }

    const finalPrice = totalCost * (1 + profitMargin / 100);

    // Step 5: Create service
    const service = await Service.create(
      {
        ...serviceData,
        totalCost: parseFloat(totalCost.toFixed(2)),
        profitMarginPercent: profitMargin,
        finalPrice: parseFloat(finalPrice.toFixed(2)),
      },
      { transaction }
    );

    // Step 6: Create product-service relationships
    const productServicesWithServiceId = productServiceData.map((ps) => ({
      ...ps,
      serviceId: service.id,
    }));

    await ProductService.bulkCreate(productServicesWithServiceId, { transaction });

    await transaction.commit();

    res.status(201).json({
      status: "success",
      data: { service },
    });
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
});
module.exports = {
  getAllServices,
  createService,
};
