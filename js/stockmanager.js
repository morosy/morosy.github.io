document.addEventListener('DOMContentLoaded', function() {
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

    var templateDownloadBtn = document.getElementById('template-download-btn');
    var templateOverlay = document.getElementById('template-overlay');
    var templateOverlayCloseButton = document.getElementById('template-overlay-close-button');
    var templateOptionButtons = document.querySelectorAll('.template-option-button');

    function closeTemplateOverlay() {
        if (!templateOverlay) {
            return;
        }
        templateOverlay.classList.add('hidden');
    }

    function openTemplateOverlay() {
        if (!templateOverlay) {
            return;
        }
        templateOverlay.classList.remove('hidden');
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

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !templateOverlay.classList.contains('hidden')) {
                closeTemplateOverlay();
            }
        });
    }
});
