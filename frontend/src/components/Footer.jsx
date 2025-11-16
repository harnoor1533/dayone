import React from 'react';
export default function Footer() {
  return (
    <footer style={{ padding: 12, textAlign: 'center', background:'#fafafa' }}>
      © {new Date().getFullYear()} My Bookstore — Built with React
    </footer>
  );
}
