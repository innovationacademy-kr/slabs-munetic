import Container from './components/Container';
import Menu from './components/Menu';
import Routing from './Routing';
import GlobalStyle from './style/GlobalStyle';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Menu />
      <Container>
        <Routing />
      </Container>
    </div>
  );
}

export default App;
