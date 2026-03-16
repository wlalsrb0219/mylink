import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold mb-4 tracking-tight">BRAND<span className="text-point-blue">SOLUTIONS</span></div>
          <p className="text-gray-400 max-w-sm">
            사용자의 일상을 변화시키는 차세대 디지털 솔루션 기업입니다. 
            더 나은 미래를 위해 끊임없이 혁신하고 나아갑니다.
          </p>
        </div>
        
        <div className="flex gap-8 font-medium">
          <a href="#" className="hover:text-point-blue transition-colors">서비스</a>
          <a href="#" className="hover:text-point-blue transition-colors">포트폴리오</a>
          <a href="#" className="hover:text-point-blue transition-colors">문의하기</a>
        </div>
        
        <div className="text-gray-500 text-sm">
          © 2026 BRAND SOLUTIONS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
