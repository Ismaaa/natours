
class APIFeatures {
  constructor(mongoQuery, urlQuery) {
    this.mongoQuery = mongoQuery;
    this.urlQuery = urlQuery;
  }

  filter() {
    // base query
    const query = { ...this.urlQuery };

    // exlude some params
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete query[field]);

    // advanced filtering
    let queryString = JSON.stringify(query);

    // replace ie: gte for $gte to follow mongodb format
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    // generate mongoose query
    this.mongoQuery = this.mongoQuery.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.urlQuery.sort) {
      // transform "price,difficulty" for "price difficulty"
      const sortBy = this.urlQuery.sort.split(',').join(' ');
      // append sort
      this.mongoQuery = this.mongoQuery.sort(sortBy);
    } else {
      this.mongoQuery = this.mongoQuery.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.urlQuery.fields) {
      const fields = this.urlQuery.fields.split(',').join(' ');
      this.mongoQuery = this.mongoQuery.select(fields);
    } else {
      // remove the __v by default
      this.mongoQuery = this.mongoQuery.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.urlQuery.page, 10) || 1;
    const limit = parseInt(this.urlQuery.limit, 10) || 100;
    const skip = (page - 1) * limit;

    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;