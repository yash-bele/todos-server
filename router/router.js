const express = require('express');
const {
  getDataUp,
  postDatumUp,
  postDatumIn,
  getDatumOn,
  patchDatumOn,
} = require('../controller/controller');

const router = express.Router();
router.route('/signup').post(postDatumUp).get(getDataUp);
router.route('/signin').post(postDatumIn);
router.route('/signon/:id').get(getDatumOn).patch(patchDatumOn);

module.exports = router;
