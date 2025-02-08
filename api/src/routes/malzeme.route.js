const router = require('express').Router();
const Malzeme = require('../models/Malzeme');
const status = require('http-status');
const customError = require('../utils/customError');
const Tedarikci = require('../models/Tedarikci');
const Birim = require('../models/Birim');

router.get('/all', async (req, res, next) => {
  try {
    const allMalzeme = await Malzeme.findAll({
      include: [
        {
          model: Birim,
          as: 'birim',
          attributes: ['id', 'birim_turu']
        }
      ]
    });
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allMalzeme
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { malzeme_adi, stok_seviyesi, kritik_stok_seviyesi, birim_id } =
      req.body;

    const isExistMalzeme = await Malzeme.findOne({
      where: { malzeme_adi: malzeme_adi }
    });

    if (isExistMalzeme) {
      await Malzeme.update(
        {
          stok_seviyesi: isExistMalzeme.dataValues.stok_seviyesi + stok_seviyesi
        },
        { where: { malzeme_adi: malzeme_adi } }
      );
      res.status(status.OK).json({
        msg: 'Var Olan Malzeme Güncellendi',
        status: status.OK,
        data: null
      });
    } else {
      await Malzeme.create({
        malzeme_adi: malzeme_adi,
        stok_seviyesi: stok_seviyesi,
        kritik_stok_seviyesi: kritik_stok_seviyesi,
        birim_id: birim_id
      });
      res.status(status.CREATED).json({
        msg: 'Malzeme oluşturuldu',
        status: status.CREATED,
        data: null
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

router.put('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { malzeme_adi, stok_seviyesi, kritik_stok_seviyesi, birim_id } =
      req.body;

    const isExistMalzeme = await Malzeme.findOne({ where: { id: id } });
    if (isExistMalzeme) {
      await Malzeme.update(
        {
          malzeme_adi: malzeme_adi,
          stok_seviyesi: stok_seviyesi,
          kritik_stok_seviyesi: kritik_stok_seviyesi,
          birim_id: birim_id
        },
        { where: { id: id } }
      );
    } else {
      return next(customError('Malzeme bulunamadı', status.NOT_FOUND));
    }

    res.status(status.OK).json({
      msg: 'Malzeme güncellendi',
      status: status.OK,
      data: null
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await Malzeme.destroy({ where: { id: id } });

    res.status(status.OK).json({
      msg: 'Malzeme silindi',
      status: status.OK,
      data: null
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;
