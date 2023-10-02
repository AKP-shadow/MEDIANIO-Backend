import { NextFunction, Request, Response } from 'express';
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  UpdatePostInput,
} from '../schemas/post.schema';
import { createPost, findPosts, getPost, getPostByUserId } from '../services/post.service';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';
import { createLike, findLikesByPostId, findLikedPostsByUserId, removeLike } from '../services/likes.service';

export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id);

    const post = await createPost(req.body, user!);

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Post with that title already exist',
      });
    }
    next(err);
  }
};

export const getPostHandler = async (
  req: Request<GetPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPost(parseInt(req.params.postId));

    if (!post) {
      return next(new AppError(404, 'Post from that user ID not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
export const getPostByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPostByUserId(parseInt(req.params.userId));

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await findPosts(req);

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updatePostHandler = async (
  req: Request<UpdatePostInput['params'], {}, UpdatePostInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPost(parseInt(req.params.postId));
    const userId = res.locals.user.id;
    if (!post) {
      return next(new AppError(404, 'Post with that ID not found'));
    }
    if(post.user.id != userId){
      return next(new AppError(404, 'User cannot update this post'));
    }
    Object.assign(post, req.body);

    const updatedPost = await post.save();

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPost,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deletePostHandler = async (
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPost(parseInt(req.params.postId));
    const userId = res.locals.user.id;
    if (!post) {
      return next(new AppError(404, 'Post with that ID not found'));
    }
    if(post.user.id != userId){
      return next(new AppError(404, 'This user cannot delete this post'));
    }
    await post.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const likePostHandler = async (
  req: Request<{ postId: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    // const postId = parseInt(req.params.postId);
    const postId = 1;
    const userId = 3;

    const post = await getPost(postId);
    const user = await findUserById(userId);

    if (!post || !user) {
      return next(new AppError(404, 'Post or User not found'));
    }

    await createLike(post, user);

    res.status(201).json({
      status: 'success',
      message: 'Post liked successfully',
    });
  } catch (err: any) {
    next(err);
  }
};

export const unlikePostHandler = async (
  req: Request<{ postId: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = res.locals.user.id;

    const post = await getPost(postId);
    const user = await findUserById(userId);

    if (!post || !user) {
      return next(new AppError(404, 'Post or User not found'));
    }

    await removeLike(post, user);

    res.status(200).json({
      status: 'success',
      message: 'Post unliked successfully',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getLikesOfPostHandler = async (
  req: Request<{ postId: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = parseInt(req.params.postId);

    const post = await getPost(postId);

    if (!post) {
      return next(new AppError(404, 'Post not found'));
    }

    const likes = await findLikesByPostId(postId);

    res.status(200).json({
      status: 'success',
      results: likes.length,
      data: {
        likes,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getLikedPostsByUserHandler = async (
  req: Request<{ userId: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);

    const user = await findUserById(userId);

    if (!user) {
      return next(new AppError(404, 'User not found'));
    }

    const likedPosts = await findLikedPostsByUserId(userId);

    res.status(200).json({
      status: 'success',
      results: likedPosts.length,
      data: {
        likedPosts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
