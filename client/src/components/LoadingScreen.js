import React, { useEffect, useState } from 'react';

const loadingStyles = `
  @keyframes flicker {
    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
      opacity: 0.99;
      text-shadow: 0 0 10px #0fa, 0 0 20px #0fa, 0 0 30px #0fa;
    }
    20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
      opacity: 0.4;
      text-shadow: none;
    }
  }

  @keyframes textSplit {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  @keyframes doorOpenLeft {
    0% { transform: translateX(0) rotateY(0); }
    100% { transform: translateX(-100%) rotateY(-90deg); }
  }

  @keyframes doorOpenRight {
    0% { transform: translateX(0) rotateY(0); }
    100% { transform: translateX(100%) rotateY(90deg); }
  }

  @keyframes textGlow {
    0%, 100% {
      text-shadow: 0 0 10px #0fa, 0 0 20px #0fa;
    }
    50% {
      text-shadow: 0 0 20px #0fa, 0 0 40px #0fa;
    }
  }
`;

function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [showHacked, setShowHacked] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [splitText, setSplitText] = useState(false);
  const [doorAnimation, setDoorAnimation] = useState(false);
  const message = 'ACCESS GRANTED';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 10) + 1;
        return next >= 100 ? 100 : next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShowHacked(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (!showHacked) return;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(message.slice(0, i + 1));
      i++;
      if (i === message.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSplitText(true);
          setTimeout(() => {
            setDoorAnimation(true);
            setTimeout(() => {
              onFinish?.();
            }, 1000);
          }, 500);
        }, 1000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [showHacked]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-green-400 overflow-hidden">
      <style>{loadingStyles}</style>

      {!showHacked ? (
        <>
          <div className="text-2xl mb-4">SYSTEM BOOTING...</div>
          <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-green-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm">{progress}%</div>
        </>
      ) : (
        <div className="text-center relative z-10">
          {!splitText ? (
            <div
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                animation: 'textGlow 1.5s infinite',
                whiteSpace: 'pre',
              }}
            >
              {typedText}
              {typedText.length < message.length && (
                <span className="animate-pulse">_</span>
              )}
            </div>
          ) : (
            <div className="relative">
              <div
                className="absolute text-4xl md:text-6xl font-bold left-0"
                style={{
                  animation: 'textSplit 0.5s forwards',
                  transformOrigin: 'right center',
                  color: '#0fa',
                }}
              >
                {message.substring(0, message.length / 2)}
              </div>
              <div
                className="absolute text-4xl md:text-6xl font-bold right-0"
                style={{
                  animation: 'textSplit 0.5s forwards',
                  transformOrigin: 'left center',
                  color: '#0fa',
                }}
              >
                {message.substring(message.length / 2)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Door panels with 3D effect */}
      {doorAnimation && (
        <>
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-black z-20 origin-right transform-style-preserve-3d"
            style={{
              animation: 'doorOpenLeft 1s ease-in forwards',
              boxShadow: 'inset -20px 0 50px rgba(0, 255, 170, 0.3)'
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-black z-20 origin-left transform-style-preserve-3d"
            style={{
              animation: 'doorOpenRight 1s ease-in forwards',
              boxShadow: 'inset 20px 0 50px rgba(0, 255, 170, 0.3)'
            }}
          />
        </>
      )}
    </div>
  );
}

export default LoadingScreen;
