import express from 'express';
import {
  createPostHandler,
  deletePostHandler,
  getPostByUser,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
  likePostHandler,unlikePostHandler,getLikesOfPostHandler,getLikedPostsByUserHandler
} from '../controllers/post.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from '../schemas/post.schema';

const router = express.Router();

// router.use(deserializeUser, requireUser);
router
  .route('/')
  .post(validate(createPostSchema), createPostHandler)
  .get(getPostsHandler);

router
  .route('/:postId')
  .get(validate(getPostSchema), getPostHandler)
  .patch(validate(updatePostSchema), updatePostHandler)
  .delete(validate(deletePostSchema), deletePostHandler);

router
  .route('/user/:userId')
  .get( getPostByUser);
 
router
  .route('/:postId/like')
  .post(likePostHandler)
  .delete(unlikePostHandler)
  .get(getLikesOfPostHandler)
  .get( getLikedPostsByUserHandler);

export default router;
