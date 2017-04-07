 const getUserDocumentQuery = (req) => {
   if (req.query.q) {
     return `SELECT "Documents"."id" as id, "Documents"."title", "Documents"."content", "Documents"."ownerId", "Documents"."access" FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE (("Users"."roleId" = ${req.decoded.roleId} AND "Documents"."access" = 'role') OR ("Documents"."ownerId" = ${req.params.id})) AND (( "Documents"."title" ILIKE '%${req.query.q}%' ) OR ( "Documents"."content" ILIKE '%${req.query.q}%'))`;
   }
   return `SELECT "Documents"."id" as id, "Documents"."title", "Documents"."content", "Documents"."ownerId", "Documents"."access" FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE ("Users"."roleId" = ${req.decoded.roleId} AND "Documents"."access" = 'role') OR ("Documents"."ownerId" = ${req.params.id})`;
 };

 export const getAccessibleDocuments = req => `SELECT "Documents"."id" as id, "Documents"."title", "Documents"."content", "Documents"."ownerId", "Documents"."access" FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE ("Users"."roleId" = ${req.decoded.roleId} AND "Documents".access = 'role') OR ("Documents".access = 'public')`;

 export const countDoc = (req) => {
   if (req.query.q) {
     return `SELECT COUNT (*) FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE (("Users"."roleId" = ${req.decoded.roleId} AND "Documents"."access" = 'role') OR ("Documents"."ownerId" = ${req.params.id})) AND (( "Documents"."title" ILIKE '%${req.query.q}%' ) OR ( "Documents"."content" ILIKE '%${req.query.q}%'))`;
   }
   return `SELECT COUNT (*) FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE ("Users"."roleId" = ${req.decoded.roleId} AND "Documents"."access" = 'role') OR ("Documents"."ownerId" = ${req.params.id})`;
 };
 export default getUserDocumentQuery;
