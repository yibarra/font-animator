import type { Font } from 'fontkit'

declare module 'fontkit' {
  // Re-declara la función 'create' con las sobrecargas que necesitamos.
  // La primera línea mantiene la declaración original de Node.js Buffer si existe.
  // Las siguientes dos líneas añaden las sobrecargas para ArrayBuffer y Uint8Array.
  
  // Puedes dejar la original si está definida en @types/fontkit:
  // export function create(buffer: Buffer): Font; 
  
  // Añade estas sobrecargas para ArrayBuffer y Uint8Array
  export function create(buffer: ArrayBuffer): Font;
  export function create(buffer: Uint8Array): Font;
}