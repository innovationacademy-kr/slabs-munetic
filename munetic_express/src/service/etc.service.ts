import { Etc, Key } from '../models/etc';

/**
 * 약관 조회
 * 
 * @returns Promise<string>
 * @author joohongpark
 */
export const getTerms = async (): Promise< string > => {
  const rtn = await Etc.findOne({
    where: {
      id: Key.Terms,
    }
  });
  return rtn?.content || '';
};

/**
 * 오픈소스 라이센스 조회
 * 
 * @returns Promise<string>
 * @author joohongpark
 */
export const getLicense = async (): Promise< string > => {
  const rtn = await Etc.findOne({
    where: {
      id: Key.License,
    }
  });
  return rtn?.content || '';
};


/**
 * 약관 수정
 *
 * @param content 수정하고자 하는 정보
 * @returns Promise<boolean>
 * @author joohongpark
 */
 export const editTerms = async (
  content: string,
): Promise<boolean> => {
  const [updatedNum] = await Etc.update(
    { content },
    {
      where: {
        id: Key.Terms,
      },
    },
  );
  return updatedNum > 0;
};



/**
 * 오픈소스 라이센스 수정
 *
 * @param content 수정하고자 하는 정보
 * @returns Promise<boolean>
 * @author joohongpark
 */
 export const editLicense = async (
  content: string,
): Promise<boolean> => {
  const [updatedNum] = await Etc.update(
    { content },
    {
      where: {
        id: Key.License,
      },
    },
  );
  return updatedNum > 0;
};
