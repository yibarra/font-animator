// src/components/SmartContextMenu.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SmartContextMenuProps {
  children: React.ReactNode; // El contenido que se hará clic derecho
  menuItems: React.ReactNode; // Los ítems del menú contextual en sí
}

const SmartContextMenu: React.FC<SmartContextMenuProps> = ({ children, menuItems }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null); // Referencia al div del menú
  const containerRef = useRef<HTMLDivElement>(null); // Referencia al div donde se detectará el clic

  // Define el padding mínimo deseado desde los bordes
  const PADDING = 30; // 30px de padding

  // --- Lógica de Posicionamiento Inteligente con Padding ---
  const calculateMenuPosition = useCallback((clientX: number, clientY: number) => {
    const menuWidth = menuRef.current ? menuRef.current.offsetWidth : 0;
    const menuHeight = menuRef.current ? menuRef.current.offsetHeight : 0;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newX = clientX;
    let newY = clientY;

    // Ajustar si se sale por la derecha
    // Si (posición del clic + ancho del menú) > (ancho del viewport - PADDING)
    if (clientX + menuWidth > viewportWidth - PADDING) {
      newX = viewportWidth - menuWidth - PADDING;
    }
    // Ajustar si se sale por abajo
    // Si (posición del clic + alto del menú) > (alto del viewport - PADDING)
    if (clientY + menuHeight > viewportHeight - PADDING) {
      newY = viewportHeight - menuHeight - PADDING;
    }

    // Ajustar si se sale por la izquierda
    // Si la nueva posición es menor que el PADDING, ajustarla a PADDING
    if (newX < PADDING) {
      newX = PADDING;
    }
    // Ajustar si se sale por arriba
    // Si la nueva posición es menor que el PADDING, ajustarla a PADDING
    if (newY < PADDING) {
      newY = PADDING;
    }

    setPosition({ x: newX, y: newY });
  }, []); // No tiene dependencias externas, se puede memoizar

  // --- Manejador del Clic Derecho (contextmenu) ---
  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault(); // Evita el menú contextual nativo del navegador
    setIsVisible(true);
    calculateMenuPosition(event.clientX, event.clientY);
  }, [calculateMenuPosition]);

  // --- Manejador para ocultar el menú al hacer clic fuera o al scrollear ---
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    setIsVisible(false); // Oculta el menú si el usuario scrollea
  }, []);

  // --- Efectos para añadir/quitar event listeners ---
  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      containerElement.addEventListener('contextmenu', handleContextMenu);
    }

    if (isVisible) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
      // Opcional: Re-calcular posición si la ventana cambia de tamaño mientras el menú está abierto
      window.addEventListener('resize', () => {
        if (menuRef.current) { // Solo si el menú ya está renderizado
            calculateMenuPosition(position.x, position.y); // Usar la última posición para reajustar
        }
      });
    }

    // Limpieza de event listeners
    return () => {
      if (containerElement) {
        containerElement.removeEventListener('contextmenu', handleContextMenu);
      }
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => { /* remove listener */ }); // Se requiere un manejador con nombre para remover
    };
  }, [handleContextMenu, handleClickOutside, handleScroll, isVisible, calculateMenuPosition, position]); // Añadimos 'position' a las dependencias si se usa en resize

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {children}

      {isVisible && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            backgroundColor: '#FFF',
            border: '1px solid #CCC',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
            zIndex: 1000,
            padding: '8px 0',
            minWidth: '150px',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {menuItems}
        </div>
      )}
    </div>
  );
};

export default SmartContextMenu;