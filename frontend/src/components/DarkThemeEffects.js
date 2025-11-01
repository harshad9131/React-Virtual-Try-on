import { useEffect } from 'react';

function DarkThemeEffects() {
  useEffect(() => {
    // Mouse trail effect
    let trail = [];
    const trailLength = 25;

    const handleMouseMove = (e) => {
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

      if (trail.length > trailLength) {
        trail.shift();
      }

      renderTrail(trail);
    };

    const renderTrail = (trailArray) => {
      document.querySelectorAll('.mouse-trail').forEach(el => el.remove());

      trailArray.forEach((point, index) => {
        if (Date.now() - point.time > 150) return;

        const trailElement = document.createElement('div');
        trailElement.className = 'mouse-trail';
        trailElement.style.position = 'fixed';
        trailElement.style.left = point.x - 3 + 'px';
        trailElement.style.top = point.y - 3 + 'px';
        trailElement.style.width = '6px';
        trailElement.style.height = '6px';
        trailElement.style.background = `radial-gradient(circle, rgba(255, 215, 0, ${0.9 - index * 0.03}) 0%, rgba(212, 175, 55, ${0.6 - index * 0.02}) 50%, transparent 80%)`;
        trailElement.style.borderRadius = '50%';
        trailElement.style.pointerEvents = 'none';
        trailElement.style.zIndex = '9999';
        trailElement.style.transition = 'all 0.15s ease-out';
        trailElement.style.boxShadow = `0 0 ${8 + index * 2}px rgba(255, 215, 0, ${0.4 - index * 0.02})`;

        document.body.appendChild(trailElement);

        setTimeout(() => {
          if (trailElement.parentNode) {
            trailElement.parentNode.removeChild(trailElement);
          }
        }, 300);
      });
    };

    // Floating elements
    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.style.position = 'fixed';
      element.style.width = Math.random() * 6 + 2 + 'px';
      element.style.height = element.style.width;
      element.style.background = `radial-gradient(circle, rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`;
      element.style.borderRadius = '50%';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '1';
      element.style.left = Math.random() * window.innerWidth + 'px';
      element.style.top = window.innerHeight + 'px';
      element.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px rgba(212, 175, 55, 0.5)`;

      document.body.appendChild(element);

      const animate = () => {
        const x = Math.random() * window.innerWidth;
        const y = -50;
        element.style.transition = 'all 8s linear';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.opacity = '0';

        setTimeout(() => {
          element.style.left = Math.random() * window.innerWidth + 'px';
          element.style.top = window.innerHeight + 'px';
          element.style.opacity = '1';
          element.style.transition = 'none';
          animate();
        }, 8000);
      };

      setTimeout(animate, Math.random() * 5000);
    };

    // Glow effects
    const addGlowEffects = () => {
      const interactiveElements = document.querySelectorAll('.upload-area, .btn, .tip-item');
      
      interactiveElements.forEach(element => {
        const handleMouseEnter = () => {
          element.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.3)';
        };

        const handleMouseLeave = () => {
          element.style.boxShadow = '';
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < 15; i++) {
      createFloatingElement();
    }

    // Add glow effects after a short delay to ensure DOM is ready
    setTimeout(addGlowEffects, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
    };
  }, []);

  return null;
}

export default DarkThemeEffects;

