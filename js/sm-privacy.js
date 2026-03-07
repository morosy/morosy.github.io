document.addEventListener('DOMContentLoaded', function() {
    fetch('texts/sm-privacy.txt')
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            document.getElementById('policy-text').textContent = text;
        })
        .catch(function(error) {
            console.error('Error loading privacy policy:', error);
            document.getElementById('policy-text').textContent = 'プライバシーポリシーを読み込めませんでした。';
        });
});
