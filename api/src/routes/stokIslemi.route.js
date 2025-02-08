const customError = require('../utils/customError');
const status = require('http-status');
const router = require('express').Router();
const StokIslemi = require('../models/StokIslemi');
const Malzeme = require('../models/Malzeme');
const Birim = require('../models/Birim');
const Tedarikci = require('../models/Tedarikci');

router.get('/all', async (req, res, next) => {
  try {
    const allStokIslemi = await StokIslemi.findAll({
      include: [
        {
          model: Malzeme,
          as: 'malzeme',
          attributes: ['id', 'malzeme_adi']
        },
        {
          model: Birim,
          as: 'birim',
          attributes: ['id', 'birim_turu']
        },
        {
          model: Tedarikci,
          as: 'tedarikci',
          attributes: ['id', 'tedarikci_adi']
        }
      ],
      attributes: {
        exclude: ['malzeme_id', 'birim_id', 'tedarikci_id', 'createdat']
      }
    });

    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allStokIslemi
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { malzeme_id, stok_miktari, islem_turu, birim_id, tedarikci_id } =
      req.body;

    const isExistMalzeme = await Malzeme.findOne({
      where: { id: malzeme_id }
    });

    if (isExistMalzeme) {
      if (
        isExistMalzeme.dataValues.stok_seviyesi < stok_miktari &&
        islem_turu === 1
      ) {
        res.status(status.BAD_REQUEST).json({
          msg: 'Stok miktarı yetersiz',
          status: status.BAD_REQUEST,
          data: null
        });
      } else {
        await StokIslemi.create({
          malzeme_id: malzeme_id,
          stok_miktari: stok_miktari,
          islem_turu: islem_turu,
          birim_id: birim_id,
          tedarikci_id: tedarikci_id
        });

        await Malzeme.update(
          {
            stok_seviyesi:
              islem_turu === 0
                ? Number(isExistMalzeme.dataValues.stok_seviyesi) +
                  Number(stok_miktari)
                : Number(isExistMalzeme.dataValues.stok_seviyesi) -
                  Number(stok_miktari)
          },
          { where: { id: malzeme_id } }
        );

        res.status(status.CREATED).json({
          msg: 'Stok İşlemi oluşturuldu',
          status: status.CREATED,
          data: null
        });
      }
    } else {
      res.status(status.NOT_FOUND).json({
        msg: 'Malzeme Bulunamadı',
        status: status.NOT_FOUND,
        data: null
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;
