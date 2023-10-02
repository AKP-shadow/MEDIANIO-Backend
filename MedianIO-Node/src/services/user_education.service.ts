import config from 'config';
import { UserEducation } from '../entities/user_education.entity'; // Import the UserEducation entity
import redisClient from '../utils/connectRedis';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';

const userEducationRepository = AppDataSource.getRepository(UserEducation);

export const createUserEducation = async (input: Partial<UserEducation>) => {
  return await userEducationRepository.save(userEducationRepository.create(input));
};

export const findUserEducationById = async (userEducationId: number) => {
  return await userEducationRepository.findOneBy({ id: userEducationId });
};

export const findEducationByUserId = async (userId: number) => {
  return await userEducationRepository.findOneBy({ userId: userId });
};


export const findUsersByEducationCriteria = async (
  schoolname?: string|undefined,
  location?: string|undefined,
  degree?: string|undefined,
  startyear?: number|undefined,
  endyear?: number|undefined
) => {

  const queryBuilder = userEducationRepository.createQueryBuilder('user_education');
  if (schoolname) {
    queryBuilder.andWhere('user_education.schoolname = :schoolname', { schoolname });
  }

  if (location) {
    queryBuilder.andWhere('user_education.location = :location', { location });
  }

  if (degree) {
    queryBuilder.andWhere('user_education.degree = :degree', { degree });
  }

  if (startyear !== undefined) {
    queryBuilder.andWhere('user_education.startyear = :startyear', { startyear });
  }

  if (endyear !== undefined) {
    queryBuilder.andWhere('user_education.endyear = :endyear', { endyear });
  }

  queryBuilder.leftJoinAndSelect('user_education.user', 'user');

  const results = await queryBuilder.getMany();

  const users = results.map((result) => result.user);

  return users;
};

export const findUserEducation = async (query: Object) => {
  return await userEducationRepository.findOneBy(query);
};

export const signEducationTokens = async (userEducation: UserEducation) => {
  // 1. Create Session (if needed)
  // This step depends on your application logic, you can skip it if not required for UserEducation.

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: userEducation.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refresh_token = signJwt({ sub: userEducation.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};
