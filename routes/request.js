const express = require('express');
const router = express.Router();
const axios = require('axios');
const _ = require('lodash');
const queryString = require('query-string');
const rp = require('request-promise');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res) => {
  console.log('on post', req.body);
  try {
    const option = {};
    let result;
    switch (req.body.method) {
      case 'get':
        const q = req.body.query;
        if (!_.isNil(q)) {
          option.url = req.body.url + '?' + queryString.stringify(req.body.query);
        } else {
          option.url = req.body.url;
        }
        result = await axios[req.body.method](option.url);
        res.json({
          status: result.status,
          headers: result.headers,
          data: result.data,
        });
        break;
      case 'post':
      case 'put':
      case 'delete':
        option.url = req.body.url;
        option.body = req.body.body;
        result = await axios[req.body.method](option.url, option.body);
        res.json({
          status: result.status,
          headers: result.headers,
          data: result.data,
        });
        break;
    }
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
