/* POST bridge keeps admin credentials out of URLs and avoids opaque no-cors success claims. */
window.ptnRequest = function(payload) {
 return new Promise((resolve,reject)=>{
  const endpoint=window.PTN_BACKEND?.url;
  if(!endpoint){reject(new Error('Hệ thống đang được kết nối. Vui lòng liên hệ qua Zalo hoặc email.'));return;}
  const transportId=crypto.randomUUID(),frame=document.createElement('iframe'),form=document.createElement('form');
  frame.name='ptn_'+transportId;frame.hidden=true;frame.title='Kết nối dữ liệu';
  form.method='POST';form.action=endpoint;form.target=frame.name;form.hidden=true;
  const field=document.createElement('input');field.type='hidden';field.name='payload';field.value=JSON.stringify({...payload,transportId});form.append(field);
  let timer;const cleanup=()=>{clearTimeout(timer);window.removeEventListener('message',receive);frame.remove();form.remove()};
  const receive=e=>{
   if(!/^https:\/\/([a-z0-9-]+\.)?script\.googleusercontent\.com$/.test(e.origin)&&e.origin!=='https://script.google.com')return;
   if(e.data?.source!=='ptn-website'||e.data.transportId!==transportId)return;
   cleanup();if(e.data.ok)resolve(e.data);else reject(new Error(e.data.error||'Không thể xử lý yêu cầu.'));
  };
  window.addEventListener('message',receive);document.body.append(frame,form);
  timer=setTimeout(()=>{cleanup();reject(new Error('Chưa nhận được xác nhận. Vui lòng thử lại; yêu cầu đăng ký sẽ không bị ghi trùng.'))},45000);
  form.submit();
 });
};
