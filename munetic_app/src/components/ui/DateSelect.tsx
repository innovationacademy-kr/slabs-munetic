import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import Select from '../common/Select';


const thisyear = (new Date()).getFullYear();
const monthList = Array.from(Array(12), (v, i) => String(i + 1));
const dayList = Array.from(Array(31), (v, i) => String(i + 1));
const yearList = Array.from(Array(100), (v, i) => String(thisyear - i));

const Container = styled.div`
  display: flex;
  font-size: 15px;
  margin-top: 10px;
  .select {
    font-weight: normal;
    font-size: 15px;
    text-align: center;
  }
  .selectDate {
    display: flex;
  }
  .selectYear {
    flex: 2;
    margin-left: 3px;
  }
  .selectMonth {
    flex: 1;
    margin-left: 3px;
  }
  .selectDay {
    flex: 1;
    margin-left: 3px;
  }
`;


/**
 * DateSelect 컴포넌트의 프로퍼티 정의
 */
 export interface DateSelectIProps {
  initDate?: {                                            // 초기 날짜 (optional)
    year: number;
    month: number;
    day: number;
  }
  set?: (date: string, ...dates: number[]) => void;       // 날자 셋될때 호출되는 콜백함수 (optional)
}

/**
 * 년도를 선택할 수 있는 컴포넌트
 * 
 * @param props.initDate {year: number, month: number, day: number} 년, 월, 일을 숫자 형태로 담고 있는 객체 (optional)
 * @param props.set (date: string, ...dates: number[]) => void 날자 셋될때 호출되는 콜백함수 (optional)
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function DateSelect(props: DateSelectIProps) {

  const [year, setYear] = useState<number | undefined>(props.initDate?.year);
  const [month, setMonth] = useState<number | undefined>(props.initDate?.month);
  const [day, setDay] = useState<number | undefined>(props.initDate?.day);

  const onChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const num = parseInt(value, 10);
    if (name === 'Year') {
      setYear(num);
    } else if (name === 'Month') {
      setMonth(num);
    } else {
      setDay(num);
    }
  };

  useEffect(() => {
    if (year && month && day && props.set) {
      props.set(`${year}-${month}-${day}`, year, month, day);
    }
  });

  return (
    <Container>
      <div className='selectDate'>
        <div className="selectYear">
          <Select
            options={yearList}
            value={year}
            disabledOptions={['년']}
            defaultValue="년"
            name="Year"
            onChange={onChangeDate}
            isValid={!!year}
            errorMessage="년도를 선택하세요."
          />
        </div>
        <div className="selectMonth">
          <Select
            options={monthList}
            value={month}
            disabledOptions={['월']}
            defaultValue="월"
            name="Month"
            onChange={onChangeDate}
            isValid={!!month}
            errorMessage="월을 선택하세요."
          />
        </div>
        <div className="selectDay">
          <Select
            options={dayList}
            value={day}
            disabledOptions={['일']}
            defaultValue="일"
            name="Day"
            onChange={onChangeDate}
            isValid={!!day}
            errorMessage="일을 선택하세요."
          />
        </div>
      </div>
    </Container>
  );
}
