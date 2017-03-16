import db from '../models';

const data = {
  rawQuery:
    `SELECT * FROM "Documents" INNER JOIN "Users" ON "Documents"."OwnerId" = "Users"."id" WHERE ("Users"."RoleId" = ${req.decoded.RoleId} AND "Documents".access = 'role') OR ("Documents".access = 'public')`
};
export default data;