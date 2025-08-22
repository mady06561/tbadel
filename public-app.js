function PublicApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-[var(--border-color)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <h1 className="text-xl font-bold text-[var(--primary-color)]">
              الروابط وأكواد التحقق - موقع تبادل الزيارات
            </h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <PublicLinks />
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PublicApp />);