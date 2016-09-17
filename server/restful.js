import { Picker } from 'meteor/meteorhacks:picker';
import { Instances } from '../imports/api/collections.js';

var bodyParser = Meteor.npmRequire('body-parser');

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({extended: false}));

var postRouters = Picker.filter(function (req, res) {
  return req.method == "POST";
});

postRouters.route('/restful/instance', function (params, req, res, next) {
  res.setHeader('Content-Type','text/plain');
  if (req.body.token) {
    var instance = Instances.findOne({ '_id': req.body.token });
  }
  if (instance) {
    res.end(instance._id);
  } else {
    var instance = Instances.insert({'node': req.body.node, 'os': req.body.os});
    res.end(instance);
  }
});

var putRouters = Picker.filter(function (req, res) {
  return req.method == "PUT";
});

putRouters.route('/restful/instance', function (params, req, res, next) {
  var response;
  var instance = Instances.findOne({'_id': req.body.token});
  if (instance) {
    Instances.update(instance._id, {
      $set: {
        'ip': req.body.ip,
        'updatedAt': req.body.updatedAt,
      },
      $push: {
        cpu_percent: {
          value: req.body.cpu_percent,
          time: req.body.updatedAt
        },
        iowait: {
          value: req.body.iowait,
          time: req.body.updatedAt
        },
        lavg1: {
          value: req.body.lavg1,
          time: req.body.updatedAt
        },
        lavg5: {
          value: req.body.lavg5,
          time: req.body.updatedAt
        },
        lavg15: {
          value: req.body.lavg15,
          time: req.body.updatedAt
        },
        net_speed_r: {
          value: req.body.net_speed_r,
          time: req.body.updatedAt
        },
        net_speed_t: {
          value: req.body.net_speed_t,
          time: req.body.updatedAt
        }
      }
    }, true)
    respone = {
      "error": false,
      "message": "update success."
    }
  } else {
    respone = {
      "error": true,
      "message": "can not find instance."
    }
  }
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(response));
});
