document.addEventListener('DOMContentLoaded', function() {
    // プライバシーポリシーテキストをファイルから読み込む
    fetch('texts/ytr-privacy.txt')
        .then(response => response.text())
        .then(text => {
            document.getElementById('policy-text').textContent = text;
        })
        .catch(error => {
            console.error('Error loading privacy policy:', error);
            document.getElementById('policy-text').textContent = 'プライバシーポリシーを読み込むことができませんでした。';
        });
});
