import _ from 'lodash';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  //if we dont have records, we fake them
  const numberRecords = Employees.find({}).count();

  if (!numberRecords) {
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();
      Employees.insert({name, email, phone, avatar: image.avatar()});
    });
  }

  //We publish our collection
  Meteor.publish('employees', (per_page) => {
    return Employees.find({}, {limit: per_page});
  });
});
