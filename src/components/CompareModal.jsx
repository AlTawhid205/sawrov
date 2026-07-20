import React from 'react';
import { useShop } from '../context/ShopContext';
import { TREES_DATA } from '../data/treesData';
import { X, Scale, Trash2, ShoppingBag, CheckCircle, Leaf, Sun, Droplets } from 'lucide-react';

export default function CompareModal() {
  const { compareList, toggleCompare, clearCompare, setActiveModal, addToCart } = useShop();

  const comparedTrees = TREES_DATA.filter(t => compareList.includes(t.id));

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="modal-content compare-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
          <X size={20} />
        </button>

        <div className="compare-header">
          <div className="badge-pill-gold">
            <Scale size={14} />
            <span>Arborist Side-by-Side Matrix</span>
          </div>
          <h2>Compare Trees Side-by-Side</h2>
          {comparedTrees.length > 0 && (
            <button className="btn-glass-sm" onClick={clearCompare}>
              <Trash2 size={14} /> Clear Matrix
            </button>
          )}
        </div>

        {comparedTrees.length === 0 ? (
          <div className="compare-empty-state">
            <Scale size={40} className="icon-emerald" />
            <h3>No trees selected for comparison yet</h3>
            <p>Check the "Compare" box on any tree card in the catalog to add up to 3 species here.</p>
            <button className="btn-primary" onClick={() => setActiveModal(null)}>
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="feature-col">Botanical Metric</th>
                  {comparedTrees.map(tree => (
                    <th key={tree.id} className="tree-col">
                      <div className="compare-tree-header">
                        <button
                          className="remove-compare-btn"
                          onClick={() => toggleCompare(tree.id)}
                          title="Remove tree"
                        >
                          <X size={14} />
                        </button>
                        <img src={tree.image} alt={tree.name} className="compare-thumb" />
                        <h4>{tree.name}</h4>
                        <span className="botanical">{tree.botanicalName}</span>
                        <div className="compare-price">${tree.variants[1]?.price || tree.variants[0].price}</div>
                        <button
                          className="btn-primary-sm"
                          onClick={() => addToCart(tree)}
                        >
                          <ShoppingBag size={14} /> Add
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-label">Category</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}><span className="category-pill">{t.category}</span></td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">CO₂ Offset Rate</td>
                  {comparedTrees.map(t => (
                    <td key={t.id} className="text-emerald"><strong>{t.co2AbsorptionKgYr} kg / year</strong></td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Sunlight Need</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}>{t.sunlight}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Water Requirement</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}>{t.water}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Growth Speed</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}>{t.growthRate}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Mature Dimensions</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}>{t.matureHeight} H × {t.matureSpread} W</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Hardiness Zones</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}>Zones {t.climateZones.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Soil Preference</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}>{t.soilPreference}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label">Fruit Harvest</td>
                  {comparedTrees.map(t => (
                    <td key={t.id}>{t.fruitHarvest || 'N/A (Ornamental)'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
