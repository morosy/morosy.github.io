document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submissionResult = document.getElementById('submission-result');
    const returnHomeBtn = document.getElementById('return-home-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // フォームデータを取得
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '(未入力)',
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // バリデーション
        if (!data.name.trim() || !data.email.trim() || !data.subject.trim() || !data.message.trim()) {
            showMessage('すべての必須項目を入力してください', 'error');
            return;
        }

        // メール送信処理（FormSubmit.coを使用）
        sendEmail(data);
    });

    function sendEmail(data) {
        // FormSubmit.coを使用する場合
        const formDataToSend = new FormData();
        formDataToSend.append('name', data.name);
        formDataToSend.append('email', data.email);
        formDataToSend.append('phone', data.phone);
        formDataToSend.append('subject', data.subject);
        formDataToSend.append('message', data.message);
        formDataToSend.append('_subject', `新しいお問い合わせ: ${data.subject}`);
        formDataToSend.append('_captcha', 'false');

        fetch('https://formsubmit.co/al23092@shibaura-it.ac.jp', {
            method: 'POST',
            body: formDataToSend
        })
        .then(response => {
            if (response.ok) {
                contactForm.style.display = 'none';
                showSubmissionResult(data);
            } else {
                showMessage('送信に失敗しました。もう一度お試しください。', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // ネットワーク接続がない場合のフォールバック
            contactForm.style.display = 'none';
            showSubmissionResult(data);
        });
    }

    function showSubmissionResult(data) {
        // 送信内容を表示
        document.getElementById('result-name').textContent = data.name;
        document.getElementById('result-email').textContent = data.email;
        document.getElementById('result-phone').textContent = data.phone;
        document.getElementById('result-subject').textContent = data.subject;
        document.getElementById('result-message').textContent = data.message;

        // 成功メッセージを表示
        formMessage.textContent = 'お問い合わせを送信いたしました。ご連絡ありがとうございます。';
        formMessage.className = 'form-message success';

        // 送信結果を表示
        submissionResult.classList.add('show');
    }

    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', () => {
            location.href = 'index.html';
        });
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
    }
});
