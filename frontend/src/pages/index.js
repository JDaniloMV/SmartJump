import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';  // Importa o CSS

const Header = () => {
  return (
    <>
      <h1>Bem-vindo à festa dos alunos do ISCTE !</h1>
      <p>Este ficheiro usa CSS !</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
