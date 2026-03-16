"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const categories = ["전체", "기획", "개발", "디자인"];

const projects = [
  { id: 1, category: "개발", title: "스마트 홈 제어 플랫폼", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800" },
  { id: 2, category: "디자인", title: "브랜딩 아이덴티티 시스템", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800" },
  { id: 3, category: "기획", title: "이커머스 서비스 기획안", image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800" },
  { id: 4, category: "개발", title: "금융 데이터 분석 대시보드", image: "https://images.unsplash.com/photo-1551288049-bbda38a5f9a2?auto=format&fit=crop&q=80&w=800" },
  { id: 5, category: "디자인", title: "모바일 헬스케어 앱 UI", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" },
  { id: 6, category: "개발", title: "글로벌 물류 관리 시스템", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("전체");

  const filteredProjects = activeTab === "전체" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section className="bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">우리의 결과물</h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12" data-aos="fade-up" data-aos-delay="100">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === cat 
                  ? "bg-point-blue text-white" 
                  : "bg-gray-100 text-secondary-text hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-xl aspect-[16/9] cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-blue-400 text-sm font-bold mb-2">{project.category}</span>
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
