const API_URL = 'https://hoc137-a2.hf.space/generate';

async function ask() {
    const question = document.getElementById('question').value;
    const chatOutput = document.getElementById('chat-output');
    
    if (!question) return;

    // عرض السؤال
    chatOutput.innerHTML += `
        <div class="message user-message">
            <strong>أنت:</strong> ${question}
        </div>
    `;

    // عرض مؤشر التحميل
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="spinner"></div>
        جاري تحضير الإجابة...
    `;
    chatOutput.appendChild(loading);

    try {
        const response = await fetch(`${API_URL}?question=${encodeURIComponent(question)}`);
        const data = await response.json();
        
        // إزالة مؤشر التحميل
        loading.remove();
        
        // عرض الإجابة
        chatOutput.innerHTML += `
            <div class="message bot-message">
                <strong>المساعد:</strong> ${data.answer}
            </div>
        `;
    } catch (error) {
        loading.remove();
        chatOutput.innerHTML += `
            <div class="message error">
                حدث خطأ: ${error.message}
            </div>
        `;
    }

    // مسح حقل الإدخال
    document.getElementById('question').value = '';
    // التمرير للأسفل
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
