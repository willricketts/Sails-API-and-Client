/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var rest = require('rest');
module.exports = {
	 index: function(req, res){
     rest({ method: 'GET', path: sails.config.api.host + '/post' }).then(function(response){
       posts = JSON.parse(response.entity);
       res.view({ posts: posts });
     });
   },

   show: function(req, res){
     var id = req.param('id');
     rest({ method: 'GET', path: sails.config.api.host + '/post/' + id }).then(function(response){
       if(response.entity){
         post = sails.config.api.parse(response);

         res.view({ post: post });
       }
       else{
         res.notFound();
       }
     });
   },

   update: function(req, res){
       var params = req.params.all();
       rest({ method: 'PUT', path: sails.config.api.host + '/post/update' + params }).then(function(response){
           if(response.entity) {
               req.flash('Post')
           }
       })
   },

   destroy: function(req, res){
       var id = req.param('id');
       rest({ method: 'DELETE', path: sails.config.api.host + '/post/delete/' + id }).then(function(response){
           if(response.entity){
               req.flash('Post deleted');
               res.redirect('/');
           }
           else{
               res.notFound();
           }
       });
   }
};
