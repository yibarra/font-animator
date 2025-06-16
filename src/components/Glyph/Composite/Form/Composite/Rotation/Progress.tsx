import React from 'react';

import styles from './styles.module.scss'

interface CircleProgressBarSVGProps {
  percentage: number; // Valor de 0 a 100
  size?: number;      // Diâmetro total do SVG (padrão: 100)
  strokeWidth?: number; // Largura da linha do progresso (padrão: 10)
  color?: string;     // Cor do progresso (padrão: #4CAF50)
  backgroundColor?: string; // Cor de fundo da linha (padrão: #e0e0e0)
}

const CircleProgressBarSVG: React.FC<CircleProgressBarSVGProps> = ({
  percentage,
  size = 100,
  strokeWidth = 10,
  color = '#4CAF50', // Verde padrão
  backgroundColor = '#e0e0e0', // Cinza claro padrão
}) => {
  // Garante que a porcentagem esteja entre 0 e 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Raio do círculo interno (excluindo a metade da largura do traço)
  const radius = (size - strokeWidth) / 2;

  // Perímetro do círculo (2 * PI * Raio)
  const circumference = 2 * Math.PI * radius;

  // O "offset" é o quanto da linha NÃO está visível.
  // Para 0% de progresso, o offset deve ser igual ao perímetro (linha toda escondida).
  // Para 100% de progresso, o offset deve ser 0 (linha toda visível).
  const strokeDashoffsetValue = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div
      className="circle-progress-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        // Passa variáveis CSS para o controle via CSS
        '--stroke-dashoffset': strokeDashoffsetValue, // Controlado pelo JS no React
        '--progress-color': color,
        '--bg-color': backgroundColor,
      } as React.CSSProperties} // O cast é necessário para que TypeScript não reclame das variáveis customizadas
    >
      <svg
        className={styles['circle-progress-svg']}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`} // Define a área de visualização do SVG
      >
        {/* Círculo de Fundo (o "trilho" cinza) */}
        <circle
          className={styles['circle-progress-background']}
          cx={size / 2} // Centro X do SVG
          cy={size / 2} // Centro Y do SVG
          r={radius} // Raio do círculo
          strokeWidth={strokeWidth} // Largura do traço
          fill="transparent" // Círculo vazio
          stroke={backgroundColor} // Cor do fundo do traço
        />

        {/* Círculo de Progresso (o "preenchimento" verde) */}
        <circle
          className={styles['circle-progress-fill']}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          stroke={color} // Cor do progresso
          strokeDasharray={circumference} // Comprimento total da linha
          strokeDashoffset={circumference} // Inicia totalmente escondido (será animado pelo CSS)
          strokeLinecap="round" // Pontas arredondadas para o traço
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Gira para o 0% começar no topo
        />
      </svg>
      {/* Texto do percentual */}
      <div className={styles['circle-progress-text']} style={{ fontSize: `${size / 4}px` }}>
        {clampedPercentage}%
      </div>
    </div>
  );
};

export default CircleProgressBarSVG;