import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComicsPage from '../../pages/ComicsPage';
import Main from '../../pages/Main';
import NotFound from '../../pages/404';
import SingleComicPage from '../../pages/SingleComicPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' index element={<Main />} />
        <Route path='comics' element={<ComicsPage />} />
        <Route path='comics/:comicId' element={<SingleComicPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
