document.addEventListener('DOMContentLoaded', () => {
    const rocket = document.querySelector('.arun');
    const mainParachute = document.querySelector('.parachute');
    const smallParachutes = document.querySelectorAll('.parachute-small');
    const launchBtn = document.querySelector('.launch-btn');
    const ground = document.querySelector('.ground');
    let isAnimating = false;

    function resetAnimation() {
        rocket.style.transition = 'none';
        rocket.classList.remove('launching', 'descending');
        mainParachute.classList.remove('deployed', 'landing');
        smallParachutes.forEach(p => p.classList.remove('deployed', 'landing'));
        isAnimating = false;
        launchBtn.disabled = false;
        
        // Force a reflow
        void rocket.offsetHeight;
        
        // Restore transition
        setTimeout(() => {
            rocket.style.transition = '';
        }, 10);
    }

    function startLaunch() {
        if (isAnimating) return;
        isAnimating = true;
        launchBtn.disabled = true;

        // Launch sequence
        requestAnimationFrame(() => {
            // Start launch with longer duration and focus effect
            rocket.style.transition = 'transform 20s ease-in-out';
            rocket.classList.add('launching');

            // Show stars and moon during ascent
            document.body.classList.add('space-visible');

            // At peak height (after 20 seconds)
            setTimeout(() => {
                // Deploy main parachute first with swing effect
                mainParachute.classList.add('deployed');
                
                // Deploy small parachutes in sequence
                setTimeout(() => {
                    smallParachutes[0].classList.add('deployed');
                }, 1000);
                
                setTimeout(() => {
                    smallParachutes[1].classList.add('deployed');
                }, 2000);
                
                // Hold at peak for 10 seconds
                setTimeout(() => {
                    rocket.classList.remove('launching');
                    
                    // Add landing class to parachutes with sequence
                    mainParachute.classList.add('landing');
                    
                    setTimeout(() => {
                        smallParachutes[0].classList.add('landing');
                    }, 500);
                    
                    setTimeout(() => {
                        smallParachutes[1].classList.add('landing');
                    }, 1000);
                    
                    // Start descent with longer duration
                    setTimeout(() => {
                        rocket.style.transition = 'transform 30s ease-in-out';
                        rocket.classList.add('descending');
                        
                        // Show ground earlier in the descent
                        setTimeout(() => {
                            ground.style.opacity = '1';
                            ground.style.transform = 'translateY(0)';
                            document.body.classList.remove('space-visible');
                        }, 15000); // Show ground 15 seconds before landing
                        
                        // Reset after landing
                        setTimeout(resetAnimation, 30000);
                    }, 2000);
                }, 10000);
            }, 20000);
        });
    }

    // Start launch on button click
    launchBtn.addEventListener('click', startLaunch);

    // Keep parachutes visible during descent
    rocket.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform' && rocket.classList.contains('descending')) {
            setTimeout(() => {
                mainParachute.classList.remove('deployed', 'landing');
                smallParachutes.forEach(p => p.classList.remove('deployed', 'landing'));
            }, 3000);
        }
    });
});