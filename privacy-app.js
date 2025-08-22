function PrivacyApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-[var(--border-color)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-[var(--primary-color)]">
              قطرات لتبادل الزيارات
            </h1>
            <a href="index.html" className="text-blue-600 hover:underline">
              العودة للموقع الرئيسي
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <PrivacyPolicy />
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PrivacyApp />);