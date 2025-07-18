const { Service, Product, ProductService } = require("../Model");
const { findProductsWithCost } = require("../utils/findProductsWithCost");
const catchAsync = require("../utils/catchAsync");
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
  const { name, duration, type, serviceCode, description, profitMarginPercent, products } = req.body;

  const serviceData = { name, duration, type, serviceCode, description, profitMarginPercent };
  // TODO 1. Validate and get products

  const consumedProducts = await findProductsWithCost(products);

  // TODO 2. Create Product Cost Map

  const productCostMap = new Map();
  consumedProducts.forEach((product) => {
    productCostMap.set(product.id, product.cost);
  });

  // TODO 3. Calculate total cost
  let totalCost = 0;
  const productServiceData = [];

  for (const consumedProduct of products) {
    const { productId, quantity } = consumedProduct;
    const unitCost = productCostMap.get(productId);
    const itemTotalCost = parseFloat(quantity) * parseFloat(unitCost);

    totalCost += itemTotalCost;

    productServiceData.push({
      productId,
      quantity,
      unitCostAtTime: unitCost,
      totalCost: itemTotalCost,
    });
  }

  // TODO 4. Calculate final price with margin
  const profitMargin = parseFloat(serviceData.profitMarginPercent || 20);
  const finalPrice = totalCost * (1 + profitMargin / 100);

  // TODO 5. Create service
  const service = await Service.create(
    {
      ...serviceData,
      totalCost: totalCost.toFixed(2),
      profitMarginPercent: profitMargin,
      finalPrice: finalPrice.toFixed(2),
    },
    { transaction }
  );

  // TODO 6. Create product-service relationships
  const productServicesWithServiceId = productServiceData.map((ps) => ({
    ...ps,
    serviceId: service.id,
  }));

  await ProductService.bulkCreate(productServicesWithServiceId, { transaction });

  await transaction.commit();

  res.status(201).json({
    status: "success",
    data: {
      service,
    },
  });
});

module.exports = {
  getAllServices,
  createService,
};
