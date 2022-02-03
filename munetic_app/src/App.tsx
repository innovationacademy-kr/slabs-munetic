import TopBar from './components/common/TopBar';
import Routing from './Routing';
import GlobalStyle from './style/GlobalStyle';

function App() {
  return (
    <div>
      <GlobalStyle />
      <TopBar />
      <Routing />
    </div>
  );
}

export default App;
