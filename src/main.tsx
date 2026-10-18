import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { PracticeApp } from './practice/App';
import { PilotProvider } from './practice/progress';
import './styles/index.css';
import './practice/practice.css';
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><PilotProvider><PracticeApp /></PilotProvider></HashRouter></StrictMode>);
