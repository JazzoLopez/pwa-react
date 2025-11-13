import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Puedes alternar la app que quieres arrancar: App (localStorage) o AppIndexedDB (IndexedDB)
import AppIndexedDB from './AppIndexedDB.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <AppIndexedDB />
  </StrictMode>
)

// Registrar service worker para PWA (si está disponible)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Service worker registrado:', reg.scope)
    }).catch((err) => {
      console.warn('Error registrando service worker:', err)
    })
  })
}
