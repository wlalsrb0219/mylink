import React from 'react';
import { Smartphone, Laptop, Layout, Cpu, Globe, Rocket } from 'lucide-react';

const services = [
  {
    icon: <Smartphone size={32} className="text-point-blue" />,
    title: "모바일 어플리케이션",
    description: "사용자 경험을 최우선으로 생각하는 직관적이고 고성능의 모바일 앱을 개발합니다."
  },
  {
    icon: <Laptop size={32} className="text-point-blue" />,
    title: "웹 플랫폼",
    description: "반응형 디자인과 강력한 백엔드를 결합하여 확장 가능한 현대적인 웹 서비스를 구축합니다."
  },
  {
    icon: <Layout size={32} className="text-point-blue" />,
    title: "UI/UX 디자인",
    description: "심미성과 기능성이 조화를 이루는 창의적인 디자인으로 브랜드 가치를 높입니다."
  },
  {
    icon: <Cpu size={32} className="text-point-blue" />,
    title: "시스템 아키텍처",
    description: "안정적이고 효율적인 인프라 설계를 통해 비즈니스의 지속 가능한 성장을 지원합니다."
  },
  {
    icon: <Globe size={32} className="text-point-blue" />,
    title: "글로벌 확장",
    description: "다양한 문화와 시장을 고려한 로컬라이징 및 글로벌 서비스 운영 전략을 제공합니다."
  },
  {
    icon: <Rocket size={32} className="text-point-blue" />,
    title: "성능 최적화",
    description: "최신 기술 스택을 활용하여 로딩 속도와 서비스 효율성을 극대화합니다."
  }
];

const Services = () => {
  return (
    <section className="bg-[#F8F9FA] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">우리의 전문 분야</h2>
          <p className="text-secondary-text" data-aos="fade-up" data-aos-delay="100">혁신적인 기술을 통해 비즈니스의 가능성을 현실로 만듭니다.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-10 rounded-[12px] shadow-sm hover:shadow-md transition-all group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-6 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-secondary-text leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
