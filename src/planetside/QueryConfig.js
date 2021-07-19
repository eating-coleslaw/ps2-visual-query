const CensusQuery = require('dbgcensus').Query;

class QueryConfig {
  serviceKey = 'example';
  namespace = 'ps2:v2';
  collection = null;
  language = null;
  conditions = [];
  limit = null;
  start = null;
  show = [];
  hide = [];
  resolves = [];
  joins = [];
  trees = [];
  lang = null;

  constructor(collection = null) {
    this.collection = collection;
  }

  addCondition(condition) {
    this.conditions.push(condition);
    return this;
  }

  removeCondition(condition) {
    const index = this.conditions.indexOf(condition);
    if (index !== -1) {
      this.conditions.splice(index, 1);
    }
    return this;
  }

  addShowField(field) {
    if (!this.show.includes(field)) {
      this.show.push(field);
    }
    return this;
  }

  removeShowField(field) {
    const index = this.show.indexOf(field);
    if (index !== -1) {
      this.show.splice(index, 1);
    }
    return this;
  }

  addHideField(field) {
    if (!this.hide.includes(field)) {
      this.hide.push(field);
    }
    return this;
  }

  removeHideField(field) {
    const index = this.hide.indexOf(field);
    if (index !== -1) {
      this.hide.splice(index, 1);
    }
    return this;
  }

  addResolve(service) {
    if (!this.resolves.includes(service)) {
      this.resolves.push(service);
    }
    return this;
  }

  removeResolve(service) {
    const index = this.resolves.indexOf(service);
    if (index !== -1) {
      this.resolves.splice(index, 1);
    }
    return this;
  }

  convertToCensusQuery() {
    let query = new CensusQuery(this.collection, this.namespace, this.serviceKey);

    if (!!this.language) {
      query.setLanguage(this.language.toLowerCase());
    }

    if (this.limit !== null) {
      query.setLimit(this.limit);
    }

    if (this.start !== null) {
      query.setStart(this.start);
    }

    if (this.show.length > 0) {
      query.showFields(this.show);
    }

    if (this.hide.length > 0) {
      query.hideFields(this.hide);
    }

    console.log(query.toUrl());

    return query;
  }
};

export default QueryConfig;