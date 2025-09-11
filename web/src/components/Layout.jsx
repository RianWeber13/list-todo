// web/src/components/Layout.jsx

import React from 'react';

// Nosso componente de Layout. Note que ele recebe uma prop especial chamada 'children'.
// 'children' é uma palavra reservada no React que representa qualquer coisa
// que for passada DENTRO das tags do componente, ex: <Layout> ...aqui dentro... </Layout>
function Layout({ children }) {
  return (
    // Esta é a nossa "moldura": o container principal que já estilizamos.
    <div className="app-container">
      {/* E aqui, nós renderizamos a "foto" (o conteúdo) que foi passada. */}
      {children}
    </div>
  );
}

export default Layout;