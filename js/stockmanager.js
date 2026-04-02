document.addEventListener('DOMContentLoaded', function() {
    var apkDownloadPath = 'release/StockManager-1.0.0.apk';
    var googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.morosy.stockmanager';

    fetch('texts/explain/StockManager.txt')
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            document.getElementById('description-text').textContent = text;
        })
        .catch(function(error) {
            console.error('Error loading description:', error);
            document.getElementById('description-text').textContent = 'StockManagerの説明を読み込めませんでした。';
        });

    var downloadBtn = document.getElementById('download-btn');
    var downloadOverlay = document.getElementById('download-overlay');
    var downloadOverlayCloseButton = document.getElementById('download-overlay-close-button');
    var apkDownloadButton = document.getElementById('apk-download-button');
    var googlePlayButton = document.getElementById('google-play-button');
    var templateDownloadBtn = document.getElementById('template-download-btn');
    var templateOverlay = document.getElementById('template-overlay');
    var templateOverlayCloseButton = document.getElementById('template-overlay-close-button');
    var templateOptionButtons = document.querySelectorAll('.template-option-button');

    function closeOverlay(overlay) {
        if (!overlay) {
            return;
        }
        overlay.classList.add('hidden');
    }

    function openOverlay(overlay) {
        if (!overlay) {
            return;
        }
        overlay.classList.remove('hidden');
    }

    function triggerFileDownload(filePath, fileName) {
        var link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function closeTemplateOverlay() {
        closeOverlay(templateOverlay);
    }

    function openTemplateOverlay() {
        openOverlay(templateOverlay);
    }

    function closeDownloadOverlay() {
        closeOverlay(downloadOverlay);
    }

    function openDownloadOverlay() {
        openOverlay(downloadOverlay);
    }

    function downloadTemplateFile(filePath, fileName) {
        fetch(filePath)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Template not found: ' + filePath);
                }
                return response.blob();
            })
            .then(function(blob) {
                var blobUrl = URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            })
            .catch(function(error) {
                console.error('Error downloading template:', error);
                alert('テンプレートのダウンロードに失敗しました。');
            });
    }

    if (downloadBtn && downloadOverlay) {
        downloadBtn.addEventListener('click', openDownloadOverlay);
    }

    if (downloadOverlayCloseButton) {
        downloadOverlayCloseButton.addEventListener('click', closeDownloadOverlay);
    }

    if (apkDownloadButton) {
        apkDownloadButton.addEventListener('click', function() {
            closeDownloadOverlay();
            triggerFileDownload(apkDownloadPath, 'StockManager-1.0.0.apk');
        });
    }

    if (googlePlayButton) {
        googlePlayButton.addEventListener('click', function() {
            closeDownloadOverlay();
            window.location.href = googlePlayUrl;
        });
    }

    if (templateDownloadBtn && templateOverlay) {
        templateDownloadBtn.addEventListener('click', openTemplateOverlay);
    }

    if (templateOverlayCloseButton) {
        templateOverlayCloseButton.addEventListener('click', closeTemplateOverlay);
    }

    templateOptionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var filePath = button.getAttribute('data-template-file');
            var fileName = button.getAttribute('data-template-name') || 'template.json';
            closeTemplateOverlay();
            downloadTemplateFile(filePath, fileName);
        });
    });

    if (templateOverlay) {
        templateOverlay.addEventListener('click', function(event) {
            if (event.target === templateOverlay) {
                closeTemplateOverlay();
            }
        });
    }

    if (downloadOverlay) {
        downloadOverlay.addEventListener('click', function(event) {
            if (event.target === downloadOverlay) {
                closeDownloadOverlay();
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (downloadOverlay && !downloadOverlay.classList.contains('hidden')) {
                closeDownloadOverlay();
            }
            if (templateOverlay && !templateOverlay.classList.contains('hidden')) {
                closeTemplateOverlay();
            }
        }
    });
});
