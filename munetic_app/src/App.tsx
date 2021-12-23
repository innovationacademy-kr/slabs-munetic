import BottomMenu from './components/common/BottomMenu';
import TopBar from './components/common/TopBar';
import { WriteProvider } from './context/writeContext';
import Routing from './Routing';
import GlobalStyle from './style/GlobalStyle';

function App() {
  return (
    <WriteProvider>
      <div>
        <GlobalStyle />
        <TopBar />
        <Routing />
        <BottomMenu />
      </div>
    </WriteProvider>
  );
}

export default App;
