import BottomMenu from './components/common/BottomMenu';
import TopBar from './components/common/TopBar';
import { ContextProvider } from './context/Contexts';
import Routing from './Routing';
import GlobalStyle from './style/GlobalStyle';

function App() {
  return (
    <ContextProvider>
      <div>
        <GlobalStyle />
        <TopBar />
        <Routing />
        <BottomMenu />
      </div>
    </ContextProvider>
  );
}

export default App;
