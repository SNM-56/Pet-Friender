import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './container/App.js';
import './styles.scss';

createRoot(document.getElementById('app')).render(<App />);
