import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-0">
      <h1 
        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-point-black"
        data-aos="fade-up"
      >
        사용자의 일상을 바꾸는<br />
        <span className="text-point-blue">기술적인 솔루션</span>
      </h1>
      <p 
        className="text-lg md:text-xl text-secondary-text mb-10 max-w-2xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        우리는 혁신적인 디자인과 최첨단 기술을 결합하여 복잡한 문제를 단순화합니다. 
        더 나은 미래를 향한 여정에 함께하세요.
      </p>
      <div 
        className="flex flex-col sm:flex-row gap-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <button className="bg-point-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
          시작하기 <ArrowRight size={20} />
        </button>
        <button className="border-2 border-point-black text-point-black px-8 py-4 rounded-full font-bold text-lg hover:bg-point-black hover:text-white transition-all">
          더 알아보기
        </button>
      </div>
    </section>
  );
};

export default Hero;
