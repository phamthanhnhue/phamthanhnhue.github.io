(() => {
'use strict';
const form=document.querySelector('#request-form');if(!form)return;
const status=document.querySelector('#form-status'),button=form.querySelector('button[type="submit"]');
const quick=document.querySelector('.quick-contact');
if(quick&&'IntersectionObserver' in window)new IntersectionObserver(entries=>quick.classList.toggle('is-form-visible',entries[0].isIntersecting),{threshold:0.12}).observe(form);
const config=window.PTN_BACKEND||{};
if(config.url){button.disabled=false;const note=document.querySelector('#form-connection-note');if(note)note.textContent='Tôi sử dụng thông tin bạn gửi để tiếp nhận nhu cầu và liên hệ với bạn.';}
const date=form.elements.appointment, email=form.elements.email, channel=form.elements.channel;
function localDate(){return new Date().toLocaleString('sv-SE',{timeZone:'Asia/Ho_Chi_Minh'}).slice(0,16).replace(' ','T')}
if(date)date.min=localDate();
if(channel)channel.addEventListener('change',()=>{email.required=channel.value==='email'});
let requestId=crypto.randomUUID();
form.addEventListener('input',()=>{if(status.dataset.state==='success'){status.textContent='';status.removeAttribute('data-state')}});
form.addEventListener('submit',async e=>{
 e.preventDefault();if(!form.reportValidity())return;
 const data=Object.fromEntries(new FormData(form));
 if(!/^[+\d\s().-]{8,25}$/.test(data.phone)){form.elements.phone.setCustomValidity('Vui lòng nhập số điện thoại hợp lệ.');form.elements.phone.reportValidity();form.elements.phone.addEventListener('input',()=>form.elements.phone.setCustomValidity(''),{once:true});return;}
 if(date&&data.appointment<=localDate()){date.setCustomValidity('Vui lòng chọn thời gian trong tương lai.');date.reportValidity();date.addEventListener('input',()=>date.setCustomValidity(''),{once:true});return;}
 status.dataset.state='loading';status.textContent='Đang gửi yêu cầu…';button.disabled=true;
 try{
  const result=await window.ptnRequest({action:'submit',kind:form.dataset.kind,...data,consent:data.consent==='on',requestId});
  status.dataset.state='success';status.textContent='Cảm ơn bạn đã chia sẻ. Yêu cầu của bạn đã được lưu. Tôi sẽ liên hệ qua thông tin bạn cung cấp. Mã yêu cầu: '+result.reference+'.';form.reset();requestId=crypto.randomUUID();if(email)email.required=false;
 }catch(error){status.dataset.state='error';status.textContent=error.name==='TimeoutError'?'Chưa xác nhận được kết quả gửi. Bạn vui lòng thử lại hoặc liên hệ với tôi qua Zalo.':error.message||'Kết nối bị gián đoạn. Bạn vui lòng thử lại.';}
 finally{button.disabled=false;}
});
})();
