export default function ErrorFallback({ error, language = 'en' }) {
    const messages = {
        en: {
            title: 'Oops! Something went wrong',
            subtitle: 'We encountered an error while loading the content.',
            retry: 'Try Again',
            contact: 'If the problem persists, please contact us.'
        },
        my: {
            title: 'တစ်ခုခုမှားယွင်းနေပါသည်',
            subtitle: 'အကြောင်းအရာများကို ဖွင့်ရာတွင် အမှားတစ်ခု ကြုံတွေ့ခဲ့ရပါသည်။',
            retry: 'ထပ်ကြိုးစားကြည့်ပါ',
            contact: 'ပြဿနာဆက်လက်ရှိနေပါက ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ။'
        }
    }

    const t = messages[language]

    const handleRetry = () => {
        window.location.reload()
    }

    return (
        <div className="error-fallback">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h2>{t.title}</h2>
                <p>{t.subtitle}</p>
                {error && <p className="error-message">{error}</p>}
                <button className="btn" onClick={handleRetry}>
                    {t.retry}
                </button>
                <p className="error-contact">{t.contact}</p>
            </div>
        </div>
    )
}
