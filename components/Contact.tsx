import React from 'react';

const Contact = () => {
  return (
    <section className="bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">함께 시작할까요?</h2>
          <p className="text-secondary-text">프로젝트에 대한 아이디어를 들려주세요. 혁신을 도와드립니다.</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-point-black">이름</label>
            <input 
              type="text" 
              placeholder="홍길동"
              className="px-4 py-4 rounded-lg bg-gray-50 border-none outline-none focus:ring-2 focus:ring-point-blue transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-point-black">이메일</label>
            <input 
              type="email" 
              placeholder="example@email.com"
              className="px-4 py-4 rounded-lg bg-gray-50 border-none outline-none focus:ring-2 focus:ring-point-blue transition-all"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-bold text-point-black">제목</label>
            <input 
              type="text" 
              placeholder="문의 드립니다"
              className="px-4 py-4 rounded-lg bg-gray-50 border-none outline-none focus:ring-2 focus:ring-point-blue transition-all"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-bold text-point-black">메시지</label>
            <textarea 
              rows={5} 
              placeholder="상세 내용을 적어주세요."
              className="px-4 py-4 rounded-lg bg-gray-50 border-none outline-none focus:ring-2 focus:ring-point-blue transition-all"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button className="w-full bg-point-black text-white py-5 rounded-lg font-bold text-lg hover:bg-point-blue transition-all shadow-xl shadow-black/10">
              문의 보내기
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
