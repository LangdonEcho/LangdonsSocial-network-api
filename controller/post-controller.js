// Require Thoughts and Users Models
const {Posts, Users} = require('../models');

// Set up Thoughts Controller
const PostsController = {

    // Create a new thought
    createPosts({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {Posts: _id}}, {new: true});
        })
        .then(dbPostsData => {
            if(!dbPostsData) {
                res.status(404).json({message: 'No Posts with this particular ID!'});
                return;
            }
            res.json(dbPostsData)
        })
        .catch(err => res.json(err)); 
    },

    // Get all available Thoughts
    getAllPosts(req,res) {
        Posts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbPostsData => res.json(dbPostsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get a certain thought by ID
    getPostsById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbPostsData => {
            if(!dbPostsData) {
            res.status(404).json({message: 'No Posts with this particular ID!'});
            return;
        }
        res.json(dbPostsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Update a current thought by ID
    updatePosts({params, body}, res) {
        Posts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({message: 'No Posts with this particular ID!'});
                return;
            }
                res.json(dbPostsData);
        })
        .catch(err => res.json(err));
    },

    // Delete a current thought by ID
    deletePosts({params}, res) {
        Posts.findOneAndDelete({_id: params.id})
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({message: 'No Posts with this particular ID!'});
                return;
            }
            res.json(dbPostsData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Add a new Reaction
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.PostId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbPostsData => {
        if (!dbPostsData) {
            res.status(404).json({message: 'No Posts with this particular ID!'});
            return;
        }
        res.json(dbPostsData);
        })
        .catch(err => res.status(400).json(err))

    },

    // Delete a reaction by ID
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({message: 'No Posts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }

};

// Export module thought controller
module.exports = PostsController;
