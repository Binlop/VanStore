import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';

export default function Product() {
  return (
        <Routes>
          <Route path="/:uuid" element={<ProductDetail />} />
        </Routes>
  );
}