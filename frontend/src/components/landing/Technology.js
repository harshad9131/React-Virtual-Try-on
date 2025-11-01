import React from 'react';

function Technology() {
  return (
    <section className="section">
      <h2 className="section-heading">Technology & Model Used</h2>
      <div className="section-content">
        <div className="tech-card">
          <h4>🔍 Human Parsing (Segmentation)</h4>
          <p>
            Our system uses advanced human parsing models like U2Net and Human Parser to accurately identify and segment different parts of the human body from uploaded photos. This enables precise detection of body regions, ensuring clothing items are placed correctly during the virtual try-on process.
          </p>
        </div>
        <div className="tech-card">
          <h4>🎨 Clothing Warping (TPS Transformation)</h4>
          <p>
            Thin Plate Spline (TPS) transformation is employed to warp and deform clothing images to match the pose and body shape of the person in the photo. This geometric transformation ensures that clothing items appear natural and well-fitted when virtually applied to the user's image.
          </p>
        </div>
        <div className="tech-card">
          <h4>✨ Image Synthesis (Blending & Generation)</h4>
          <p>
            The final stage involves sophisticated image synthesis techniques that blend the warped clothing item seamlessly with the person's photo. Advanced deep learning models handle lighting, shadows, textures, and fine details to generate photorealistic results that look as if the clothing was actually worn in the original photograph.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Technology;

