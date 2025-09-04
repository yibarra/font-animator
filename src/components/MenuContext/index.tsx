import { useState, useEffect, useRef, useCallback } from 'react'

import type { SmartContextMenuProps } from './interfaces'
import { useMainStore } from '../../contexts/Main/store';

const SmartContextMenu = ({ children, menuItems }: SmartContextMenuProps) => {
  const { isVisible, setIsVisible } = useMainStore()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // position
  const calculateMenuPosition = useCallback((clientX: number, clientY: number) => {
    const menuWidth = menuRef.current ? menuRef.current.offsetWidth : 0;
    const menuHeight = menuRef.current ? menuRef.current.offsetHeight : 0;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newX = clientX;
    let newY = clientY;

    if (clientX + menuWidth > viewportWidth) {
      newX = viewportWidth - menuWidth;
    }

    if (clientY + menuHeight > viewportHeight) {
      newY = viewportHeight - menuHeight;
    }

    setPosition({ x: newX, y: newY })
  }, [])

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault()

    setIsVisible(true)
    calculateMenuPosition(event.clientX, event.clientY)
  }, [calculateMenuPosition, setIsVisible])

  // scroll
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsVisible(false)
    }
  }, [setIsVisible])

  const handleScroll = useCallback(() => setIsVisible(false), [setIsVisible])

  // event listeners ---
  useEffect(() => {
    const containerElement = containerRef.current

    if (containerElement) {
      containerElement.addEventListener('contextmenu', handleContextMenu)
    }

    if (isVisible) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('scroll', handleScroll)

      window.addEventListener('resize', () => {
        if (menuRef.current) {
          calculateMenuPosition(position.x, position.y)
        }
      })
    }

    // event listeners
    return () => {
      if (containerElement) {
        containerElement.removeEventListener('contextmenu', handleContextMenu)
      }
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('scroll', handleScroll)

      window.removeEventListener('resize', () => { /* remove listener */ })
    }
  }, [handleContextMenu, handleClickOutside, handleScroll, isVisible, calculateMenuPosition, position])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        position: 'relative',
        width: '100%',
      }}
    >
      {children}

      {isVisible && (
        <div
          ref={menuRef}
          style={{
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
            left: position.x,
            position: 'fixed',
            top: position.y,
            zIndex: 1000,
          }}
        >
          {menuItems}
        </div>
      )}
    </div>
  )
}

SmartContextMenu.displayName = 'Glyph.MenuContext'
export default SmartContextMenu