import TopBar from './components/common/TopBar';
import Routing from './Routing';
import GlobalStyle from './style/GlobalStyle';
import BottomMenu from './components/common/BottomMenu';

function App() {
  return (
    // FIXME: 임시로 글꼴 설정했는데 추후에 바꾸어야 할 듯 합니다. by joohongpark
    <div style={{fontFamily: "font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
      <GlobalStyle />
      <TopBar />
      <Routing />
      <BottomMenu />
    </div>
  );
}

export default App;
