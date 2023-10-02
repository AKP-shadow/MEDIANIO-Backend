import { Like } from '../entities/likes.entity';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';

const likeRepository = AppDataSource.getRepository(Like);

export const createLike = async (post: Post, user: User) => {
  return await likeRepository.save(likeRepository.create({ post, user }));
};

export const removeLike = async (post: Post, user: User) => {
  return await likeRepository
    .createQueryBuilder('like')
    .delete()
    .where('like.post = :postId', { postId: post.id })
    .andWhere('like.user = :userId', { userId: user.id })
    .execute();
};

export const findLikesByPostId = async (postId: number) => {
  return await likeRepository
    .createQueryBuilder('like')
    .leftJoinAndSelect('like.user', 'user')
    .where('like.post = :postId', { postId })
    .getMany();
};

export const findLikedPostsByUserId = async (userId: number) => {
  return await likeRepository
    .createQueryBuilder('like')
    .leftJoinAndSelect('like.post', 'post')
    .where('like.user = :userId', { userId })
    .getMany();
};
