import Status from 'http-status';
import * as TutorInfoMapper from '../mapping/TutorInfoMapper';
import { TutorInfo } from '../models/tutorInfo'
import { ITutorInfoInsertType, ITutorInfoType } from '../types/controller/tutorInfoData';
import ErrorResponse from '../modules/errorResponse';

/**
 * 튜터의 추가 데이터를 새로 추가하거나 업데이트
 * 
 * @param user_id user ID
 * @param tutor_info ITutorInfoType
 * @returns Promise<boolean>
 * @throws ErrorResponse if the user ID or lesson ID is not exists.
 * @author joohongpark
 */
 export const addTutorDataById = async (
  user_id: number,
  tutor_info: ITutorInfoType,
): Promise< boolean > => {
  let rtn: boolean = false;
  const data: ITutorInfoInsertType = TutorInfoMapper.toTutorInfoEntity(user_id, tutor_info);
  try {
    const newTutorData: [TutorInfo, boolean] = await TutorInfo.findOrCreate({
      where: { user_id },
      defaults: data,
    });
    const check = await newTutorData[0].update({ ...tutor_info });
    rtn = check !== null;
  } catch (e) {
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 강의 id입니다.');
  }
  return rtn;
}

/**
 * 튜터의 추가 데이터를 조회
 * 
 * @param user_id user ID
 * @returns Promise<ITutorInfoType | undefined> 없으면 Null을 반환
 * @author joohongpark
 */
 export const getTutorDataById = async (
  user_id: number,
): Promise< ITutorInfoType | undefined > => {
  try {
    const tutorInfo: TutorInfo | null = await TutorInfo.findOne({
      where: { user_id },
    });
    if (tutorInfo) {
      return TutorInfoMapper.toTutorInfoType(tutorInfo);
    } else {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
}
