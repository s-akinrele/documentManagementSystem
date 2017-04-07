
[![Build Status](https://travis-ci.org/andela-oakinrele/documentManagementSystem.svg?branch=develop)](https://travis-ci.org/andela-oakinrele/documentManagementSystem)
[![Coverage Status](https://coveralls.io/repos/github/andela-oakinrele/documentManagementSystem/badge.svg?branch=develop)](https://coveralls.io/github/andela-oakinrele/documentManagementSystem?branch=develop)




DOCUMENT MANAGEMENT SYSTEM
==========================

Document Management System is an application that helps users manage their documents in an organized way. A User can be able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work with regard to category, the application permits users to work collaboratively on documents.

Document Management System provides a restful API and friend users interface for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT. The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.


Development
-----------
This application has been created using Nodejs environment and implementing [**Express**](http://expressjs.com/) as the routing framework and [**Sequelize**](), an object modeling package, to interact with Relation Database. Authentication has been implemented. For this version, only local strategy has been used. [**JWT tokens**](https://jwt.io/) have also been used to authenticate routes.

Features
-----------
- Login/Sign up to create document
- Share a document privately with a friend on the platform (click on the private access to enable the feature)
- Delete a document
- View other peoples public documents and documents created on the same role level as you
- Reset password anytime
- If you forget you password, you can always click on the forgot password tab and follow instructions
- Search for documents (real time)
- Update your profile
- With admin access you manage users and roles
- [visit] (https://dms-simi.herokuapp.com/)

## API Documentation Link
- [view the api documentation](https://andela-oakinrele.github.io/documentManagementSystem/)
