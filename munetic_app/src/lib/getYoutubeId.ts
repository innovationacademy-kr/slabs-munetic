/**
 * 어떤 종류의 유튜브 영상 링크가 입력되도 유튜브 영상 고유 ID를 파싱하는 함수
 * 
 * @param url 유튜브 링크
 * @returns 파싱 성공시 ID, 실패시 null
 */
export default function getYoutubeId(url: string) : string | null {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : null;
}