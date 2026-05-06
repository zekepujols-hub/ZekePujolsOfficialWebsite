document.addEventListener('DOMContentLoaded', () => {
    // Facade embed logic for audio/videos
    const placeholders = document.querySelectorAll('.embed-placeholder');
    
    placeholders.forEach(el => {
        el.addEventListener('click', () => {
            const type = el.getAttribute('data-type');
            const placeholderId = el.getAttribute('data-id'); // e.g., {{SPOTIFY_ARTIST_URL}}
            
            // Generate iframe HTML based on type
            let iframeHtml = '';
            
            if (type === 'youtube') {
                iframeHtml = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${placeholderId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
            } else if (type === 'spotify') {
                iframeHtml = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/${placeholderId}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
            } else if (type === 'apple') {
                iframeHtml = `<iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/${placeholderId}" loading="lazy"></iframe>`;
            } else if (type === 'soundcloud') {
                iframeHtml = `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=${placeholderId}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" loading="lazy"></iframe>`;
            }

            if (iframeHtml) {
                el.innerHTML = iframeHtml;
                el.style.border = 'none';
                el.style.padding = '0';
                el.style.background = 'transparent';
                el.classList.remove('embed-placeholder');
            }
        });
    });

    // --- GLOBAL PARALLAX EFFECT ---
    const parallaxHTML = `
      <div class="global-parallax">
        <div class="parallax-layer parallax-layer-1" id="bg-parallax-1"></div>
        <div class="parallax-layer parallax-layer-2" id="bg-parallax-2"></div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', parallaxHTML);

    const bg1 = document.getElementById('bg-parallax-1');
    const bg2 = document.getElementById('bg-parallax-2');
    
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
        // Subtle background texture movement
        if (bg1) bg1.style.transform = `translate3d(0, ${lastScrollY * -0.05}px, 0)`;
        if (bg2) bg2.style.transform = `translate3d(0, ${lastScrollY * -0.15}px, 0)`;
        
        ticking = false;
    };

    // Initial call to set positions accurately
    updateParallax();

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
});
