import { Mongo } from 'meteor/mongo';

export const Instances = new Mongo.Collection('instances');
export const Panels = new Mongo.Collection('panels');
export const Alerts = new Mongo.Collection('alerts');
export const Events = new Mongo.Collection('events');