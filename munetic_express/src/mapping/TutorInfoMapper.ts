import { TutorInfo } from "../models/tutorInfo";
import { ITutorInfoType, ITutorInfoInsertType } from "../types/controller/tutorInfoData"

/**
 * tutorInfo 엔티티에서 필요한 정보만 가져오는 맵퍼입니다.
 * 
 * @param tutorInfo tutorInfo 엔티티
 * @returns ITutorInfoType
 * @author joohongpark
 */
export function toTutorInfoType(tutorInfo: TutorInfo) : ITutorInfoType {
  return {
    spec: tutorInfo.spec,
    career: tutorInfo.career,
    youtube: tutorInfo.youtube,
    instagram: tutorInfo.instagram,
    soundcloud: tutorInfo.soundcloud,
  };
}

/**
 * 튜터 정보(tutorInfo) 를 변경 혹은 추가할 때 Sequelize가 받아들일 수 있는 타입으로 변경하는 맵퍼입니다.
 * 
 * @param tutorInfoType ITutorInfoType 튜터 정보
 * @returns ITutorInfoType tutorInfo 엔티티
 * @author joohongpark
 */
export function toTutorInfoEntity(user_id: number, tutorInfoType: ITutorInfoType) : ITutorInfoInsertType {
  return {
    user_id,
    spec: tutorInfoType.spec || "",
    career: tutorInfoType.career || "",
    youtube: tutorInfoType.youtube || "",
    instagram: tutorInfoType.instagram || "",
    soundcloud: tutorInfoType.soundcloud || "",
  };
}
