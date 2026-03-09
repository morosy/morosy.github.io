(function() {
    var STORAGE_KEY = 'theme';
    var DEFAULT_THEME = 'gray';

    function normalizeTheme(theme) {
        return theme === 'orange' || theme === 'purple' ? theme : DEFAULT_THEME;
    }

    function applyTheme(theme) {
        var normalized = normalizeTheme(theme);
        if (normalized === DEFAULT_THEME) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', normalized);
        }
        return normalized;
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (error) {
            console.warn('Unable to save theme:', error);
        }
    }

    function loadTheme() {
        try {
            return normalizeTheme(localStorage.getItem(STORAGE_KEY));
        } catch (error) {
            return DEFAULT_THEME;
        }
    }

    var currentTheme = applyTheme(loadTheme());

    document.addEventListener('DOMContentLoaded', function() {
        var styleButton = document.querySelector('.style-button');
        var styleOverlay = document.getElementById('style-overlay');
        var styleOverlayClose = document.querySelector('.style-overlay-close');
        var optionButtons = document.querySelectorAll('.style-option-button');

        function syncActiveState(theme) {
            optionButtons.forEach(function(button) {
                button.classList.toggle('active', button.getAttribute('data-theme') === theme);
            });
        }

        function closeOverlay() {
            if (styleOverlay) {
                styleOverlay.classList.add('hidden');
            }
        }

        function openOverlay() {
            if (styleOverlay) {
                styleOverlay.classList.remove('hidden');
            }
        }

        syncActiveState(currentTheme);

        optionButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                currentTheme = applyTheme(button.getAttribute('data-theme'));
                saveTheme(currentTheme);
                syncActiveState(currentTheme);
                closeOverlay();
            });
        });

        if (styleButton && styleOverlay) {
            styleButton.addEventListener('click', openOverlay);
        }

        if (styleOverlayClose) {
            styleOverlayClose.addEventListener('click', closeOverlay);
        }

        if (styleOverlay) {
            styleOverlay.addEventListener('click', function(event) {
                if (event.target === styleOverlay) {
                    closeOverlay();
                }
            });
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && styleOverlay && !styleOverlay.classList.contains('hidden')) {
                closeOverlay();
            }
        });
    });
})();
