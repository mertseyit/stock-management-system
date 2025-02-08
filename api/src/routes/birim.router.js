const customError = require('../utils/customError');
const status = require('http-status');
const router = require('express').Router();
const Birim = require('../models/Birim');

router.get('/all', async (req, res, next) => {
  try {
    const allBirim = await Birim.findAll({});
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allBirim
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;
