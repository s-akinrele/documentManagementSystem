import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Validate the request query
 * @param {Integer} limit
 * @param {Integer} offset
 * @param {Integer} order
 * @return {Object}
 */
export const paginationSanitizer = (limit, offset, order) => {
  if (limit) {
    if (isNaN(Number(limit)) || limit < 0) {
      limit = 8;
    }
  } else {
    limit = 8;
  }

  if (offset) {
    if (isNaN(Number(offset)) || offset < 0) {
      offset = 0;
    }
  } else {
    offset = 0;
  }

  if (order && order.toLowerCase() === 'desc') {
    order = '"createdAt" DESC';
  } else {
    order = '"createdAt" ASC';
  }
  return { limit, offset, order };
};

/**
 * Pagination Method
 * @param {Object} paginationData
 * @param {Integer} documentCount
 * @returns {Object}
 */
export const pagination = (paginationData, documentCount) => {
  const metadata = {};
  metadata.totalCount = documentCount;
  metadata.pageSize = paginationData.limit;
  metadata.pageCount = Math.floor(metadata.totalCount / paginationData.limit) + 1;
  metadata.currentPage = Math.floor(paginationData.offset / paginationData.limit) + 1;
  return metadata;
};

/**
 * Send email
 * @param {Object} options
 * @return {Object}
 */
export const sendEmail = (options) => {
  const { service, from, to, subject, text, html} = options;
  let transporter = nodemailer.createTransport({
    service,
    auth: {
      user: 'akinrelesimi@gmail.com',
      pass: 'OREOLUWA'
    }
  });
  let mailOptions = {
    from,
    to,
    subject,
    html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    return "Message sent";
  });
};

/**
 * Generate random password
 * @return {String}
 */
export const generateRandomPassword = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const length = 12;
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};


