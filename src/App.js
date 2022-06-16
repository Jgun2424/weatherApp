import './index.css'
import SideBar from './SideBar/SideBar';
import NoLocation from './NoLocation';
import Layout from './Layout/Layout';

function App() {
  return (
    <Layout>
      <SideBar />
      {localStorage.getItem('city') === null && <NoLocation />}
    </Layout>
  );
}

export default App;
