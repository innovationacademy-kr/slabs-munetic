/**
 * 객체에 새로운 프로퍼티를 삽입해주는 함수입니다.
 * 프로퍼티로 모든 타입을 받을 수 있게 제네릭 함수로 구현하였습니다.
 * 
 * @param obj 프로퍼티를 삽입하고자 하는 객체
 * @param propName 삽입하고자 하는 프로퍼티명
 * @param prop 삽입하고자 하는 프로퍼티
 */
export default function addProperty<T>(obj: Object, propName: string, prop: T) {
  Object.defineProperty(obj, propName, {
    value: prop,
    enumerable: true,
    configurable: true,
  });
}