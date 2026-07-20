import React, { useState } from 'react';
import { Leaf, Wind, Car, Flame, TreePine } from 'lucide-react';

export default function EcoCalculatorBanner() {
  const [treeCount, setTreeCount] = useState(3);

  const annualCo2PerTree = 38; // average kg/year
  const totalCo2Annual = treeCount * annualCo2PerTree;
  const lifetimeCo2 = totalCo2Annual * 40; // 40 year horizon
  const carMilesOffset = Math.round(totalCo2Annual * 2.5); // approx 2.5 miles per kg CO2
  const oxygenPeople = (treeCount * 2).toFixed(1); // 1 tree produces enough O2 for 2 people/yr

  return (
    <section className="eco-calculator-section">
      <div className="container">
        <div className="eco-card">
          <div className="eco-header">
            <div className="badge-pill-emerald">
              <Leaf size={14} />
              <span>Interactive Environmental Calculator</span>
            </div>
            <h2>Calculate Your Yard's Lifetime Eco-Impact</h2>
            <p>Trees are nature's most effective carbon capture technology. Adjust the slider to measure your canopy contribution.</p>
          </div>

          <div className="eco-calculator-body">
            <div className="slider-control-group">
              <div className="slider-label-row">
                <span className="label-text">Number of trees in your garden plan:</span>
                <span className="tree-count-display">{treeCount} {treeCount === 1 ? 'Tree' : 'Trees'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={treeCount}
                onChange={(e) => setTreeCount(Number(e.target.value))}
                className="eco-slider"
              />
              <div className="slider-ticks">
                <span>1 Tree</span>
                <span>5 Trees</span>
                <span>10 Trees</span>
                <span>15 Trees</span>
                <span>25 Trees</span>
              </div>
            </div>

            <div className="eco-metrics-grid">
              <div className="metric-box">
                <div className="metric-icon-bg bg-emerald">
                  <Wind size={22} />
                </div>
                <div className="metric-value">{totalCo2Annual} <span className="unit">kg/yr</span></div>
                <div className="metric-label">Annual CO₂ Captured</div>
                <div className="metric-sub">({lifetimeCo2.toLocaleString()} kg over 40 yrs)</div>
              </div>

              <div className="metric-box">
                <div className="metric-icon-bg bg-blue">
                  <Car size={22} />
                </div>
                <div className="metric-value">{carMilesOffset.toLocaleString()} <span className="unit">mi/yr</span></div>
                <div className="metric-label">Car Driving Miles Neutralized</div>
                <div className="metric-sub">Equivalent gas vehicle emissions</div>
              </div>

              <div className="metric-box">
                <div className="metric-icon-bg bg-gold">
                  <Leaf size={22} />
                </div>
                <div className="metric-value">{oxygenPeople} <span className="unit">people</span></div>
                <div className="metric-label">Fresh Oxygen Provision</div>
                <div className="metric-sub">Sustains annual oxygen needs</div>
              </div>

              <div className="metric-box">
                <div className="metric-icon-bg bg-green">
                  <Flame size={22} />
                </div>
                <div className="metric-value">-10°F</div>
                <div className="metric-label">Micro-Climate Cooling</div>
                <div className="metric-sub">Lowers summer home cooling costs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
