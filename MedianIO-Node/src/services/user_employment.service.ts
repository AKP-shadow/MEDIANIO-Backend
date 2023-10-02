import config from 'config';
import { UserEmployment } from '../entities/user_employment.entity'; // Import the UserEmployment entity
import redisClient from '../utils/connectRedis';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';

const userEmploymentRepository = AppDataSource.getRepository(UserEmployment);

export const createUserEmployment = async (input: Partial<UserEmployment>) => {
  return await userEmploymentRepository.save(userEmploymentRepository.create(input));
};

export const findUserEmploymentById = async (userEmploymentId: number) => {
  return await userEmploymentRepository.findOneBy({ id: userEmploymentId });
};

export const findEmploymentByUserId = async (userId: number) => {
  return await userEmploymentRepository.findOneBy({ userId: userId });
};

export const findUsersByEmploymentCriteria = async (
  jobTitle?: string | undefined,
  employmentType?: string | undefined,
  organization?: string | undefined
) => {
  const queryBuilder = userEmploymentRepository.createQueryBuilder('user_employment');

  if (jobTitle) {
    queryBuilder.andWhere('user_employment.jobtitle = :jobTitle', { jobTitle });
  }

  if (employmentType) {
    queryBuilder.andWhere('user_employment.employmenttype = :employmentType', { employmentType });
  }

  if (organization) {
    queryBuilder.andWhere('user_employment.organization = :organization', { organization });
  }

  queryBuilder.leftJoinAndSelect('user_employment.user', 'user');

  const results = await queryBuilder.getMany();

  const users = results.map((result) => result.user);

  return users;
};

export const findUserEmployment = async (query: Object) => {
  return await userEmploymentRepository.findOneBy(query);
};


