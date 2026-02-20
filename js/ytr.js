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
});
