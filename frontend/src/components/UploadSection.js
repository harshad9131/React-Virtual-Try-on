import React, { useState } from 'react';

function UploadSection({ type, title, icon, uploadIcon, fileRef, preview, info, showDiscard, onFileSelect, onDiscard }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleAreaClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleDiscardClick = (e) => {
    e.stopPropagation();
    onDiscard();
  };

  return (
    <div className="upload-section">
      <h3><i className={`fas ${icon}`}></i> {title}</h3>
      <div
        className={`upload-area ${isDragging ? 'dragover' : ''}`}
        id={`${type}UploadArea`}
        onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <i className={`fas ${uploadIcon}`}></i>
        </div>
        <div className="upload-text">Click or drag your photo here</div>
        <div className="upload-hint">Supports JPG, PNG, GIF</div>
        <input
          ref={fileRef}
          type="file"
          id={`${type}File`}
          className="file-input"
          accept="image/*"
          onChange={handleFileInput}
        />
      </div>
      <div className="preview-container" id={`${type}Preview`}>
        {showDiscard && (
          <button
            className="discard-btn"
            id={`discard${type.charAt(0).toUpperCase() + type.slice(1)}Btn`}
            onClick={handleDiscardClick}
            style={{ display: 'inline-flex' }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        {preview && (
          <img
            id={`${type}Image`}
            className="preview-image"
            src={preview}
            alt={`${type} preview`}
            style={{ display: 'block' }}
          />
        )}
        {info && (
          <div className="image-info" id={`${type}Info`} style={{ display: 'block' }}>
            <div><strong>File:</strong> {info.name}</div>
            <div><strong>Size:</strong> {info.size} MB</div>
            <div><strong>Type:</strong> {info.type}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadSection;

