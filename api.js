/* Registration is acknowledged only after the CRM confirms durable storage. */
window.ptnRequest = async function(payload) {
  const endpoint=window.PTN_BACKEND?.url;
  if(!endpoint) throw new Error('Hệ thống đang được kết nối. Vui lòng liên hệ qua Zalo.');
  if(payload.action!=='submit') throw new Error('Vui lòng mở trang Quản trị mới để quản lý đăng ký.');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
  try {
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',body:JSON.stringify(payload),signal:controller.signal});
    let result;try{result=await response.json()}catch{throw new Error('Chưa nhận được xác nhận từ hệ thống. Vui lòng thử lại.');}
    if(!response.ok||!result.ok||!result.reference)throw new Error(result.error||'Chưa lưu được đăng ký. Vui lòng thử lại.');
    return result;
  }catch(error){
    if(error.name==='AbortError')throw new Error('Kết nối chậm. Bạn có thể gửi lại; hệ thống sẽ tránh ghi trùng yêu cầu.');
    throw error;
  }finally{clearTimeout(timer);}
};
