import React from 'react';
import './App.css';
import TestProvider from './context/Provider';
import Table from './components/table';

function App() {
  return (
    <TestProvider>
      <div>hello world</div>
      <Table />
    </TestProvider>
  );
}

export default App;
