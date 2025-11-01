import React from 'react';

function ResultSection({ loading, progress, showProgress, resultImage, errorMessage, successMessage, showError, showSuccess, onDownload }) {
  return (
    <div className="result-section">
      <h3><i className="fas fa-image"></i> Virtual Try-On Result</h3>
      {loading && (
        <div className="loading" id="loading" style={{ display: 'flex' }}>
          <div className="spinner"></div>
          <p>Creating your virtual try-on... This may take a moment.</p>
        </div>
      )}
      {showProgress && (
        <div className="progress-bar" id="progressBar" style={{ display: 'block' }}>
          <div className="progress-fill" id="progressFill" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      <div className="result-image-wrapper">
        {resultImage && (
          <img
            id="resultImage"
            className="result-image"
            src={resultImage}
            alt="Virtual try-on result"
            style={{ display: 'block' }}
          />
        )}
      </div>
      {resultImage && (
        <button className="download-btn" id="downloadBtn" onClick={onDownload} style={{ display: 'inline-block' }}>
          <i className="fas fa-download"></i> Download Result
        </button>
      )}
      {showError && (
        <div
          className="error-message"
          id="errorMessage"
          style={{ display: 'block' }}
          dangerouslySetInnerHTML={{ __html: errorMessage }}
        ></div>
      )}
      {showSuccess && (
        <div className="success-message" id="successMessage" style={{ display: 'block' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default ResultSection;

