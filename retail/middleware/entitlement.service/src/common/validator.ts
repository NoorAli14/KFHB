import {HttpException, HttpStatus} from '@nestjs/common';
import {GENDER, MESSAGES} from '@common/constants';

export const validateGender = (gender: string) : any => {
  if(gender && !GENDER[gender]){
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: MESSAGES.INVALID_GENDER,
    }, HttpStatus.BAD_REQUEST);
  }
};

export const validateDate = (date: string) : any => {
  try{
    return new Date(date).toISOString();
  } catch (e) {
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: MESSAGES.INVALID_DATE,
    }, HttpStatus.BAD_REQUEST);
  }
};
