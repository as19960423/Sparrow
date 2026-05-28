/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  CheckCircle2, 
  Languages, 
  MessageSquare, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Compass, 
  Check, 
  Users, 
  Building, 
  FileText, 
  Send, 
  Bird, 
  Calendar, 
  ShieldCheck,
  Star,
  Quote
} from 'lucide-react';

import { STATISTICS, PARTNERS, TESTIMONIALS, SERVICES_SERVICES } from './data';
import { SparrowSVG } from './components/SparrowSVG';
import { LeadModal } from './components/LeadModal';
import { SparrowGame } from './components/SparrowGame';

export default function App() {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string | undefined>(undefined);
  
  // Game scores triggers
  const [gameScore, setGameScore] = useState(0);
  const [gameDiscount, setGameDiscount] = useState(0);

  // Load and persist theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('sparrow_theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('sparrow_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('sparrow_theme', 'light');
      }
      return next;
    });
  };

  const activeService = useMemo(() => {
    return SERVICES_SERVICES[selectedServiceIdx];
  }, [selectedServiceIdx]);

  // Color mapping structure based on service selection to dynamically style with CSS-variable like responsiveness
  const colorMap = useMemo(() => {
    const maps: Record<string, { bg: string; border: string; borderActive: string; text: string; bgFill: string; bgHover: string; badge: string; shadow: string; gradient: string; accentHex: string }> = {
      emerald: {
        bg: 'bg-orange-50 dark:bg-orange-950/20 text-[#FF8C00] dark:text-orange-400',
        border: 'border-orange-100 dark:border-orange-950/10',
        borderActive: 'border-[#FF8C00] dark:border-orange-500',
        text: 'text-[#FF8C00] dark:text-orange-400',
        bgFill: 'bg-[#FF8C00] dark:bg-orange-600',
        bgHover: 'hover:bg-[#E05216] dark:hover:bg-orange-500',
        badge: 'bg-orange-50 dark:bg-orange-950/40 text-[#FF8C00] dark:text-orange-300',
        shadow: 'shadow-orange-650/10 dark:shadow-orange-500/5',
        gradient: 'from-[#FF8C00] via-orange-500 to-amber-500',
        accentHex: '#FF8C00'
      },
      cyan: {
        bg: 'bg-green-50 dark:bg-green-950/20 text-[#16A34A] dark:text-green-400',
        border: 'border-green-100 dark:border-green-950/10',
        borderActive: 'border-[#16A34A] dark:border-green-500',
        text: 'text-[#16A34A] dark:text-green-400',
        bgFill: 'bg-[#16A34A] dark:bg-green-600',
        bgHover: 'hover:bg-[#15803D] dark:hover:bg-green-500',
        badge: 'bg-green-50 dark:bg-green-950/40 text-[#16A34A] dark:text-green-300',
        shadow: 'shadow-green-600/10 dark:shadow-green-500/5',
        gradient: 'from-[#16A34A] via-emerald-500 to-teal-500',
        accentHex: '#16A34A'
      },
      violet: {
        bg: 'bg-blue-50 dark:bg-blue-950/20 text-[#2563EB] dark:text-blue-400',
        border: 'border-blue-100 dark:border-blue-950/10',
        borderActive: 'border-[#2563EB] dark:border-blue-500',
        text: 'text-[#2563EB] dark:text-blue-400',
        bgFill: 'bg-[#2563EB] dark:bg-blue-600',
        bgHover: 'hover:bg-[#1D4ED8] dark:hover:bg-blue-500',
        badge: 'bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-300',
        shadow: 'shadow-blue-600/10 dark:shadow-blue-500/5',
        gradient: 'from-[#2563EB] via-indigo-500 to-sky-500',
        accentHex: '#2563EB'
      },
      amber: {
        bg: 'bg-slate-100 dark:bg-slate-800/40 text-slate-900 dark:text-slate-200',
        border: 'border-slate-200 dark:border-slate-800/10',
        borderActive: 'border-slate-950 dark:border-slate-400',
        text: 'text-slate-950 dark:text-slate-100',
        bgFill: 'bg-slate-900 dark:bg-slate-800',
        bgHover: 'hover:bg-black dark:hover:bg-slate-700',
        badge: 'bg-slate-150 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200',
        shadow: 'shadow-slate-900/10 dark:shadow-black/5',
        gradient: 'from-slate-900 via-slate-700 to-slate-500 dark:from-slate-200 dark:via-slate-400 dark:to-slate-600',
        accentHex: '#000000'
      },
      sky: {
        bg: 'bg-red-50 dark:bg-red-950/20 text-[#DC2626] dark:text-red-400',
        border: 'border-red-100 dark:border-red-950/10',
        borderActive: 'border-[#DC2626] dark:border-red-500',
        text: 'text-[#DC2626] dark:text-red-400',
        bgFill: 'bg-[#DC2626] dark:bg-red-600',
        bgHover: 'hover:bg-[#B91C1C] dark:hover:bg-red-500',
        badge: 'bg-red-50 dark:bg-red-950/40 text-[#DC2626] dark:text-red-300',
        shadow: 'shadow-red-600/10 dark:shadow-red-500/5',
        gradient: 'from-[#DC2626] via-red-500 to-amber-500',
        accentHex: '#DC2626'
      },
      rose: {
        bg: 'bg-purple-50 dark:bg-purple-950/20 text-[#7C3AED] dark:text-purple-400',
        border: 'border-purple-100 dark:border-purple-950/10',
        borderActive: 'border-[#7C3AED] dark:border-purple-500',
        text: 'text-[#7C3AED] dark:text-purple-400',
        bgFill: 'bg-[#7C3AED] dark:bg-purple-600',
        bgHover: 'hover:bg-[#6D28D9] dark:hover:bg-purple-500',
        badge: 'bg-purple-50 dark:bg-purple-950/40 text-[#7C3AED] dark:text-purple-300',
        shadow: 'shadow-purple-600/10 dark:shadow-purple-500/5',
        gradient: 'from-[#7C3AED] via-fuchsia-500 to-pink-500',
        accentHex: '#7C3AED'
      }
    };
    return maps[activeService.themeColor];
  }, [activeService]);

  const handleOpenModal = (planName?: string) => {
    setSelectedPlanForModal(planName);
    setModalOpen(true);
  };

  const handleGameUnlock = (score: number, discount: number) => {
    setGameScore(score);
    setGameDiscount(discount);
    setSelectedPlanForModal(`Игровой бонус купон (-${discount}%)`);
    setModalOpen(true);
  };

  // Service helper icons mapping
  const serviceIcons = [
    <Languages className="w-4 h-4" />,
    <MessageSquare className="w-4 h-4" />,
    <Award className="w-4 h-4" />,
    <Briefcase className="w-4 h-4" />,
    <GraduationCap className="w-4 h-4" />,
    <Compass className="w-4 h-4 text-xs" />
  ];

  return (
    <div className="min-h-screen bg-offwhite dark:bg-dark text-dark dark:text-offwhite transition-colors duration-500 flex flex-col selection:bg-brand selection:text-white">
          
          {/* A. HEADER & BRAND NAVIGATION */}
          <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-900/50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
              
              {/* Logo container */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white dark:bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center text-white font-bold text-xl shadow-md border border-gray-100 dark:border-slate-800">
                  <SparrowSVG state="base" size={36} />
                </div>
                <div>
                  <span className="text-base font-extrabold tracking-tight font-sans text-dark dark:text-white uppercase">GLOBAL SPARROW</span>
                  <span className="hidden sm:inline-block text-[10px] text-slate-400 font-medium ml-2 font-sans">ОБРАЗОВАНИЕ И ИММИГРАЦИЯ</span>
                </div>
              </div>

              {/* Navigation tabs with proper touch sizing */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                <a href="#services" className="hover:text-brand dark:hover:text-brand transition-all">Услуги</a>
                <a href="#authority" className="hover:text-brand dark:hover:text-brand transition-all">Поступления</a>
                <a href="#tariffs" className="hover:text-brand dark:hover:text-brand transition-all">Тарифы</a>
                <a href="#challenge" className="hover:text-brand dark:hover:text-brand transition-all font-sans">Выиграть скидку</a>
                <a href="#testimonials" className="hover:text-brand dark:hover:text-brand transition-all font-sans">Отзывы</a>
              </nav>

              {/* Toggle Switch and CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-3 bg-gray-100 dark:bg-slate-900 rounded-full cursor-pointer text-slate-500 dark:text-slate-450 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all w-11 h-11 flex items-center justify-center border border-transparent"
                  aria-label="Переключить тему оформления"
                  id="theme-toggler"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => handleOpenModal('Общая консультация')}
                  data-track="header-cta-click"
                  className="hidden sm:inline-flex py-2 px-5 bg-dark hover:bg-dark/90 dark:bg-brand dark:hover:bg-brand/90 text-white font-semibold text-xs rounded-full cursor-pointer shadow-md active:scale-[0.98] transition-all font-sans"
                >
                  Консультация
                </button>
              </div>

            </div>
          </header>

          {/* B. HERO & CORE INTERACTIVE SLIDER (Above the Fold) */}
          <section className="relative overflow-hidden pt-12 pb-20 md:py-24" id="hero-section">
            
            {/* Apple product launch subtle light circles background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand/5 to-amber-550/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
              
              {/* Central huge Sparrow logo representation (Standard image with robust SVG fallback) */}
              <motion.div 
                className="relative cursor-pointer select-none mb-4 group h-52 w-52 sm:h-[260px] sm:w-[260px] flex items-center justify-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {/* Standard image mapping as strictly requested by user */}
                <img 
                  id="main-logo"
                  src="logo.png" 
                  alt="Global Sparrow Logo" 
                  onError={(e) => { 
                    // Hide if image doesn't exist, our custom SVG provides pixel-perfect view in the gap
                    e.currentTarget.style.display = 'none'; 
                  }}
                  className="w-full h-full object-contain absolute inset-0 z-10 transition-transform duration-500 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Stunning rich SVG rendering as pixel perfect display fallback */}
                <SparrowSVG 
                  state={activeService.iconState} 
                  size={260} 
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </motion.div>

              {/* Core Emotional Hook Headlines */}
              <motion.h1 
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-dark dark:text-white max-w-4xl tracking-tight leading-[1.1] font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                id="hero-headline"
              >
                Твой путь к учебе, работе и жизни за рубежом <br className="hidden md:inline" />
                <span className={`bg-gradient-to-r ${colorMap.gradient} bg-clip-text text-transparent transition-all duration-700`}>
                  начинается здесь
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 text-sm sm:text-lg text-slate-500 dark:text-slate-300 max-w-2xl font-sans font-medium leading-relaxed italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Мы ломаем шаблоны языкового образования и иммиграционного консалтинга. 
                Поступай на грант, переезжай легально, общайся на равных с миром.
              </motion.p>

              {/* C. SLIDER COMPONENT (Sleek selection sub-pills) */}
              <div className="w-full max-w-5xl mt-12" id="services">
                <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-extrabold mb-4 font-sans">
                  Выберите нужное направление
                </p>

                {/* Pill sliding wrapper */}
                <div className="flex md:grid md:grid-cols-6 gap-2 overflow-x-auto md:overflow-visible pb-4 pt-1 px-2 no-scrollbar scroll-smooth snap-x">
                  {SERVICES_SERVICES.map((serv, index) => {
                    const isActive = index === selectedServiceIdx;
                    return (
                      <button
                        key={serv.id}
                        onClick={() => setSelectedServiceIdx(index)}
                        data-track={`slider-service-${serv.id}`}
                        className={`snap-center flex-shrink-0 relative py-3.5 px-6 md:px-2 rounded-2xl cursor-pointer flex flex-col md:items-center justify-center gap-1.5 text-center transition-all duration-300 border focus:outline-none min-w-[210px] md:min-w-0 ${
                          isActive 
                            ? `bg-white dark:bg-slate-900 shadow-lg ${colorMap.borderActive} text-slate-950 dark:text-white` 
                            : 'bg-white/40 dark:bg-slate-900/20 border-slate-100 hover:border-slate-200 dark:border-slate-900 hover:dark:border-slate-800 text-slate-500 dark:text-slate-450 hover:bg-white/80'
                        }`}
                      >
                        {/* Dot indicator matching dynamic color selection */}
                        <div className={`p-2 rounded-xl text-slate-600 transition-colors ${
                          isActive 
                            ? `${colorMap.bg} stroke-2` 
                            : 'bg-slate-50 dark:bg-slate-900/60'
                        }`}>
                          {serviceIcons[index]}
                        </div>
                        <span className="text-xs sm:text-xs font-bold leading-tight tracking-tight font-sans">
                          {serv.title}
                        </span>

                        {isActive && (
                          <motion.div 
                            layoutId="activeSliderBorder" 
                            className={`absolute -bottom-[2px] left-[15%] right-[15%] h-[3px] rounded-full bg-gradient-to-r ${colorMap.gradient}`} 
                            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Display Area for Active Slider choice - elegant description text */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900 shadow-xl flex flex-col md:flex-row items-center gap-6 text-left"
                    id="slider-description-box"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${colorMap.bg}`}>
                          {activeService.slogan}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                        {activeService.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400 dark:text-slate-300 leading-relaxed font-sans max-w-3xl">
                        {activeService.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-3">
                      <a 
                        href="#tariffs"
                        className={`py-3.5 px-6 rounded-2xl text-white font-semibold text-sm cursor-pointer ${colorMap.bgFill} ${colorMap.bgHover} shadow-md ${colorMap.shadow} transition-all active:scale-[0.98] font-sans`}
                      >
                        Посмотреть тарифы
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>

            </div>
          </section>

          {/* D. TRUST & AUTHORITY SECTION */}
          <section className="py-16 bg-white dark:bg-dark border-y border-gray-100 dark:border-slate-900/50" id="authority">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Trust Section Title */}
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl sm:text-3xl font-black text-dark dark:text-white mt-1 font-sans tracking-tight">
                  Почему нам доверяют свое будущее
                </h2>
              </div>

              {/* Global Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16" id="trust-stats-grid">
                {STATISTICS.map((item) => {
                  let barColor = 'bg-brand';
                  if (item.id === 'visa-rate') barColor = 'bg-green-500';
                  else if (item.id === 'universities') barColor = 'bg-orange-400';
                  else if (item.id === 'students') barColor = 'bg-blue-500';
                  return (
                    <div 
                      key={item.id} 
                      className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl text-center shadow-sm flex flex-col justify-between items-center gap-4 relative overflow-hidden"
                      id={`stat-box-${item.id}`}
                    >
                      <div>
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark dark:text-white tracking-tight font-mono">
                          {item.value}
                          {item.suffix}
                        </div>
                        <div className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider font-sans leading-relaxed">
                          {item.label}
                        </div>
                      </div>
                      <div className={`w-12 h-1 ${barColor} rounded-full mb-1`}></div>
                    </div>
                  );
                })}
              </div>



            </div>
          </section>

          {/* E. SERVICES & PRICING PACKAGES (Conversion Psychology) */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" id="tariffs">
            
            {/* Header section with category specific details */}
            <div className="max-w-3xl mx-auto mb-12">
              <span className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-[#FF6321] dark:text-orange-350 inline-block font-sans`}>
                Тарифные предложения по теме: {activeService.title}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-dark dark:text-white mt-4 tracking-tight font-sans">
                Инвестиция в ваши глобальные достижения
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-2 font-sans">
                Мы продаем результаты: свободное общение, зачисление в вуз и легальный статус. Выбирайте траекторию.
              </p>
            </div>

            {/* Side-by-Side 3 Tiers Layout */}
            <div className="grid lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto mb-8 px-2" id="pricing-tiers-grid">
              {activeService.pricingTiers.map((tier) => {
                const isHighlight = tier.isPopular;
                return (
                  <motion.div
                    key={tier.id}
                    className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 border p-6 sm:p-8 text-left ${
                      isHighlight
                        ? `bg-[#1D1D1F] dark:bg-slate-900 border-gray-150 dark:border-slate-850 scale-102 lg:-translate-y-2 shadow-xl text-white`
                        : 'bg-white dark:bg-slate-900/60 border-gray-100 dark:border-slate-800 shadow-sm text-dark dark:text-white'
                    }`}
                    id={`price-tier-card-${tier.id}`}
                  >
                    
                    {/* Urgency Badge */}
                    {isHighlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6321] text-white font-extrabold text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full font-sans shadow-md">
                        ХИТ ПРОДАЖ • Осталось всего 10 мест!
                      </div>
                    )}

                    {/* Standard Tag */}
                    {tier.tag && (
                      <div className="absolute top-4 right-4 bg-orange-555/10 dark:bg-orange-500/20 text-brand dark:text-orange-300 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full font-sans">
                        {tier.tag}
                      </div>
                    )}

                    {/* Pricing information */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#8C8C8F] dark:text-slate-400 font-extrabold font-sans mb-1">{tier.name}</p>
                      
                      {/* Big Price with Currency */}
                      <div className="flex items-baseline gap-1 mt-4">
                        <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${isHighlight ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
                          {tier.price}
                        </span>
                        <span className="text-xl font-bold font-sans">₸</span>
                        <span className="text-xs text-slate-400 ml-1 font-sans">/{tier.period}</span>
                      </div>

                      <p className="text-xs font-semibold text-brand dark:text-orange-400 mt-2 font-sans flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-xs" />
                        {tier.outcome}
                      </p>

                      {/* Line break */}
                      <hr className={`my-6 ${isHighlight ? 'border-white/10 dark:border-slate-800' : 'border-gray-100 dark:border-slate-800'}`} />

                      {/* Bullet points */}
                      <ul className="space-y-3.5 mb-8">
                        {tier.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-555 dark:text-slate-350 font-sans leading-relaxed">
                            <Check className="w-4 h-4 text-[#FF6321] flex-shrink-0 mt-0.5" />
                            <span className={isHighlight ? 'text-slate-200' : 'text-slate-655 dark:text-slate-350'}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA selection button */}
                    <div className="mt-auto">
                      
                      {tier.hasInstallments && (
                        <div className="p-2.5 bg-brand/5 border border-brand/10 rounded-2xl mb-4 text-center">
                          <p className="text-[10px] font-bold text-brand dark:text-orange-400 font-sans">
                            💳 Без залога: доступна Рассрочка Kaspi Red / Kaspi Kredit
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => handleOpenModal(`${activeService.title}: ${tier.name}`)}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs text-center cursor-pointer transition-all active:scale-[0.98] font-sans ${
                          isHighlight
                            ? 'bg-brand hover:bg-[#E05216] text-white shadow-md'
                            : 'bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-dark dark:text-slate-200 border border-gray-100 dark:border-slate-700'
                        }`}
                      >
                        Забронировать место
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </div>



          </section>

          {/* F. GAMIFICATION - INTERACTIVE CANVAS GAME ("Павильон испытаний") */}
          <section className="py-20 bg-orange-50/20 dark:bg-dark border-t border-gray-100 dark:border-slate-800" id="challenge">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Game Information / Copy */}
                <div className="lg:col-span-5 text-left space-y-4">
                  <div className="inline-flex items-center gap-1.5 py-1 px-3 bg-orange-50 dark:bg-orange-950/30 text-brand dark:text-orange-400 rounded-full text-xs font-bold font-sans">
                    <Award className="w-3.5 h-3.5" />
                    Турнир "Полет Воробья"
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-dark dark:text-white tracking-tight leading-tight font-sans">
                    Сыграй в игру и получи скидку до 20%!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-sans font-medium">
                    У нас в Global Sparrow все равны, но лучшие находят свое через интеллект и реакцию!
                    Управляйте воробьем, пролетайте сквозь книги — каждый успех снижает стоимость обучения.
                  </p>

                  <div className="space-y-3 pt-2 font-sans text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-50 dark:bg-orange-950/45 flex items-center justify-center text-brand dark:text-orange-400 text-[10px] font-bold">1</div>
                      <span className="text-slate-550 dark:text-slate-300">Наберите <strong>10 очков</strong>, чтобы забрать <strong>10% скидку</strong>.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-50 dark:bg-orange-950/45 flex items-center justify-center text-brand dark:text-orange-400 text-[10px] font-bold">2</div>
                      <span className="text-slate-550 dark:text-slate-300">Наберите <strong>50 очков</strong> для рекордной <strong>20% скидки</strong>.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-50 dark:bg-orange-950/45 flex items-center justify-center text-brand dark:text-orange-400 text-[10px] font-bold">3</div>
                      <span className="text-slate-550 dark:text-slate-300">Ограничение: всего 3 попытки забронировать скидку. Тренировка — без лимита.</span>
                    </div>
                  </div>
                </div>

                {/* Actual Game Widget */}
                <div className="lg:col-span-7 w-full flex justify-center">
                  <SparrowGame onUnlockDiscount={handleGameUnlock} />
                </div>

              </div>
              
            </div>
          </section>

          {/* G. TESTIMONIALS SECTION */}
          <section className="py-20 bg-white dark:bg-dark border-t border-gray-100 dark:border-slate-800" id="testimonials">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              
              <div className="max-w-2xl mx-auto mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand font-mono">Истории успехов</span>
                <h2 className="text-3xl sm:text-4xl font-black text-dark dark:text-white mt-1 font-sans tracking-tight">
                  Стали свободными воробьями во всем мире
                </h2>
              </div>

              {/* Grid of reviews */}
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto" id="testimonials-grid">
                {TESTIMONIALS.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-3xl flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-all relative"
                    id={`testimonial-card-${item.id}`}
                  >
                    <Quote className="absolute right-6 top-6 w-12 h-12 text-brand/5 dark:text-orange-500/5 pointer-events-none" />
                    
                    <div>
                      {/* Rating stars */}
                      <div className="flex items-center gap-1 text-orange-450 mb-4">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand stroke-none" />
                        ))}
                      </div>

                      <p className="text-xs sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic font-sans font-medium">
                        "{item.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-gray-100 dark:border-slate-800/60 pt-4 mt-6">
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs font-bold text-dark dark:text-white font-sans">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-sans mt-0.5">{item.role}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* H. CONVERSION CTA & FOOTER */}
          <section className="py-20 bg-dark text-white relative overflow-hidden border-t border-slate-950" id="contacts">
            
            {/* Ambient warm lights */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-brand/10 via-orange-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
              
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none font-sans">
                  Время сделать первый шаг к глобальным переменам
                </h3>
                <p className="text-sm text-slate-400 max-w-lg mx-auto font-sans leading-relaxed">
                  Оставьте контакты. Наши ведущие иммиграционные адвокаты и академические академики составят для вас бесплатную дорожную карту.
                </p>
              </div>

              {/* Lead Capture Form */}
              <div className="max-w-xl mx-auto bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-sm" id="footer-lead-form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleOpenModal('Индивидуальный разбор профиля - Футер');
                  }}
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Ваше Имя
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Иван"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand focus:bg-white/10 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Номер WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (707) 123-4567"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand focus:bg-white/10 transition-all font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    data-track="footer-submit-click"
                    className="w-full py-4 bg-brand hover:bg-[#E05216] text-white font-bold text-xs rounded-2xl active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-orange-700/20 flex items-center justify-center gap-1.5 font-sans"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Получить бесплатный план-консультацию
                  </button>
                </form>
              </div>

              {/* Footer contact details and copyright */}
              <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-405" id="footer-terms-row">
                <div className="flex items-center gap-2">
                  <SparrowSVG state="base" size={20} />
                  <span className="font-extrabold text-white font-sans text-sm tracking-tight uppercase">GLOBAL SPARROW</span>
                  <span className="text-[10px] border-l border-white/10 pl-3">© 2026. Все права защищены.</span>
                </div>

                <div className="flex items-center gap-6 font-sans">
                  <a href="https://wa.me/77776903467" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand transition-all">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    +7 (777) 690-3467 (Поддержка)
                  </a>
                  <span className="hidden sm:inline">Казахстан, Алматы / Астана</span>
                </div>
              </div>

            </div>
          </section>

          {/* I. STICKY FLOATING CONSULTATION BUTTON */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2" id="sticky-callout-buttons">
            <button
               onClick={() => handleOpenModal('Плавающий Консалтинг')}
               data-track="sticky-cta-click"
               className="py-3 px-6 bg-brand hover:bg-[#E05216] text-white font-bold text-xs rounded-full shadow-2xl flex items-center gap-2 cursor-pointer border border-brand/20 active:scale-95 transition-all font-sans uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4 fill-white" />
              Записаться
            </button>
          </div>

          {/* Persistent global Lead Modal */}
          <LeadModal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)} 
            selectedPlan={selectedPlanForModal}
            gameScore={gameScore}
            gameDiscount={gameDiscount}
          />

        </div>
  );
}
