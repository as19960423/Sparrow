/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Award, ShieldAlert, Sparkles, Volume2, HelpCircle } from 'lucide-react';

interface SparrowGameProps {
  onUnlockDiscount: (score: number, discount: number) => void;
}

export const SparrowGame: React.FC<SparrowGameProps> = ({ onUnlockDiscount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // States
  const [gameState, setGameState] = useState<'idle' | 'countdown' | 'playing' | 'gameover'>('idle');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [replaysLeft, setReplaysLeft] = useState(3);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Game loop and physics refs
  const requestRef = useRef<number | null>(null);
  const birdRef = useRef({ y: 250, velocity: 0, radius: 14, angle: 0 });
  const pipesRef = useRef<Array<{ x: number, top: number, bottom: number, passed: boolean }>>([]);
  const cloudsRef = useRef<Array<{ x: number, y: number, size: number, speed: number }>>([]);
  const particlesRef = useRef<Array<{ x: number, y: number, vx: number, vy: number, alpha: number, color: string }>>([]);
  
  // Timers and settings
  const lastTimeRef = useRef<number>(0);
  const gameWidth = 400; // logical coordinates
  const gameHeight = 500;
  
  // Initialize Cloud backgrounds
  useEffect(() => {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * gameWidth,
        y: Math.random() * (gameHeight - 200) + 50,
        size: Math.random() * 30 + 30,
        speed: Math.random() * 0.2 + 0.1
      });
    }
    cloudsRef.current = clouds;

    // Load local highscore & replays
    const storedHighScore = localStorage.getItem('sparrow_game_highscore');
    if (storedHighScore) setHighScore(parseInt(storedHighScore, 10));

    const storedReplays = localStorage.getItem('sparrow_game_replays_left_2026');
    if (storedReplays !== null) {
      setReplaysLeft(parseInt(storedReplays, 10));
    } else {
      localStorage.setItem('sparrow_game_replays_left_2026', '3');
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        triggerFlap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Handle countdown sequences
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'countdown' && countdown !== null) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        setCountdown(null);
        startActualPlay();
      }
    }
    return () => clearTimeout(timer);
  }, [gameState, countdown]);

  const triggerFlap = () => {
    if (gameState === 'idle') {
      // Start Game Flow
      handleStartGame(isPracticeMode);
    } else if (gameState === 'playing') {
      birdRef.current.velocity = -5.8;
      // create fly particles
      createParticles(birdRef.current.radius + 10, birdRef.current.y, '#FF8C00', 3);
    } else if (gameState === 'gameover') {
      handleStartGame(isPracticeMode);
    }
  };

  const createParticles = (x: number, y: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.7) * 2,
        vy: (Math.random() - 0.5) * 2,
        alpha: 1.0,
        color
      });
    }
  };

  const handleStartGame = (practice: boolean) => {
    setErrorMsg('');
    setIsPracticeMode(practice);

    if (!practice && replaysLeft <= 0) {
      setErrorMsg('У вас закончились попытки для получения скидки. Но вы можете тренироваться бесконечно!');
      setIsPracticeMode(true);
      return;
    }

    if (!practice) {
      const remaining = replaysLeft - 1;
      setReplaysLeft(remaining);
      localStorage.setItem('sparrow_game_replays_left_2026', remaining.toString());
    }

    // Reset Bird positioning
    birdRef.current = { y: 220, velocity: -2, radius: 14, angle: 0 };
    pipesRef.current = [];
    particlesRef.current = [];
    setCurrentScore(0);
    setGameState('countdown');
    setCountdown(3);
  };

  const startActualPlay = () => {
    setGameState('playing');
    lastTimeRef.current = performance.now();
    // Add first pipe further away to give player a warm up and a generous gap
    pipesRef.current = [
      { x: gameWidth + 150, top: 165, bottom: 175, passed: false }
    ];
  };

  // Main Canvas Rendering and loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const gameLoop = (timestamp: number) => {
      // Delta time limit
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 16.67, 4); // target is 60fps (16.6ms)
      lastTimeRef.current = timestamp;

      // 1. CLEAR & BACKGROUND DRAWING
      ctx.clearRect(0, 0, gameWidth, gameHeight);

      // Sky gradient (Soft morning/day horizon)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, gameHeight);
      skyGrad.addColorStop(0, '#E0F2FE'); // light sky
      skyGrad.addColorStop(0.7, '#F0FDFA'); // very soft teal
      skyGrad.addColorStop(1, '#FFFbeb'); // golden soft bottom
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, gameWidth, gameHeight);

      // Clouds update & render
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      cloudsRef.current.forEach(cloud => {
        if (gameState === 'playing') {
          cloud.x -= cloud.speed * dt;
          if (cloud.x < -100) {
            cloud.x = gameWidth + 50;
            cloud.y = Math.random() * (gameHeight - 200) + 50;
          }
        }
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.6, cloud.y - cloud.size * 0.2, cloud.size * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 1.2, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. PHYSICS & STATE UPDATES (Only if state is 'playing')
      if (gameState === 'playing') {
        const bird = birdRef.current;
        bird.velocity += 0.28 * dt; // gravity impact
        bird.y += bird.velocity * dt;
        bird.angle = Math.min(Math.max(bird.velocity * 0.08, -0.4), 0.7);

        // Ceiling and floor bounds
        if (bird.y - bird.radius < 0) {
          bird.y = bird.radius;
          bird.velocity = 0;
        }
        if (bird.y + bird.radius > gameHeight - 5) {
          triggerGameOver();
        }

        // Obstacles (Academic Textbooks) logic
        const pipes = pipesRef.current;
        
        // Spawn pipes with increased horizontal spacing and larger column gaps
        if (pipes.length === 0 || pipes[pipes.length - 1].x < gameWidth - 230) {
          const gap = Math.max(165 - Math.floor(currentScore / 5) * 3, 135); // wider column opening for better playability
          const margin = 50;
          const topHeight = Math.floor(Math.random() * (gameHeight - gap - margin * 2)) + margin;
          const bottomHeight = gameHeight - gap - topHeight;
          pipes.push({
            x: gameWidth + 50,
            top: topHeight,
            bottom: bottomHeight,
            passed: false
          });
        }

        // Process pipes positions & collisions
        pipes.forEach((pipe, idx) => {
          pipe.x -= 2.2 * dt; // scroll speed

          // Collision detection
          const birdX = 100; // bird center x coordinate
          const bx = birdX;
          const by = bird.y;
          const br = bird.radius;

          // Upper textbook bound
          if (bx + br > pipe.x && bx - br < pipe.x + 55) {
            if (by - br < pipe.top || by + br > gameHeight - pipe.bottom) {
              triggerGameOver();
            }
          }

          // Scoring Check
          if (!pipe.passed && pipe.x + 25 < birdX) {
            pipe.passed = true;
            setCurrentScore(prev => {
              const next = prev + 1;
              // Sparkle sparkles on score increment
              createParticles(100, bird.y, '#F59E0B', 12);
              return next;
            });
          }
        });

        // Filter out off-screen pipes
        pipesRef.current = pipes.filter(p => p.x > -80);
      }

      // 3. RENDER TEXTBOOKS / OBSTACLES (Thematic design!)
      pipesRef.current.forEach(pipe => {
        // Draw upper book spine/cover
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#334155';

        // UPPER Textbook
        ctx.fillStyle = '#0F766E'; // Teal book
        ctx.fillRect(pipe.x, 0, 52, pipe.top);
        ctx.fillStyle = '#FFF9F2'; // Pages line
        ctx.fillRect(pipe.x + 8, pipe.top - 18, 36, 18);
        ctx.strokeStyle = '#042F2E';
        ctx.strokeRect(pipe.x, 0, 52, pipe.top);
        // Cover lining
        ctx.fillStyle = '#C10E1C';
        ctx.fillRect(pipe.x + 2, pipe.top - 6, 48, 4);

        // LOWER Textbook
        ctx.fillStyle = '#6D28D9'; // violet book
        ctx.fillRect(pipe.x, gameHeight - pipe.bottom, 52, pipe.bottom);
        ctx.fillStyle = '#FFF9F2'; // Pages line
        ctx.fillRect(pipe.x + 8, gameHeight - pipe.bottom, 36, 18);
        ctx.strokeRect(pipe.x, gameHeight - pipe.bottom, 52, pipe.bottom);
        // Cover lining
        ctx.fillStyle = '#FF8C00';
        ctx.fillRect(pipe.x + 2, gameHeight - pipe.bottom + 14, 48, 4);

        // Fun academic tags or details on pipes removed as requested
      });

      // 4. PARTICLES ENGINE UPDATE & RENDER
      const pList = particlesRef.current;
      pList.forEach((p, index) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= 0.02 * dt;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0; // reset
      particlesRef.current = pList.filter(p => p.alpha > 0);

      // 5. DRAW PLAYABLE SPARROW (Animated SVG mimic)
      ctx.save();
      const bBird = birdRef.current;
      const drawX = 100; // static visual anchor
      ctx.translate(drawX, bBird.y);
      ctx.rotate(bBird.angle);

      // Draw stylized bird wings, body, eye, beak
      // Core Orange Belly
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.arc(0, 0, bBird.radius, 0, Math.PI * 2);
      ctx.fill();

      // Teal Wing Overlay
      ctx.fillStyle = '#054E5A';
      ctx.beginPath();
      ctx.ellipse(-4, -2, bBird.radius - 2, bBird.radius - 7, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Red Cap/Head
      ctx.fillStyle = '#C10E1C';
      ctx.beginPath();
      ctx.arc(4, -4, bBird.radius - 5, -Math.PI / 2, Math.PI / 3);
      ctx.fill();

      // Beak (Golden)
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.moveTo(bBird.radius - 1, -4);
      ctx.lineTo(bBird.radius + 6, -1);
      ctx.lineTo(bBird.radius - 1, 2);
      ctx.closePath();
      ctx.fill();

      // Tiny Eye
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(5, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(5.5, -6, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 6. DRAW COUNTDOWN OR TEXT INSTRUCTIONS OVERLAYS
      if (gameState === 'countdown' && countdown !== null) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
        ctx.fillRect(0, 0, gameWidth, gameHeight);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 84px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 15;
        ctx.fillText(countdown.toString(), gameWidth / 2, gameHeight / 2 + 25);
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    if (gameState === 'playing' || gameState === 'idle' || gameState === 'countdown') {
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, countdown]);

  const triggerGameOver = () => {
    setGameState('gameover');
    
    // Assess scoring milestones for rewards
    let discount = 0;
    if (currentScore >= 50) {
      discount = 20;
    } else if (currentScore >= 10) {
      discount = 10;
    }

    // Trigger highscore and store
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem('sparrow_game_highscore', currentScore.toString());
    }

    if (discount > 0 && !isPracticeMode) {
      // Unlocked a valid promotion! Let the modal open
      setTimeout(() => {
        onUnlockDiscount(currentScore, discount);
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-slate-100 rounded-3xl p-4 sm:p-6 shadow-xl" id="sparrow-game-panel">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
        <div>
          <h4 className="text-lg font-bold text-slate-800 font-sans flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            Интерактивный Полет Воробья
          </h4>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">
            Обойдите препятствия! Управляйте тапом по экрану или Пробелом.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-sans">Рекорд</p>
          <p className="text-base font-bold text-brand font-sans">{highScore} очков</p>
        </div>
      </div>

      {/* Actual Game Canvas Wrapper with Touch Actions Disabled */}
      <div className="relative flex items-center justify-center select-none touch-none overflow-hidden rounded-2xl border-4 border-slate-50 shadow-inner bg-sky-50">
        <canvas
          ref={canvasRef}
          width={gameWidth}
          height={gameHeight}
          onClick={triggerFlap}
          className="cursor-pointer max-w-full aspect-[4/5] object-contain touch-none block"
          style={{ width: '100%', maxWidth: '400px' }}
        />

        {/* Floating overlays for play screens */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[3px] p-6 text-center">
            <Award className="w-16 h-16 text-yellow-400 mb-3 animate-bounce" />
            <h5 className="text-xl font-bold text-white font-sans">Играйте и выигрывайте скидку!</h5>
            <p className="text-xs text-slate-200 mt-2 max-w-[280px] font-sans leading-relaxed">
              <strong>10 очков</strong> = скидка 10% на курсы<br />
              <strong>50 очков</strong> = скидка 20% на обучение!
            </p>

            <div className="mt-5 space-y-2 w-full max-w-[240px]">
              <button
                onClick={() => handleStartGame(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand text-white font-semibold rounded-xl hover:bg-[#E05216] active:scale-[0.98] transition-all cursor-pointer font-sans text-sm shadow-md"
              >
                <Play className="w-4 h-4 fill-white" />
                Игра за скидку ({replaysLeft} попыток)
              </button>
              
              <button
                onClick={() => handleStartGame(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl active:scale-[0.98] transition-all cursor-pointer border border-white/20 font-sans text-xs"
              >
                Бесконечная тренировка
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/70 p-6 text-center">
            <h5 className="text-2xl font-black text-rose-500 font-sans tracking-tight">Игра Окончена</h5>
            <p className="text-sm text-slate-300 mt-1 font-sans">Ваш результат: <strong className="text-white text-lg">{currentScore}</strong></p>

            {/* Success message indicators */}
            {currentScore >= 10 ? (
              <div className="my-4 p-2.5 px-4 bg-orange-500/20 border border-orange-500/30 rounded-xl max-w-[280px]">
                <p className="text-xs text-orange-200 font-sans leading-relaxed">
                  🎉 Невероятно! Вы разблокировали купон на <strong className="text-white font-bold">{currentScore >= 50 ? '20%' : '10%'} скидку</strong>! Заполните появившуюся форму.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 my-3 font-sans max-w-[260px]">
                Нужно набрать минимум 10 очков для купона на 10% скидку. Попробуйте еще раз!
              </p>
            )}

            <div className="space-y-2 w-full max-w-[220px]">
              {replaysLeft > 0 ? (
                <button
                  onClick={() => handleStartGame(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand text-white font-semibold rounded-xl hover:bg-[#E05216] transition-all cursor-pointer font-sans text-sm shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  Переиграть на скидку ({replaysLeft})
                </button>
              ) : (
                <div className="flex items-center justify-center gap-1.5 py-2 px-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-[11px] max-w-[240px] mb-1 font-sans">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  Попытки для скидки исчерпаны
                </div>
              )}

              <button
                onClick={() => handleStartGame(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all cursor-pointer border border-white/20 font-sans text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Практика (Бесплатно)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rules Information Dashboard & State indicator */}
      <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-sans text-slate-500 border-t border-slate-50 pt-4">
        <div className="p-3 bg-slate-50/50 rounded-2xl flex flex-col justify-between">
          <p className="font-semibold text-slate-700">Официальный купон</p>
          <p className="text-[10px] text-slate-400 mt-1">
            Ограничено 3 попытками в день. Заработанная скидка фиксируется на ваше имя.
          </p>
        </div>
        <div className="p-3 bg-slate-50/50 rounded-2xl flex flex-col justify-between">
          <p className="font-semibold text-slate-700">Бесконечная тренировка</p>
          <p className="text-[10px] text-slate-400 mt-1">
            Развивайте реакцию без лимитов и доказывайте превосходство друзьям!
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100 text-[11px] text-amber-700 font-sans text-center">
          {errorMsg}
        </div>
      )}
    </div>
  );
};
