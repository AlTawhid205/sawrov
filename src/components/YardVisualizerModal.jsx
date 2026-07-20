import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { TREES_DATA } from '../data/treesData';
import { X, LayoutGrid, Plus, Trash2, Move, ZoomIn, ZoomOut, RotateCcw, TreePine, Download } from 'lucide-react';

export default function YardVisualizerModal() {
  const { setActiveModal, addToCart } = useShop();

  const [selectedBg, setSelectedBg] = useState('lawn'); // 'lawn' | 'patio' | 'estate'

  const [placedTrees, setPlacedTrees] = useState([
    {
      instanceId: 1,
      treeId: 'japanese-maple-bloodgood',
      x: 25,
      y: 45,
      scale: 1.0
    },
    {
      instanceId: 2,
      treeId: 'blue-spruce-colorado',
      x: 70,
      y: 35,
      scale: 1.2
    }
  ]);

  const [selectedInstanceId, setSelectedInstanceId] = useState(1);
  const [draggingInstanceId, setDraggingInstanceId] = useState(null);

  const backgrounds = {
    lawn: {
      name: "Suburban Lawn & House",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
    },
    patio: {
      name: "Patio & Courtyard",
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    },
    estate: {
      name: "Open Forest Lawn",
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const addTreeToCanvas = (treeId) => {
    const newId = Date.now();
    setPlacedTrees(prev => [
      ...prev,
      {
        instanceId: newId,
        treeId,
        x: Math.floor(Math.random() * 60) + 20,
        y: Math.floor(Math.random() * 30) + 40,
        scale: 1.0
      }
    ]);
    setSelectedInstanceId(newId);
  };

  const removePlacedTree = (id) => {
    setPlacedTrees(prev => prev.filter(t => t.instanceId !== id));
    if (selectedInstanceId === id) setSelectedInstanceId(null);
  };

  const updateScale = (id, delta) => {
    setPlacedTrees(prev =>
      prev.map(t => (t.instanceId === id ? { ...t, scale: Math.max(0.5, Math.min(2.5, t.scale + delta)) } : t))
    );
  };

  // Dragging handling inside canvas relative percentages
  const handleCanvasMouseMove = (e) => {
    if (!draggingInstanceId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));

    setPlacedTrees(prev =>
      prev.map(t => (t.instanceId === draggingInstanceId ? { ...t, x: xPct, y: yPct } : t))
    );
  };

  const selectedTreeObj = placedTrees.find(pt => pt.instanceId === selectedInstanceId);
  const selectedTreeData = selectedTreeObj ? TREES_DATA.find(t => t.id === selectedTreeObj.treeId) : null;

  // Calculate total CO2 offset of placed visualizer trees
  const totalVisualizerCo2 = placedTrees.reduce((sum, pt) => {
    const tData = TREES_DATA.find(td => td.id === pt.treeId);
    return sum + (tData ? Math.round(tData.co2AbsorptionKgYr * pt.scale) : 0);
  }, 0);

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="modal-content visualizer-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
          <X size={20} />
        </button>

        <div className="visualizer-header">
          <div className="badge-pill-gold">
            <LayoutGrid size={14} />
            <span>Canopy Studio Interactive Layout</span>
          </div>
          <h2>Yard Canopy Visualizer</h2>
          <p>Drag trees onto your landscape backdrop to scale canopy height, test spacing, and measure combined eco-impact.</p>
        </div>

        <div className="visualizer-body-grid">
          {/* Main Interactive Stage */}
          <div
            className="visualizer-canvas-stage"
            style={{ backgroundImage: `url(${backgrounds[selectedBg].url})` }}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={() => setDraggingInstanceId(null)}
            onMouseLeave={() => setDraggingInstanceId(null)}
          >
            <div className="canvas-watermark">CANOPY STUDIO PREVIEW</div>

            {/* Placed Trees Overlay Layer */}
            {placedTrees.map(pt => {
              const treeData = TREES_DATA.find(t => t.id === pt.treeId);
              if (!treeData) return null;
              const isSelected = pt.instanceId === selectedInstanceId;

              return (
                <div
                  key={pt.instanceId}
                  className={`placed-tree-element ${isSelected ? 'selected' : ''}`}
                  style={{
                    left: `${pt.x}%`,
                    top: `${pt.y}%`,
                    transform: `translate(-50%, -100%) scale(${pt.scale})`,
                    zIndex: Math.floor(pt.y * 10)
                  }}
                  onMouseDown={() => {
                    setSelectedInstanceId(pt.instanceId);
                    setDraggingInstanceId(pt.instanceId);
                  }}
                >
                  <img src={treeData.image} alt={treeData.name} className="tree-cutout-img" />
                  <div className="tree-element-label">
                    <span>{treeData.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls & Sidebar Panel */}
          <div className="visualizer-controls-panel">
            {/* Background picker */}
            <div className="control-group">
              <label className="control-label">Landscape Backdrop:</label>
              <div className="bg-picker-row">
                {Object.keys(backgrounds).map(key => (
                  <button
                    key={key}
                    className={`bg-picker-btn ${selectedBg === key ? 'active' : ''}`}
                    onClick={() => setSelectedBg(key)}
                  >
                    {backgrounds[key].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Tree to Canvas Selector */}
            <div className="control-group">
              <label className="control-label">Add Tree to Canvas:</label>
              <div className="add-tree-scroll-list">
                {TREES_DATA.map(t => (
                  <button
                    key={t.id}
                    className="add-tree-chip"
                    onClick={() => addTreeToCanvas(t.id)}
                  >
                    <Plus size={12} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tree Inspector */}
            {selectedTreeObj && selectedTreeData ? (
              <div className="selected-tree-inspector">
                <h4>Selected Item: {selectedTreeData.name}</h4>
                <div className="scale-controls-row">
                  <span className="scale-label">Canopy Scale: {Math.round(selectedTreeObj.scale * 100)}%</span>
                  <div className="scale-btn-group">
                    <button onClick={() => updateScale(selectedTreeObj.instanceId, -0.1)}>
                      <ZoomOut size={14} />
                    </button>
                    <button onClick={() => updateScale(selectedTreeObj.instanceId, 0.1)}>
                      <ZoomIn size={14} />
                    </button>
                  </div>
                </div>

                <div className="inspector-actions">
                  <button
                    className="btn-danger-sm"
                    onClick={() => removePlacedTree(selectedTreeObj.instanceId)}
                  >
                    <Trash2 size={14} /> Remove Tree
                  </button>
                  <button
                    className="btn-primary-sm"
                    onClick={() => addToCart(selectedTreeData)}
                  >
                    Add to Cart (${selectedTreeData.variants[1]?.price})
                  </button>
                </div>
              </div>
            ) : (
              <div className="inspector-empty-state">
                <Move size={20} />
                <span>Click any tree on canvas to adjust height scale or move.</span>
              </div>
            )}

            {/* Yard Summary Stats */}
            <div className="yard-summary-box">
              <div className="summary-title">
                <TreePine size={16} className="icon-emerald" />
                <span>Garden Plan Summary</span>
              </div>
              <div className="summary-stat-row">
                <span>Total Trees Placed:</span>
                <strong>{placedTrees.length} Trees</strong>
              </div>
              <div className="summary-stat-row">
                <span>Estimated Annual CO₂ Absorption:</span>
                <strong className="text-emerald">{totalVisualizerCo2} kg / yr</strong>
              </div>
            </div>

            <div className="visualizer-footer-btns">
              <button className="btn-glass" onClick={() => setPlacedTrees([])}>
                <RotateCcw size={14} /> Clear Canvas
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  alert("Garden Layout saved! Your design will be shared with our arborist team upon order.");
                  setActiveModal(null);
                }}
              >
                <Download size={14} /> Save Yard Design
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
