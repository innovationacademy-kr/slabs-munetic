import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from '../common/Select';

const si_data = ["서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","세종시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주도"];
const gu_data = [
  ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"],
  ["계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"],
  ["대덕구","동구","서구","유성구","중구"],
  ["광산구","남구","동구","북구","서구"],
  ["남구","달서구","동구","북구","서구","수성구","중구","달성군"],
  ["남구","동구","북구","중구","울주군"],
  ["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"],
  ["금남면","부강면","소정면","연기면","연동면","연서면","장군면","전동면","전의면","조치원읍","가람동","고운동","나성동","다정동","대평동","도담동","반곡동","보람동","산울동","새롬동","소담동","아름동","어진동","종촌동","집현동","한솔동","함강동","해밀동"],
  ["고양시 덕양구","고양시 일상동구","고양시 일산서구","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시 수정구","성남시 중원구","성남시 분당구","수원시 장안구","수원시 팔달구","수원시 권선구","수원시 영통구","시흥시","안산시","안성시","안양시","양주시","오산시","용인시 처인구","용인시 기흥구","용인시 수지구","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"],
  ["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"],
  ["제천시","청주시 상당구","청주시 흥덕구","청주시 서원구","청주시 청원구","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"],
  ["계룡시","공주시","논산시","보령시","서산시","아산시","천안시 동남구","천안시 서북구","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군"],
  ["군산시","김제시","남원시","익산시","전주시 완산구","전주시 덕진구","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"],
  ["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"],
  ["경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시 남구","포항시 북구","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"],
  ["거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시 ","창원시 의창구","창원시 성산구","창원시 마산합포구","창원시 마산회원구","창원시 진해구","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"],
  ["서귀포시","제주시"],
];


const Container = styled.div`
  display: flex;
  font-size: 15px;
  .select {
    font-weight: normal;
    font-size: 15px;
    text-align: center;
  }
  .selectAddress {
    display: flex;
  }
  .selectSi {
    flex: 1.5;
  }
  .selectGu {
    flex: 1;
    margin-left: 3px;
  }
`;


/**
 * AddressSelect 컴포넌트의 프로퍼티 정의
 */
 export interface AddressSelectIProps {
  initAddress?: string                          // 초기 지역 (optional)
  set?: (si: string, gu: string) => void;       // 지역 셋될때 호출되는 콜백함수 (optional)
}

/**
 * 지역을 선택할 수 있는 컴포넌트
 * 
 * @param props.initAddress {si: string, gu: string} 시와 구를 문자열로 담고 있는 객체 (optional)
 * @param props.set (si: string, gu: string) => void 지역이 셋될때 호출되는 콜백함수 (optional)
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function AddressSelect(props: AddressSelectIProps) {

  const [si, setSi] = useState<string>();
  const [gu, setGu] = useState<string>();
  const [guIndex, setGuIndex] = useState<number>();

  const onChangeAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    if (name === 'Si') {
      let idx = undefined;
      si_data.forEach((v, i) => {
        if (value === v) {
          idx = i;
        }
      });
      setGuIndex(idx);
      setSi(value);
      setGu(undefined);
    } else if (name === 'Gu') {
      setGu(value);
    }
  };

  useEffect(() => {
    if (si && gu && props.set) {
      props.set(si, gu);
    }
  }, [si, gu]);

  useEffect(() => {
    if (props.initAddress) {
      let idx = undefined;
      const arr = props.initAddress.match(/(\S*)\s([\S\s]*)/);
      if (arr) {
        si_data.forEach((v, i) => {
          if (arr[1] === v) {
            idx = i;
            setGuIndex(idx);
            setSi(v);
          }
        });
      }
      if (arr && idx !== undefined) {
        gu_data[idx].forEach((v) => {
          if (arr[2] === v) {
            setGu(v);
          }
        });
      }
    }
  }, []);

  return (
    <Container>
      <div className='selectAddress'>
        <div className="selectSi">
          <Select
            options={si_data}
            value={si}
            disabledOptions={['시/도 선택']}
            defaultValue="시/도 선택"
            name="Si"
            onChange={onChangeAddress}
            errorMessage="시/도를 선택하세요."
          />
        </div>
        <div className="selectGu">
          <Select
            options={guIndex === undefined ? [] : gu_data[guIndex]}
            value={gu === undefined ? "구/군 선택" : gu}
            disabledOptions={['구/군 선택']}
            defaultValue="구/군 선택"
            name="Gu"
            onChange={onChangeAddress}
            errorMessage="구/군을 선택하세요."
          />
        </div>
      </div>
    </Container>
  );
}
