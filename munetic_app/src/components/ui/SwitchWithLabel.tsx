import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

/**
 * SwitchWithLabel 컴포넌트의 프로퍼티 정의
 */
 export interface SwitchWithLabelIProps {
  init?: boolean;                                       // 초기값
  label?: string;                                       // 카테고리명
  change?: (changeTo: boolean) => Promise<boolean>;     // 삭제 콜백함수 (optional)
}

/**
 * mui 라이브러리를 사용한 라벨을 포함한 스위치 컴포넌트
 * 
 * @param props init, label, change
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function SwitchWithLabel(props: SwitchWithLabelIProps) {
  const [checked, setChecked] = useState<boolean>(props.init || true);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>, c: boolean): Promise<void> => {
    console.log(c);
    if (props.change === undefined) {
      setChecked(c);
    } else {
      if (await props.change(c)) {
        setChecked(c);
      }
    }
  };

  return (
    props.label ?
    <FormControlLabel control={<Switch checked={checked} onChange={onChange} />} label={props.label} />
    :
    <Switch checked={checked} onChange={onChange} />
  );
}