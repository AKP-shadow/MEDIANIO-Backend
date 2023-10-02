import { NextFunction, Request, Response } from 'express';
import { findUserEducation, findUsersByEducationCriteria } from '../services/user_education.service'; // Import the service function
import { findUserEmployment } from '../services/user_employment.service';

export const findUsersByEducationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findUserEducation(req.body);

    // Respond with the found users
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
export const findUsersByEmploymentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findUserEmployment(req.body);

    // Respond with the found users
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
