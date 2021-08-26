/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /api/testemail': { action: 'user/testemail' },
  'GET /api/fetchTemplate': { action: 'user/fetchTemplate' },

  // LOGIN

  'POST /api/login': { action: 'user/login' },
  'GET /api/me': { action: 'user/me' },
  'GET /api/comfirmEmail/:email/:hash': { action: 'user/comfirmEmail' },
  'POST /api/passwordrecovery': { action: 'user/passwordrecovery' },
  'GET /api/passwordrecovery/:email/:hash': { action: 'user/passwordSendNew' },
  'GET /api/addFirstAdmin': { action: 'login/addFirstAdmin' },

  // USER

  'GET /api/users': { action: 'user/getAll' },
  'get /api/users/:id': { action: 'user/getOne' },
  'POST /api/users': { action: 'user/add' },
  'PUT /api/users/:id': { action: 'user/update' },
  'DELETE /api/users/:id': { action: 'user/delete' },

  'POST /api/administrator': { action: 'user/addAdmin' },
  'GET /api/administrator': { action: 'user/getAllAdmin' },
  'GET /api/administrator/:id': { action: 'user/getOne' },
  'PUT /api/administrator/:id': { action: 'user/update' },
  'DELETE /api/administrator/:id': { action: 'user/delete' },

  // image

  'GET /api/image/:path': { action: 'image/serveImage', skipAssets: false },

  // Partenaires
  'GET /api/partenaires': { action: 'partenaires/getAll' },
  'get /api/partenaires/:id': { action: 'partenaires/getOne' },
  'POST /api/partenaires': { action: 'partenaires/add' },
  'PUT /api/partenaires/:id': { action: 'partenaires/update' },
  'DELETE /api/partenaires/:id': { action: 'partenaires/delete' },

  // JeuxGratuit
  'GET /api/jeuxgratuits': { action: 'jeuxgratuits/getAll' },
  'get /api/jeuxgratuits/:id': { action: 'jeuxgratuits/getOne' },
  'POST /api/jeuxgratuits': { action: 'jeuxgratuits/add' },
  'PUT /api/jeuxgratuits/:id': { action: 'jeuxgratuits/update' },
  'DELETE /api/jeuxgratuits/:id': { action: 'jeuxgratuits/delete' },

  // JeuxSMS
  'GET /api/jeuxsms': { action: 'jeuxsms/getAll' },
  'get /api/jeuxsms/:id': { action: 'jeuxsms/getOne' },
  'POST /api/jeuxsms': { action: 'jeuxsms/add' },
  'PUT /api/jeuxsms/:id': { action: 'jeuxsms/update' },
  'DELETE /api/jeuxsms/:id': { action: 'jeuxsms/delete' },

  // FRONT

  'GET /api/jeuxsms/fetch': { action: 'jeuxsms/getAllFront' },
  'GET /api/jeuxgratuits/fetch': { action: 'jeuxgratuits/getAllFront' },
  'GET /api/partenaires/fetch': { action: 'partenaires/getAllFront' },
  'GET /api/jeuxsms/fetchhome': { action: 'jeuxsms/getHomeFront' },
  'GET /api/jeuxgratuits/fetchhome': { action: 'jeuxgratuits/getHomeFront' },
  'GET /api/jeuxsms/fetch/:id': { action: 'jeuxsms/getOneFront' },
  'GET /api/jeuxgratuits/fetch/:id': { action: 'jeuxgratuits/getOneFront' },
  'GET /api/jeuxgratuits/inscription/:id': { action: 'jeuxgratuits/inscription' },
  'POST /api/signin': { action: 'user/signin' }

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

}
