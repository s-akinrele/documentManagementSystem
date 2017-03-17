
const data = {
  pagination: (req) => {
    let limit;
    let offset;
    let order;
    if (req.query.limit) {
      if (isNaN(Number(req.query.limit))) {
        limit = 10;
      } else {
        limit = req.query.limit;
      }
    } else {
      limit = 10;
    }
    if (req.query.offset) {
      if (isNaN(Number(req.query.offset))) {
        offset = 0;
      } else {
        offset = req.query.offset;
      }
    } else {
      offset = 0;
    }
    if (req.query.order && req.query.order.toLowerCase() === 'desc') {
      order = '"createdAt" DESC';
    } else {
      order = '"createdAt" ASC';
    }
    return { limit, offset, order };
  }
};
export default data;
