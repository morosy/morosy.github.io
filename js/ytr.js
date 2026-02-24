document.addEventListener('DOMContentLoaded', function() {
    // 説明文をテキストファイルから読み込む
    fetch('texts/explain/ytr.txt')
        .then(response => response.text())
        .then(text => {
            document.getElementById('description-text').textContent = text;
        })
        .catch(error => {
            console.error('Error loading description:', error);
            document.getElementById('description-text').textContent = 'YouTube の動画を必ず0:00から再生するChrome拡張機能です。';
        });

    // ===== Download Modal =====
    const chromeWebStoreUrl = 'https://chromewebstore.google.com/detail/youtube-restarter/onjegldflnliifjgmomfnccgjmmplaen';
    const githubUrl = 'https://github.com/morosy/YouTube-ReStarter/releases/tag/v1.0.0';

    const openBtn = document.getElementById('download-open-btn');
    const modalOverlay = document.getElementById('download-modal');
    const closeBtn = document.getElementById('download-close-btn');
    const chromeBtn = document.getElementById('download-chrome-btn');
    const githubBtn = document.getElementById('download-github-btn');

    function openModal() {
        modalOverlay.classList.add('is-open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('is-open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // 背景クリックで閉じる
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // ESCで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (chromeBtn) {
        chromeBtn.addEventListener('click', function() {
            window.open(chromeWebStoreUrl, '_blank', 'noopener,noreferrer');
            closeModal();
        });
    }

    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            window.open(githubUrl, '_blank', 'noopener,noreferrer');
            closeModal();
        });
    }
});
