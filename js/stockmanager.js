document.addEventListener('DOMContentLoaded', function() {
    fetch('texts/explain/StockManager.txt')
        .then(response => response.text())
        .then(text => {
            document.getElementById('description-text').textContent = text;
        })
        .catch(error => {
            console.error('Error loading description:', error);
            document.getElementById('description-text').textContent = 'StockManagerの説明を読み込めませんでした。';
        });
});
