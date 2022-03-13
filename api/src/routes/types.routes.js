//Exporto todas las funcionalidades del controlador del cual se encarga index.
const { Router } = require("express");
const router = Router();
const getAllTypes = require("../controller/types.controller");

router.get("/types", getAllTypes);

module.exports = router;
