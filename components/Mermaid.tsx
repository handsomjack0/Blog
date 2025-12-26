import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'loose',
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setIsError(false);
      } catch (error) {
        console.error('Mermaid render failed:', error);
        setIsError(true);
      }
    };

    if (chart) {
      renderChart();
    }
  }, [chart]);

  if (isError) {
    return <div className="p-4 bg-red-50 text-red-600 rounded">Failed to render diagram</div>;
  }

  return (
    <div 
      className="mermaid-chart flex justify-center my-8 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};

export default Mermaid;