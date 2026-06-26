import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Travelingo from './travelingo-quiz.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Travelingo />
  </StrictMode>,
);
