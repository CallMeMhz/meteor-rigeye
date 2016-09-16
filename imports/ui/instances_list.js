import { Template } from 'meteor/templating';

import { Instances } from '../api/collections.js';

import './instances_list.html';
import './instances_list_item.html';

Template.instancesList.helpers({
  instances() {
    instances = Instances.find({});
    return {'items': instances, 'count': instances.count()};
  },
});

Template.instancesListItem.helpers({
  isWorking(status) {
    return status == 'MONITORING';
  },
  getLatestData(data) {
    if (data) {
      return data[data.length-1].value;
    }
  },
});
