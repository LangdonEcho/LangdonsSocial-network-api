// Require express router
const router = require('express').Router();

// Set requirements (from thoughts-controller)
const { 
    getAllPosts, 
    getThoughtsById, 
    createPosts, 
    updatePosts,
    deletePosts,
    addReaction,
    deleteReaction

} = require('../../controllers/Posts-controller');

// -- Directs to: /api/thoughts <GET>
router.route('/').get(getAllPosts);

// -- Directs to: /api/thoughts/:id <GET, PUT, DELETE>
router.route('/:id').get(getThoughtsById).put(updatePosts).delete(deletePosts); 

// -- Directs to: /api/thoughts/:userId <POST>
router.route('/:userId').post(createPosts);

// -- Directs to: /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction);

// -- Directs to: /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;