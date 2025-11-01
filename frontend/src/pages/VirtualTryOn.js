import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import UploadSection from '../components/UploadSection';
import ActionButtons from '../components/ActionButtons';
import ResultSection from '../components/ResultSection';
import TipsSection from '../components/TipsSection';

function VirtualTryOn() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  const [personFile, setPersonFile] = useState(null);
  const [clothingFile, setClothingFile] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);
  const [clothingPreview, setClothingPreview] = useState(null);
  const [personInfo, setPersonInfo] = useState(null);
  const [clothingInfo, setClothingInfo] = useState(null);
  const [showPersonDiscard, setShowPersonDiscard] = useState(false);
  const [showClothingDiscard, setShowClothingDiscard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const personFileRef = useRef(null);
  const clothingFileRef = useRef(null);

  const handleFileSelect = (file, type) => {
    if (!file.type.startsWith('image/')) {
      showErrorMessage('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'person') {
        setPersonFile(file);
        setPersonPreview(e.target.result);
        setShowPersonDiscard(true);
        showImageInfo(file, 'person');
      } else {
        setClothingFile(file);
        setClothingPreview(e.target.result);
        setShowClothingDiscard(true);
        showImageInfo(file, 'clothing');
      }
    };
    reader.readAsDataURL(file);

    validateImages(file, type);
  };

  const showImageInfo = (file, type) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const info = {
      name: file.name,
      size: sizeInMB,
      type: file.type
    };

    if (type === 'person') {
      setPersonInfo(info);
    } else {
      setClothingInfo(info);
    }
  };

  const discardImage = (type) => {
    if (type === 'person') {
      setPersonFile(null);
      setPersonPreview(null);
      setPersonInfo(null);
      setShowPersonDiscard(false);
      if (personFileRef.current) personFileRef.current.value = '';
    } else {
      setClothingFile(null);
      setClothingPreview(null);
      setClothingInfo(null);
      setShowClothingDiscard(false);
      if (clothingFileRef.current) clothingFileRef.current.value = '';
    }
    hideMessages();
    setShowProgress(false);
  };

  const validateImages = async (newFile, type) => {
    const currentPersonFile = type === 'person' ? newFile : personFile;
    const currentClothingFile = type === 'clothing' ? newFile : clothingFile;

    if (!currentPersonFile || !currentClothingFile) return;

    try {
      const formData = new FormData();
      formData.append('avatar_image', currentPersonFile);
      formData.append('clothing_image', currentClothingFile);

      const response = await fetch('http://localhost:8000/api/validate-images', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const validation = await response.json();
        if (validation.recommendations.length > 0) {
          const recommendations = validation.recommendations.join('<br>');
          showErrorMessage(`Image recommendations:<br>${recommendations}`, false);
        }
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const performTryOn = async () => {
    if (!personFile || !clothingFile) {
      showErrorMessage('Please upload both a person photo and clothing item.');
      return;
    }

    setLoading(true);
    setShowProgress(true);
    setProgress(0);
    hideMessages();

    try {
      const formData = new FormData();
      formData.append('avatar_image', personFile);
      formData.append('clothing_image', clothingFile);

      // Simulate progress
      setProgress(20);
      await delay(1000);
      setProgress(40);
      await delay(1000);
      setProgress(60);

      const response = await fetch('http://localhost:8000/tryon/', {
        method: 'POST',
        body: formData
      });

      setProgress(80);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setProgress(100);
      setResultImage(imageUrl);
      setResultBlob(blob);

      setLoading(false);
      setShowProgress(false);
      showSuccessMessage('Virtual try-on completed successfully!');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setShowProgress(false);
      showErrorMessage(`Failed to process virtual try-on: ${error.message}`);
    }
  };

  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const downloadResult = () => {
    if (resultBlob) {
      const url = URL.createObjectURL(resultBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'virtual-tryon-result.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const reset = () => {
    setPersonFile(null);
    setClothingFile(null);
    setPersonPreview(null);
    setClothingPreview(null);
    setPersonInfo(null);
    setClothingInfo(null);
    setShowPersonDiscard(false);
    setShowClothingDiscard(false);
    setResultImage(null);
    setResultBlob(null);
    setShowProgress(false);
    setProgress(0);
    if (personFileRef.current) personFileRef.current.value = '';
    if (clothingFileRef.current) clothingFileRef.current.value = '';
    hideMessages();
  };

  const showErrorMessage = (message, isError = true) => {
    setErrorMessage(message);
    setShowError(true);
    setShowSuccess(false);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setShowError(false);
  };

  const hideMessages = () => {
    setShowError(false);
    setShowSuccess(false);
  };

  return (
    <div className="container">
      <Header />
      
      <div className="main-content">
        <UploadSection
          type="person"
          title="Your Photo"
          icon="fa-user"
          uploadIcon="fa-user-circle"
          fileRef={personFileRef}
          preview={personPreview}
          info={personInfo}
          showDiscard={showPersonDiscard}
          onFileSelect={(file) => handleFileSelect(file, 'person')}
          onDiscard={() => discardImage('person')}
        />

        <UploadSection
          type="clothing"
          title="Clothing Item"
          icon="fa-tshirt"
          uploadIcon="fa-tshirt"
          fileRef={clothingFileRef}
          preview={clothingPreview}
          info={clothingInfo}
          showDiscard={showClothingDiscard}
          onFileSelect={(file) => handleFileSelect(file, 'clothing')}
          onDiscard={() => discardImage('clothing')}
        />
      </div>

      <ActionButtons
        onTryOn={performTryOn}
        onReset={reset}
        disabled={!personFile || !clothingFile || loading}
      />

      <ResultSection
        loading={loading}
        progress={progress}
        showProgress={showProgress}
        resultImage={resultImage}
        errorMessage={errorMessage}
        successMessage={successMessage}
        showError={showError}
        showSuccess={showSuccess}
        onDownload={downloadResult}
      />

      <TipsSection />
    </div>
  );
}

export default VirtualTryOn;

