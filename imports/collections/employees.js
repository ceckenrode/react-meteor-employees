import {Mongo} from 'meteor/mongo';
//Creates a new mongo collection called 'employees'
export const Employees = new Mongo.Collection('employees');
