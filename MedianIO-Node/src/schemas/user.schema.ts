import { number, object, string, TypeOf, z } from 'zod';
import { RoleEnumType } from '../entities/user.entity';
export const createUserSchema = object({
  body: object({
    type: string().optional(),
    mobile: string().optional(),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    firstname: string({
      required_error: 'First name is required',
    }),
    lastname: string().optional(),
    country: string({
      required_error: 'Country is required',
    }),
    city: string({
      required_error: 'City is required',
    }),
    nativelanguage: string({
      required_error: 'Native language is required',
    }),
    professiontype: string({
      required_error: 'Profession type is required',
    }),
    schoolname: string().optional(),
    startyear: number().optional(),  
    endyear: number().optional(),  
    location: string({
      required_error: 'Location is required',
    }),
    Branch: string().optional(),
    jobtitle: string().optional(),
    employmenttype: string().optional(),
    organization: string().optional(),
    provider: string().optional(),
    appUsage: string().optional(),
    appUsageMeta: object({
      degree: string().optional(),
      course: string().optional(),
      country: string().optional(),
    }).optional(),
    role: z.nativeEnum(RoleEnumType).optional(),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});

 

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
