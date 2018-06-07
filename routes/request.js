const express = require('express');
const router = express.Router();
const axios = require('axios');
const _ = require('lodash');
const queryString = require('query-string');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res) => {
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
      res.json(result);
      break;
    case 'post':
    case 'put':
    case 'delete':
      option.url = req.body.url;
      option.body = req.body;
      result = await axios[req.body.method](option.url, option.body);
      res.json(result);
      break;
  }
});

module.exports = router;
