import TopBar from './components/common/TopBar';
import Routing from './Routing';
import GlobalStyle from './style/GlobalStyle';
import BottomMenu from './components/common/BottomMenu';

function App() {
  return (
    <div>
      <GlobalStyle />
      <TopBar />
      <Routing />
      <BottomMenu />
    </div>
  );
}

export default App;
