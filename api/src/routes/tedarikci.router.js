const customError = require('../utils/customError');
const status = require('http-status');
const router = require('express').Router();
const Tedarikci = require('../models/Tedarikci');

router.get('/all', async (req, res, next) => {
  try {
    const allTedarikci = await Tedarikci.findAll({});
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allTedarikci
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;
