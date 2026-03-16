"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    content: "이 홈페이지 덕분에 작업 효율이 200% 이상 올라갔습니다. 개발팀의 전문성과 빠른 피드백에 정말 감동받았습니다.",
    author: "김철수",
    role: "테크 스타트업 대표"
  },
  {
    content: "복잡했던 요구사항을 명확하게 파악하고 최적의 솔루션을 제안해주셨습니다. 디자인 감각도 뛰어나 브랜드 이미지가 개선되었습니다.",
    author: "이영희",
    role: "마케팅 디렉터"
  },
  {
    content: "글로벌 런칭 프로젝트를 성공적으로 마칠 수 있었던 건 파트너사의 뛰어난 기술력 덕분입니다. 앞으로도 계속 함께하고 싶습니다.",
    author: "박지민",
    role: "글로벌 사업부 팀장"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-[#F8F9FA] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">고객 후기</h2>
          <p className="text-secondary-text">함께 성장해온 파트너들의 생생한 목소리입니다.</p>
        </div>

        <div 
          className="relative bg-white p-10 md:p-16 rounded-3xl shadow-sm"
          data-aos="zoom-in"
        >
          <Quote className="text-point-blue/20 absolute top-8 left-8 w-16 h-16 md:w-24 md:h-24" />
          
          <div className="relative z-10 text-center">
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 text-point-black italic">
              &quot;{testimonials[current].content}&quot;
            </p>
            <div>
              <div className="font-bold text-lg text-point-black">{testimonials[current].author}</div>
              <div className="text-secondary-text">{testimonials[current].role}</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="p-3 rounded-full border border-gray-200 hover:bg-point-blue hover:text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="p-3 rounded-full border border-gray-200 hover:bg-point-blue hover:text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
