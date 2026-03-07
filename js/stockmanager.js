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
    if (templateDownloadBtn) {
        templateDownloadBtn.addEventListener('click', function() {
            alert('テンプレートダウンロードは準備中です。');
        });
    }
});
