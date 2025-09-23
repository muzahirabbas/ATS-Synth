import React from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <HomePage />
        </main>
        <Footer />
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          success: {
            style: {
              background: '#34D399',
              color: '#1A1A2E',
            },
            iconTheme: {
              primary: '#1A1A2E',
              secondary: '#34D399',
            },
          },
          error: {
             style: {
              background: '#F87171',
              color: '#FFFFFF',
            },
             iconTheme: {
              primary: '#FFFFFF',
              secondary: '#F87171',
            },
          },
        }}
      />
    </>
  );
}

export default App;


