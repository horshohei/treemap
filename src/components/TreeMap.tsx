"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataItem {
  title: string;
  volume: number;
  contents: string[];
  class: string;
}

interface TreeMapProps {
  data: DataItem[];
}

const classColors: { [key: string]: string } = {
  hokkaido: '#ff9999',
  tohoku: '#66b3ff',
  kanto: '#99ff99',
  chubu: '#ffcc99',
  kinki: '#c2c2f0',
  chugoku: '#ffb3e6',
  shikoku: '#c4e17f',
  kyushu: '#76D7C4'
};

const TreeMap: React.FC<TreeMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedContent, setSelectedContent] = useState<string[] | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = 800;
      const height = 600;

      const root = d3.hierarchy<{ children: DataItem[] } & DataItem>({ children: data } as any)
        .sum(d => d.volume)
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

      const treemap = d3.treemap<{ children: DataItem[] } & DataItem>()
        .size([width, height])
        .padding(1)
        .round(true);

      treemap(root);

      const nodes = svg
        .attr('width', width)
        .attr('height', height)
        .selectAll('g')
        .data(root.leaves() as Array<d3.HierarchyRectangularNode<{ children: DataItem[] } & DataItem>>)  // 型キャスト
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`);

      nodes.append('rect')
        .attr('id', d => (d.data.title))
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('fill', d => classColors[d.data.class as string])
        .on('click', (event, d) => setSelectedContent(d.data.contents));

      nodes.append('text')
        .attr('x', 5)
        .attr('y', 20)
        .text(d => `${d.data.title} (${d.data.volume})`)
        .attr('font-size', '15px')
        .attr('fill', 'black');
    }
  }, [data]);

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      {selectedContent && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">Contents</h2>
            <ul>
              {selectedContent.map((content, index) => (
                <li key={index} className="text-lg">{content}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setSelectedContent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeMap;
