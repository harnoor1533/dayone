import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BooksList from './pages/BooksList';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Contact from './pages/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 20, minHeight: '70vh' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/books' element={<BooksList />} />
          <Route path='/add' element={<AddBook />} />
          <Route path='/edit/:id' element={<EditBook />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<div><h2>404 — Page not found</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
