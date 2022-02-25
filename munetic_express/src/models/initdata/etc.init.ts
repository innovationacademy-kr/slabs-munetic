import { Etc, Key } from '../etc';

function createEtcData() {
  const dataLists = [
    {id: Key.Terms, content: "약관 데이터 샘플"},
    {id: Key.License, content: "오픈소스 라이센스 데이터 샘플"},
  ];
  dataLists.map(data => {
    Etc.create(data as Etc).catch(e => console.log(e));
  });
  console.log('🎺 App:EtcLists created');
}

export default function initialize() {
  createEtcData();
}