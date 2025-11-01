import React from 'react';

function TipsSection() {
  return (
    <div className="tips-section">
      <h3><i className="fas fa-lightbulb"></i> Tips for Best Results</h3>
      <div className="tip-item">
        <span className="tip-icon golden-glow">👤</span>
        <div className="tip-content">
          <strong>Person Photo:</strong> Use clear, well-lit photos with good contrast. Face should be clearly visible.
        </div>
      </div>
      <div className="tip-item">
        <span className="tip-icon golden-glow">👕</span>
        <div className="tip-content">
          <strong>Clothing Item:</strong> Use high-quality images of clothing items on plain backgrounds for best results.
        </div>
      </div>
      <div className="tip-item">
        <span className="tip-icon golden-glow">🖼️</span>
        <div className="tip-content">
          <strong>Image Quality:</strong> Higher resolution images (512×512+ for person, 256×256+ for clothing) work better.
        </div>
      </div>
      <div className="tip-item">
        <span className="tip-icon golden-glow">⏱️</span>
        <div className="tip-content">
          <strong>Processing Time:</strong> Virtual try-on may take 30–60 seconds depending on image complexity.
        </div>
      </div>
    </div>
  );
}

export default TipsSection;

