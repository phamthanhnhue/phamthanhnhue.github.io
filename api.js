/* Registration is acknowledged only after the CRM confirms durable storage. */
window.ptnRequest = async function(payload) {
  const endpoint=window.PTN_BACKEND?.url;
  if(!endpoint) throw new Error('Biểu mẫu hiện chưa sẵn sàng. Bạn vui lòng liên hệ với tôi qua Zalo.');
  if(payload.action!=='submit') throw new Error('Vui lòng mở trang Quản trị mới để quản lý đăng ký.');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
  try {
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',body:JSON.stringify(payload),signal:controller.signal});
    let result;try{result=await response.json()}catch{throw new Error('Chưa xác nhận được kết quả gửi. Bạn vui lòng thử lại.');}
    if(!response.ok||!result.ok||!result.reference)throw new Error(result.error||'Chưa lưu được thông tin của bạn. Bạn vui lòng thử lại.');
    return result;
  }catch(error){
    if(error.name==='AbortError')throw new Error('Kết nối đang chậm. Bạn vui lòng gửi lại hoặc liên hệ với tôi qua Zalo.');
    throw error;
  }finally{clearTimeout(timer);}
};
