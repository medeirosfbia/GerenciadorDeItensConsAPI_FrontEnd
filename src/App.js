import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListItems from './components/Items/ListItems';
import AddItem from './components/Items/AddItem';
import ReadItem from './components/Items/ReadItem';
import UpdateItem from './components/Items/UpdateItem';
import Header from './components/Header';
import ListItemsByCategory from './components/Items/ListItemsByCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListCategories from './components/Categories/ListCategories';
import ReadCategory from './components/Categories/ReadCategory';
import AddCategory from './components/Categories/AddCategory';
import UpdateCategory from './components/Categories/UpdateCategory';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<ListItems />} />
      <Route path="/addItem" element={<AddItem />} />
      <Route path="/readItem/:id" element={<ReadItem />} />
      <Route path="/updateItem/:id" element={<UpdateItem />} />
      <Route path="/items/category/:id" element={<ListItemsByCategory />} />
      <Route path="/categories" element={<ListCategories />} />
      <Route path='/addCategory' element={<AddCategory />} />
      <Route path="/readCategory/:id" element={<ReadCategory />} />
      <Route path="/updateCategory/:id" element={<UpdateCategory />} />
    </Routes>
    <ToastContainer />
    <Footer />
    </BrowserRouter>
  );
}

export default App;
