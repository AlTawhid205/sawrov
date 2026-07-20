import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { TREES_DATA } from '../data/treesData';
import { X, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, TreePine, RefreshCw } from 'lucide-react';

export default function TreeQuizModal() {
  const { setActiveModal, addToCart } = useShop();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    space: 'medium', // small, medium, large, patio
    goal: 'shade', // shade, privacy, flowering, fruit, wildlife
    sun: 'full', // full, partial
    maintenance: 'low' // low, moderate
  });

  const [matches, setMatches] = useState(null);

  const calculateMatches = () => {
    // Score each tree based on answers
    const scored = TREES_DATA.map(tree => {
      let score = 0;

      // Space match
      if (answers.space === 'patio' && (tree.category === 'fruit' || tree.matureHeight.includes('15') || tree.id.includes('lemon') || tree.id.includes('maple'))) score += 3;
      if (answers.space === 'small' && parseInt(tree.matureHeight) <= 30) score += 3;
      if (answers.space === 'large' && (tree.category === 'shade' || parseInt(tree.matureHeight) >= 40)) score += 3;

      // Goal match
      if (answers.goal === 'shade' && (tree.category === 'shade' || tree.category === 'native')) score += 4;
      if (answers.goal === 'privacy' && tree.category === 'evergreen') score += 4;
      if (answers.goal === 'flowering' && tree.category === 'flowering') score += 4;
      if (answers.goal === 'fruit' && tree.category === 'fruit') score += 4;
      if (answers.goal === 'wildlife' && (tree.badge.includes('Pollinator') || tree.category === 'native')) score += 4;

      // Sun match
      if (answers.sun === 'full' && tree.sunlight.includes('Full')) score += 2;
      if (answers.sun === 'partial' && tree.sunlight.includes('Partial')) score += 2;

      // Maintenance
      if (answers.maintenance === 'low' && (tree.water.includes('Low') || tree.category === 'evergreen')) score += 2;

      return { tree, score };
    });

    scored.sort((a, b) => b.score - a.score);
    setMatches(scored.slice(0, 3).map(s => s.tree));
    setStep(5); // Show results
  };

  const restartQuiz = () => {
    setStep(1);
    setMatches(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div className="modal-content quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
          <X size={20} />
        </button>

        <div className="quiz-header">
          <div className="badge-pill-gold">
            <Sparkles size={14} />
            <span>Smart Canopy Matcher</span>
          </div>
          <h2>Find Your Perfect Tree Companion</h2>
          {step <= 4 && (
            <div className="quiz-progress-bar">
              <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
          )}
        </div>

        {/* Step 1: Space */}
        {step === 1 && (
          <div className="quiz-step-body">
            <h3>Step 1 of 4: How much space do you have available?</h3>
            <div className="quiz-options-grid">
              <button
                className={`quiz-option-card ${answers.space === 'patio' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, space: 'patio' }))}
              >
                <h4>Patio / Balcony Container</h4>
                <p>Limited space, thrives in pots or compact planters (under 10 ft)</p>
              </button>

              <button
                className={`quiz-option-card ${answers.space === 'small' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, space: 'small' }))}
              >
                <h4>Small Urban Yard</h4>
                <p>Front lawn, courtyard, or garden bed (15 - 25 ft height)</p>
              </button>

              <button
                className={`quiz-option-card ${answers.space === 'medium' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, space: 'medium' }))}
              >
                <h4>Medium Suburban Lawn</h4>
                <p>Standard backyard space for medium shade & fruit trees (25 - 40 ft)</p>
              </button>

              <button
                className={`quiz-option-card ${answers.space === 'large' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, space: 'large' }))}
              >
                <h4>Large Estate / Open Acreage</h4>
                <p>Generous space for majestic oaks, poplars & sequoias (50+ ft)</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Main Goal */}
        {step === 2 && (
          <div className="quiz-step-body">
            <h3>Step 2 of 4: What is your primary garden goal?</h3>
            <div className="quiz-options-grid">
              <button
                className={`quiz-option-card ${answers.goal === 'shade' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, goal: 'shade' }))}
              >
                <h4>Cooling Shade & Energy Offset</h4>
                <p>Block harsh afternoon summer sun & lower home AC costs</p>
              </button>

              <button
                className={`quiz-option-card ${answers.goal === 'privacy' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, goal: 'privacy' }))}
              >
                <h4>Year-Round Privacy Screen</h4>
                <p>Evergreen dense foliage to block neighbors or road noise</p>
              </button>

              <button
                className={`quiz-option-card ${answers.goal === 'flowering' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, goal: 'flowering' }))}
              >
                <h4>Spring Blooms & Focal Beauty</h4>
                <p>Vibrant flowers, red foliage, or weeping architecture</p>
              </button>

              <button
                className={`quiz-option-card ${answers.goal === 'fruit' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, goal: 'fruit' }))}
              >
                <h4>Fresh Homegrown Harvest</h4>
                <p>Crisp apples, sweet cherries, or fresh patio lemons</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Sun Exposure */}
        {step === 3 && (
          <div className="quiz-step-body">
            <h3>Step 3 of 4: How much daily direct sunlight does the spot receive?</h3>
            <div className="quiz-options-grid">
              <button
                className={`quiz-option-card ${answers.sun === 'full' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, sun: 'full' }))}
              >
                <h4>Full Direct Sun</h4>
                <p>6+ hours of uninterrupted direct sunlight daily</p>
              </button>

              <button
                className={`quiz-option-card ${answers.sun === 'partial' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, sun: 'partial' }))}
              >
                <h4>Partial Sun / Filtered Shade</h4>
                <p>3 to 5 hours of sun or dappled light under taller canopy</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Maintenance */}
        {step === 4 && (
          <div className="quiz-step-body">
            <h3>Step 4 of 4: What is your preferred maintenance level?</h3>
            <div className="quiz-options-grid">
              <button
                className={`quiz-option-card ${answers.maintenance === 'low' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, maintenance: 'low' }))}
              >
                <h4>Low Maintenance (Drought Hardy)</h4>
                <p>Minimal pruning and watering once established</p>
              </button>

              <button
                className={`quiz-option-card ${answers.maintenance === 'moderate' ? 'selected' : ''}`}
                onClick={() => setAnswers(prev => ({ ...prev, maintenance: 'moderate' }))}
              >
                <h4>Green Thumb Enthusiast</h4>
                <p>Enjoy seasonal pruning, fruit harvesting, and care</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Quiz Results */}
        {step === 5 && matches && (
          <div className="quiz-results-body">
            <div className="results-badge">
              <CheckCircle2 size={24} className="icon-emerald" />
              <span>We Found Your Top 3 Canopy Matches!</span>
            </div>

            <div className="matched-trees-grid">
              {matches.map((tree, idx) => (
                <div key={tree.id} className="matched-tree-card">
                  <div className="match-rank-tag">#{idx + 1} Best Match</div>
                  <img src={tree.image} alt={tree.name} className="matched-tree-img" />
                  <div className="matched-tree-content">
                    <span className="botanical">{tree.botanicalName}</span>
                    <h4>{tree.name}</h4>
                    <p className="matched-reason">{tree.highlights[0]}</p>

                    <div className="matched-card-footer">
                      <span className="matched-price">${tree.variants[1]?.price || tree.variants[0].price}</span>
                      <button
                        className="btn-primary btn-sm"
                        onClick={() => {
                          setActiveModal({ type: 'detail', tree });
                        }}
                      >
                        View & Configure
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="quiz-footer-nav">
          {step > 1 && step <= 4 && (
            <button className="btn-glass" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {step < 4 && (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>
              Next Step <ArrowRight size={16} />
            </button>
          )}

          {step === 4 && (
            <button className="btn-primary btn-gold" onClick={calculateMatches}>
              <Sparkles size={16} /> See My Matches!
            </button>
          )}

          {step === 5 && (
            <button className="btn-glass" onClick={restartQuiz}>
              <RefreshCw size={16} /> Retake Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
