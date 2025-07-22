const { where } = require("sequelize");
const appError = require("../utils/appError");
const { Company, Branch } = require("../Model");
const { uploadFilesLocally } = require("../middlewares/fileUpload");

// حقول الملفات في موديل Company
const companyFileFields = [
  "commercialRegistrationNumberAttachment",
  "taxRegistrationNumberAttachment",
  "licenceAttachment",
  "qualityCertificateAttachment",
  "logoAttachment",
  "buildingsAttachment",
  "anotherAttachments",
  "symbol",
];

// إنشاء شركة جديدة
exports.createCompany = async (req, res, next) => {
  try {
    // استخدام Middleware لرفع الملفات تم تهيئته في الـ router
    // معالجة الملفات المرفوعة محليًا
    const uploadedFiles = await uploadFilesLocally(req.files, companyFileFields);

    // إعداد البيانات مع مسارات الملفات
    const companyData = { ...req.body };
    uploadedFiles.forEach((file) => {
      companyData[file.fieldName] = file.link;
    });

    // إنشاء الشركة
    const company = await Company.create(companyData);
    if (!company) throw new appError("الشركة موجودة بالفعل", 400);

    res.status(201).json({
      status: "success",
      data: company,
    });
  } catch (err) {
    next(err);
  }
};

// جلب كل الشركات
exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json({
      status: "success",
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

// جلب شركة بـ ID
exports.getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      throw new appError("الشركة غير موجودة", 404);
    }
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// تحديث شركة
exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      throw new appError("الشركة غير موجودة", 404);
    }

    // معالجة الملفات المرفوعة محليًا إذا وُجدت
    const uploadedFiles = await uploadFilesLocally(req.files, companyFileFields);

    // تحديث البيانات مع مسارات الملفات الجديدة
    const updateData = { ...req.body };
    uploadedFiles.forEach((file) => {
      updateData[file.fieldName] = file.link;
    });

    // تحديث الشركة
    await company.update(updateData);

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// حذف شركة
exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      throw new appError("الشركة غير موجودة", 404);
    }

    await company.destroy();

    res.status(200).json({
      success: true,
      message: "تم حذف الشركة بنجاح",
    });
  } catch (error) {
    next(error);
  }
};
const branchFileFields = ["icon"];

// إنشاء فرع جديد
exports.createBranch = async (req, res, next) => {
  try {
    const companyId = req.params.id;

    // معالجة ملف الأيقونة المرفوع محليًا إذا وُجد
    const uploadedFiles = await uploadFilesLocally(req.files, branchFileFields);

    // إعداد بيانات الفرع
    const branchData = {
      companyId,
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      zone: req.body.zone || null,
      isActive: req.body.isActive === "true" || req.body.isActive === true,
    };

    // إضافة مسار الأيقونة إذا تم رفعها
    if (uploadedFiles.length > 0) {
      branchData.icon = uploadedFiles[0].link;
    }

    // التحقق من وجود الشركة
    const company = await Company.findByPk(companyId);
    if (!company) throw new appError("الشركة غير موجودة", 404);

    // إنشاء الفرع
    const branch = await Branch.create(branchData);

    res.status(201).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

// جلب فروع الشركة
exports.getCompanyBranches = async (req, res, next) => {
  try {
    const branches = await Branch.findAll({ where: { companyId: req.params.id } });
    res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    next(error);
  }
};
