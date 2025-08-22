// utils/api.js

const scriptURL = "https://script.google.com/macros/s/AKfycbySvO62_hYRFUxTRprpqq21t5YQYX8i5Qqy69Nq-NdlzylJwzm5AmeWei2gIfpjmzB38A/exec";

// دالة عامة لإرسال طلب إلى Google Apps Script
const trickleRequest = async (action, data = {}) => {
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // مهم: لا يمكن تغيير CORS في Google Apps Script
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action, ...data })
    });

    // لأن mode: "no-cors" لا يُعيد استجابة قابلة للقراءة، نعتمد على try/catch فقط
    return { success: true };
  } catch (error) {
    console.error("trickleRequest error:", error);
    throw new Error("فشل في الاتصال بالخادم");
  }
};

// دالة للحصول على بيانات باستخدام GET (لقراءة البيانات فقط)
const trickleGetRequest = async (action, params = {}) => {
  const url = new URL(scriptURL);
  url.search = new URLSearchParams({ action, ...params }).toString();

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("trickleGetRequest error:", error);
    throw error;
  }
};

// إنشاء كائن جديد
const trickleCreateObject = async (type, data) => {
  return await trickleRequest("create", { type, data });
};

// قراءة كائن واحد
const trickleGetObject = async (type, id) => {
  try {
    const result = await trickleGetRequest("get", { type, id });
    return result.data;
  } catch (error) {
    console.error(`Error getting ${type} ${id}:`, error);
    return null;
  }
};

// تحديث كائن
const trickleUpdateObject = async (type, id, data) => {
  return await trickleRequest("update", { type, id, data });
};

// حذف كائن
const trickleDeleteObject = async (type, id) => {
  return await trickleRequest("delete", { type, id });
};

// قائمة الكائنات
const trickleListObjects = async (type, limit = 100, activeOnly = false) => {
  try {
    const result = await trickleGetRequest("list", { type, limit, activeOnly });
    return result;
  } catch (error) {
    console.error(`Error listing ${type}:`, error);
    return { items: [] };
  }
};

// تصدير الوظائف إلى window لكي تكون متاحة في app.js
window.trickleCreateObject = trickleCreateObject;
window.trickleGetObject = trickleGetObject;
window.trickleUpdateObject = trickleUpdateObject;
window.trickleDeleteObject = trickleDeleteObject;
window.trickleListObjects = trickleListObjects;