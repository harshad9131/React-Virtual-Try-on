import React from 'react';

function ActionButtons({ onTryOn, onReset, disabled }) {
  return (
    <div className="action-buttons action-buttons-top">
      <button className="btn btn-primary" id="tryOnBtn" onClick={onTryOn} disabled={disabled}>
        <i className="fas fa-magic"></i> Try On Now
      </button>
      <button className="btn btn-secondary" id="resetBtn" onClick={onReset}>
        <i className="fas fa-refresh"></i> Reset
      </button>
    </div>
  );
}

export default ActionButtons;

