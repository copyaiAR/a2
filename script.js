async function askQuestion() {
    const question = document.getElementById('question').value;
    const answerDiv = document.getElementById('answer');
    const loading = document.getElementById('loading');
    
    if (!question) {
        alert('الرجاء إدخال سؤال');
        return;
    }

    try {
        loading.classList.remove('hidden');
        answerDiv.innerHTML = '';
        
        const response = await fetch('https://YOUR_HUGGINGFACE_SPACE_URL.ngrok-free.app/generate?question=' + encodeURIComponent(question));
        
        if (!response.ok) {
            throw new Error('خطأ في الحصول على الإجابة');
        }
        
        const data = await response.json();
        answerDiv.innerHTML = data.output;
    } catch (error) {
        answerDiv.innerHTML = 'حدث خطأ: ' + error.message;
    } finally {
        loading.classList.add('hidden');
    }
}
