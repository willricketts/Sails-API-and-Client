/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res){
        Post.find(function(err, posts){
            if(posts){
                res.json(200, posts);
            }
            else {
                return res.notFound();
            }
        });
    },

    findOne: function(req, res){
        var id = req.param('id');
        Post.findOne({ id: id }, function(err, post){
            if(err) { return res.send(500, "Lost in space!") };
            if(post){
                res.json(200, post);
            }
            else{
                return res.notFound();
            }
        });
    },

    create: function(req, res){
        var params = req.params.all();
        Post.create(params, function(err, post){
            if(err) { return res.send(500, "Lost in space!") };
            if(post) {
                res.json(201, post);
            }
            else {
                return res.send(400, "Post was not created.");
            }
        });
    },

    update: function(req, res){
        var criteria = {};
        criteria = _.merge({}, req.params.all(), req.body);
        var id = req.param('id');
        Post.update(id, criteria, function(err, post){
            if(err) { return res.send(500, "Lost in space!") };
            if(post){
                res.json(200, "Post successfully updated.");
            }
            else{
                return res.send(400, "Post was not updated.");
            }
        });
    },

    destroy: function(req, res){
        var id = req.param('id');
        if(!id){ return res.send(400, "No id provided.") };
        Post.findOne(id, function(err, post){
            if(err){ return res.send(500, "Lost in space!") };
            if(post){
                Post.destroy(id, function(err){
                    if(err){ return res.send(500, "Lost in space!") };
                    res.send(200, "Post deleted.");
                });
            }
            else{
                return res.notFound();
            }
        })
    }
};

