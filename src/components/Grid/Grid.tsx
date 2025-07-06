import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'; // Importación correcta de Konva Context

interface GridProps {
  offsetX: number;
  offsetY: number;
  cellSize: number; // Tu 'step' ahora es 'cellSize'
  gridColor: string; // Tu '#888' ahora es 'gridColor'
}

// Usamos React.memo para optimizar, solo redibujar si los props cambian
const Grid = ({ offsetX, offsetY, cellSize, gridColor }: GridProps) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const draw = (ctx: Context) => {
    // *** Adaptación de tu lógica original al contexto de Konva ***

    // Las transformaciones del Stage (offsetX, offsetY) ya mueven el contexto general.
    // Aquí, dentro de la sceneFunc, ctx.setTransform(1,0,0,1,0,0) NO es necesario,
    // ya que Konva lo maneja por ti y solo afecta a esta Shape.
    // Los x,y,width,height de la Shape se consideran como la posición del origen.
    // Tu lógica original de `left`, `top`, `right`, `bottom` calculaba un área
    // fija del canvas. Aquí necesitamos que sea dinámica al movimiento.

    // Calculamos el viewport del canvas en el sistema de coordenadas del Stage/Layer
    // (que es donde se dibuja el Shape).
    // Si el Stage se ha movido (ej. offsetX = -50), el viewport "empieza" en +50
    // en el sistema de coordenadas del Layer.
    const viewportLeft = -offsetX;
    const viewportTop = -offsetY;
    const viewportRight = viewportLeft + width;
    const viewportBottom = viewportTop + height;

    // Tu `step` es ahora `cellSize`
    const step = cellSize;

    // Ajusta los límites de dibujo para que siempre cubran el área visible y más allá
    // para el efecto infinito. `Math.floor` asegura la alineación con la cuadrícula.
    const drawLeft = Math.floor(viewportLeft / step) * step - step; // Un colchón a la izquierda
    const drawTop = Math.floor(viewportTop / step) * step - step;   // Un colchón arriba
    const drawRight = viewportRight + step * 2; // Un colchón a la derecha
    const drawBottom = viewportBottom + step * 2; // Un colchón abajo

    // Limpiamos el área que vamos a redibujar
    ctx.clearRect(drawLeft, drawTop, drawRight - drawLeft, drawBottom - drawTop);

    ctx.beginPath();
    ctx.strokeStyle = gridColor; // Usa el color pasado por props
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 0.1; // Puedes hacerla configurable si quieres

    // Dibuja líneas verticales
    for (let x = drawLeft; x < drawRight; x += step) {
      ctx.moveTo(x, drawTop);
      ctx.lineTo(x, drawBottom);
    }

    // Dibuja líneas horizontales
    for (let y = drawTop; y < drawBottom; y += step) {
      ctx.moveTo(drawLeft, y);
      ctx.lineTo(drawRight, y);
    }

    ctx.stroke();
  };

  return (
    <Shape
      listening={false}
      sceneFunc={draw}
      x={0}
      y={0}
    />
  );
}

Grid.displayName = 'Components.Grid'
export default Grid