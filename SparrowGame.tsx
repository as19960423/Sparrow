/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SparrowSVGProps {
  state: 'base' | 'learning' | 'graduating' | 'business' | 'chatting' | 'university' | 'passport';
  className?: string;
  size?: number;
}

export const SparrowSVG: React.FC<SparrowSVGProps> = ({ state, className = '', size = 200 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Background radial soft light to give a High-End Stripe-like depth */}
      <div className="absolute inset-0 bg-radial from-orange-400/10 via-transparent to-transparent opacity-60 blur-xl pointer-events-none" />
      
      <svg 
        viewBox="0 -140 1000 1140" 
        width="100%" 
        height="100%" 
        className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes sparrow-float {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-16px) scale(1.015);
            }
          }
          @keyframes sparrow-wing-wave {
            0%, 100% {
              transform: rotate(0deg) translate(0, 0);
            }
            50% {
              transform: rotate(-1.5deg) translate(-6px, 6px);
            }
          }
          @keyframes sparrow-orange-breathing {
            0%, 100% {
              transform: scale(1) translate(0, 0);
            }
            50% {
              transform: scale(1.01) translate(-2px, 3px);
            }
          }
          .animate-sparrow-body {
            animation: sparrow-float 5s ease-in-out infinite;
            transform-origin: 50% 50%;
          }
          .animate-sparrow-wing {
            animation: sparrow-wing-wave 6s ease-in-out infinite;
            transform-origin: 650px 320px;
          }
          .animate-sparrow-orange {
            animation: sparrow-orange-breathing 5.5s ease-in-out infinite;
            transform-origin: 360px 600px;
          }
          .animate-accessory-floating {
            animation: sparrow-float 4s ease-in-out infinite;
            transform-origin: 50% 50%;
          }
        `}</style>

        <g id="sparrow-group" className="animate-sparrow-body">
          {/* Main Stylized Bird Graphic matching the uploaded image */}
          {/* Crown / Cap / Head - Red */}
          <path 
            d="M598.5,227.3 C650,150 780,111 870,209.5 C895,191.6 925,200 994,222.3 C953.5,241.6 918,248 911.5,251 C861,281 832.5,357 854.5,450 C805,321.6 788.5,317.5 765.5,309 C722,293 697.5,252 598.5,227.3 Z" 
            fill="#C10E1C" 
            id="bird-red-head"
          />
          
          {/* Main Upper Wing / Back - Dark Teal/Navy */}
          <path 
            d="M594,248 C515,310 338,485 217.5,643.5 C310,615 540,490 690,390 C715,365 715,335 717,314 C713,314.5 631,273 594,248 Z" 
            fill="#054E5A" 
            id="bird-teal-wing"
            className="animate-sparrow-wing"
          />
          
          {/* Lower Swoosh Wing - Vibrant Orange/Amber */}
          <path 
            d="M246,654.5 C242.5,660.5 8,885 8,885 C215,798 322,709 375.5,690.5 C520.5,640.5 690,470 717,392 C562,560 380,622 246,654.5 Z" 
            fill="#FF8C00" 
            id="bird-orange-belly"
            className="animate-sparrow-orange"
          />

          {/* Under Belly Swoop Outline - Dark Red */}
          <path 
            d="M610,710.5 C685,710.5 832.5,622.5 892.5,417 C890,523 852.5,625 790,674 C737,716 675.5,714 610,710.5 Z" 
            fill="#C10E1C" 
            id="bird-under-belly-swoosh"
          />
        </g>

        {/* Dynamic Contextual Accents / Props Based on Selected Educational Or Immigration Vertical */}
        
        {/* LEARNING / GENERAL ENGLISH -> Glowing Interactive Lecture Book */}
        {state === 'learning' && (
          <g id="learning-accessory" className="animate-bounce" style={{ transformOrigin: '500px 500px', animationDuration: '3s' }}>
            <rect x="70" y="80" width="180" height="240" rx="20" fill="#10B981" opacity="0.15" />
            {/* Opened Book */}
            <path 
              d="M100,160 C120,150 150,150 160,165 C170,150 200,150 220,160 L220,240 C200,230 175,230 160,245 C145,230 120,230 100,240 Z" 
              fill="#10B981" 
              stroke="#047857" 
              strokeWidth="12" 
              strokeLinejoin="round" 
            />
            {/* Book lines */}
            <line x1="115" y1="180" x2="145" y2="175" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
            <line x1="115" y1="198" x2="145" y2="193" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
            <line x1="115" y1="216" x2="145" y2="211" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
            <line x1="175" y1="175" x2="205" y2="180" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
            <line x1="175" y1="193" x2="205" y2="198" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
            <line x1="175" y1="211" x2="205" y2="216" stroke="#047857" strokeWidth="8" strokeLinecap="round" />
            {/* Sparkles */}
            <circle cx="80" cy="110" r="10" fill="#10B981" />
            <circle cx="230" cy="120" r="6" fill="#10B981" />
          </g>
        )}

        {/* GRADUATING / EXAM PREP -> Premium Academic Graduation Cap (Конфедератка) */}
        {state === 'graduating' && (
          <g id="graduating-accessory">
            {/* Graduation cap positioned on head */}
            <g transform="translate(595, 30) scale(1.1)">
              {/* Back shadows */}
              <polygon points="120,70 230,20 120,-30 10,20" fill="rgba(109, 40, 217, 0.2)" />
              {/* Diamond Cap Top */}
              <polygon points="120,50 220,10 120,-30 20,10" fill="#1e1b4b" stroke="#6D28D9" strokeWidth="12" strokeLinejoin="round" />
              {/* Under-cap Band */}
              <path d="M60,28 L60,55 C60,75 180,75 180,55 L180,28" fill="#12102e" stroke="#6D28D9" strokeWidth="10" strokeLinejoin="round" />
              {/* Tassel */}
              <path d="M120,10 C90,12 80,45 80,65 L80,95" fill="none" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" />
              <rect x="73" y="95" width="14" height="24" rx="4" fill="#FBBF24" />
            </g>
          </g>
        )}

        {/* BUSINESS / WORK ACCENT -> Executive Suit Tie and Floating Briefcase */}
        {state === 'business' && (
          <g id="business-accessory">
            {/* Briefcase hanging under wing */}
            <g transform="translate(450, 680) scale(0.9)">
              <rect x="50" y="80" width="240" height="170" rx="16" fill="#78350F" stroke="#F59E0B" strokeWidth="12" />
              {/* Handle */}
              <path d="M120,80 L120,40 C120,30 220,30 220,40 L220,80" fill="none" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" />
              {/* Lock gold studs */}
              <circle cx="100" cy="130" r="14" fill="#F59E0B" />
              <circle cx="240" cy="130" r="14" fill="#F59E0B" />
              <rect x="135" y="115" width="70" height="100" rx="4" fill="#451a03" />
            </g>
            {/* Business collar and red necktie */}
            <g transform="translate(775, 410) scale(0.8)">
              <polygon points="0,0 60,-30 40,40" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="4" />
              <polygon points="0,0 -60,-30 -40,40" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="4" />
              <polygon points="0,30 25,180 0,225 -25,180" fill="#D97706" />
              <circle cx="0" cy="20" r="12" fill="#B45309" />
            </g>
          </g>
        )}

        {/* CHATTING / CONVERSATIONAL -> Soft Glowing Speech Bubbles */}
        {state === 'chatting' && (
          <g id="chatting-accessory">
            {/* Speech bubble 1 */}
            <g transform="translate(710, -95) scale(0.85)">
              <rect x="50" y="50" width="260" height="150" rx="40" fill="#06B6D4" />
              <polygon points="120,200 150,200 110,240" fill="#06B6D4" />
              {/* Concentric Dots */}
              <circle cx="120" cy="125" r="14" fill="#FFFFFF" />
              <circle cx="180" cy="125" r="14" fill="#FFFFFF" />
              <circle cx="240" cy="125" r="14" fill="#FFFFFF" />
            </g>
            {/* Small reactive bubble */}
            <g transform="translate(140, 420) scale(0.7)">
              <rect x="50" y="50" width="180" height="120" rx="30" fill="#0891B2" opacity="0.8" />
              <polygon points="180,170 190,200 150,170" fill="#0891B2" opacity="0.8" />
              <circle cx="110" cy="110" r="8" fill="#FFF" />
              <circle cx="140" cy="110" r="8" fill="#FFF" />
              <circle cx="170" cy="110" r="8" fill="#FFF" />
            </g>
          </g>
        )}

        {/* UNIVERSITY ENROLLMENT -> Grand Neoclassical University Pillar Pillars */}
        {state === 'university' && (
          <g id="university-accessory">
            {/* Elegant classic building in background */}
            <g transform="translate(60, 100) scale(0.95)" opacity="0.9">
              {/* Foundation/steps */}
              <rect x="40" y="240" width="320" height="24" fill="#3B82F6" rx="4" />
              <rect x="60" y="216" width="280" height="24" fill="#1D4ED8" rx="4" />
              {/* Pillars */}
              <rect x="90" y="90" width="24" height="126" fill="#3B82F6" rx="2" />
              <rect x="160" y="90" width="24" height="126" fill="#3B82F6" rx="2" />
              <rect x="230" y="90" width="24" height="126" fill="#3B82F6" rx="2" />
              <rect x="300" y="90" width="24" height="126" fill="#3B82F6" rx="2" />
              {/* Pediment Arch (Triangle heading) */}
              <polygon points="40,90 360,90 200,10" fill="#1E40AF" stroke="#3B82F6" strokeWidth="8" strokeLinejoin="round" />
              {/* Inner university star / crest */}
              <circle cx="200" cy="55" r="14" fill="#FFF" />
              <polygon points="200,47 203,53 210,55 203,57 200,63 197,57 190,55 197,53" fill="#3B82F6" />
            </g>
          </g>
        )}

        {/* IMMIGRATION -> Flying Globe + Passport Suitcase Coordinates */}
        {state === 'passport' && (
          <g id="immigration-accessory">
            {/* Globe in top-left */}
            <g transform="translate(60, 60) scale(0.95)" stroke="#F43F5E" strokeWidth="8" fill="none">
              <circle cx="140" cy="140" r="110" fill="#FFF1F2" strokeWidth="12" />
              {/* Meridians & Latitudes */}
              <path d="M140,30 A75,110 0 0,0 140,250" />
              <path d="M140,30 A75,110 0 0,1 140,250" />
              <line x1="140" y1="30" x2="140" y2="250" />
              <line x1="30" y1="140" x2="250" y2="140" />
              <path d="M45,90 Q140,110 235,90" />
              <path d="M45,190 Q140,170 235,190" />
            </g>
            {/* Suitcase and boarding pass/passport */}
            <g transform="translate(630, 480) scale(0.85)">
              <rect x="50" y="80" width="220" height="170" rx="30" fill="#E11D48" stroke="#FDA4AF" strokeWidth="10" />
              {/* Rolling handle */}
              <path d="M110,80 L110,20 L210,20 L210,80" fill="none" stroke="#E11D48" strokeWidth="12" strokeLinecap="round" />
              {/* Wheels */}
              <circle cx="95" cy="265" r="18" fill="#1E293B" stroke="#FDA4AF" strokeWidth="4" />
              <circle cx="225" cy="265" r="18" fill="#1E293B" stroke="#FDA4AF" strokeWidth="4" />
              {/* Cute heart/travel sticker */}
              <polygon points="160,135 175,120 190,135 175,170" fill="#FFFFFF" />
              <circle cx="168" cy="127" r="8" fill="#FFFFFF" />
              <circle cx="182" cy="127" r="8" fill="#FFFFFF" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
