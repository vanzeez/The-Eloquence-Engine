import React, { useState, useRef, useCallback } from "react";
import { victorianify } from "../tools/victorianify";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SparklesCore } from "@/components/ui/sparkles";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const createSparkles = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      delay: Math.random() * 0.5,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2000);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
  };

  const handleVictorianize = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!inputText.trim()) return;
    createSparkles(event);
    setIsLoading(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Audio play error:", err);
      });
    }
    try {
      const result = await victorianify(inputText);
      setOutputText(result);
    } catch (err) {
      setOutputText("");
      console.error("LLM error:", err);
      alert("Hold thy horses, the machine hath lost its manners.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAnother = async () => {
    setIsLoading(true);
    try {
      const result = await victorianify(inputText);
      setOutputText(result);
    } catch (err) {
      setOutputText("");
      alert("Hold thy horses, the machine hath lost its manners.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-charcoal text-off-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `url("https://cdn.builder.io/api/v1/assets/8cbfc332af834a00a8dd0cc8ec9a097c/image-a2d6ed?format=webp&width=800")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(49, 45, 37, 0.7)",
            color: "rgba(200, 163, 85, 1)",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl flex flex-col min-h-[80vh] justify-center">
        <audio
          id="victorianSound"
          ref={audioRef}
          src="/trumpet.mp3"
          preload="auto"
        />
        <header className="text-center mb-12 group">
          <h1
            className="font-old-english text-6xl md:text-8xl mb-4 drop-shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(236,212,81,0.6)]"
            style={{ color: "rgba(236, 212, 81, 1)", margin: "17px 0 16px" }}
          >
            The Eloquence Engine
          </h1>
          <p
            className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-gray-200 group-hover:scale-105 mt-8"
            style={{ fontFamily: 'IM Fell English, serif' }}
          >
            Texting like a pleb? Get thee a Victorian upgrade.
          </p>
        </header>
        <div className="space-y-8">
          <div className="space-y-4 group">
            <label
              htmlFor="input-text"
              className="block text-base md:text-lg text-regal-gold transition-all duration-300 mb-2"
              style={{ fontFamily: 'IM Fell English, serif' }}
            >
              Enter thy humble words:
            </label>
            <div className="relative group/input">
              <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Cast thy cursed slang into this sacred box...."
                className="w-full h-32 md:h-40 p-6 border-2 border-parchment focus:ring-4 focus:ring-regal-gold/40 transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none rounded-xl relative z-10 shadow-[0_0_16px_2px_rgba(236,212,81,0.25)] focus:shadow-[0_0_32px_4px_rgba(236,212,81,0.35)] beige-glow"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#F4F1E8', boxShadow: '0 0 16px 2px rgba(236,212,81,0.25)' }}
                disabled={isLoading}
              />
            </div>
          </div>
          {!outputText && (
            <div className="text-center group relative flex flex-col items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <div className="w-48 h-24 relative flex items-center justify-center">
                    <SparklesCore
                      id="sparkles-victorianize"
                      background="transparent"
                      minSize={1.0}
                      maxSize={1.5}
                      particleDensity={60}
                      className="w-full h-full"
                      particleColor="#FFD700"
                    />
                  </div>
                </div>
              )}
              <div className="relative z-10 inline-block">
                <button
                  onClick={handleVictorianize}
                  disabled={!inputText.trim() || isLoading}
                  className="px-6 py-3 text-base font-bold text-[#b22234] bg-transparent border-2 border-[#b22234] rounded-lg shadow-lg transform transition-all duration-300 hover:bg-[#b22234] hover:text-white hover:border-[#b22234] hover:shadow-[0_0_20px_rgba(178,34,52,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'IM Fell English, serif' }}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Transforming thy words...</span>
                      </>
                    ) : (
                      <>
                        <span>Victorianize Me</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}
          {outputText && (
            <div className="animate-scroll-appear group mt-12">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-regal-gold to-transparent w-full transition-all duration-500 group-hover:via-yellow-300"></div>
                <div className="mx-4 text-regal-gold transition-all duration-500 group-hover:text-yellow-300 group-hover:scale-110">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-regal-gold to-transparent w-full transition-all duration-500 group-hover:via-yellow-300"></div>
              </div>
              <div className="relative group/output">
                <div className="bg-parchment-dark border-2 border-regal-gold rounded-xl p-6 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 group-hover/output:border-yellow-300 group-hover/output:shadow-[0_0_60px_10px_rgba(236,212,81,0.5)] group-hover/output:scale-[1.04] animate-glow-pulse"
                  style={{
                    boxShadow: "0 0 60px 10px rgba(236, 212, 81, 0.5), 0 0 120px 20px rgba(236, 212, 81, 0.3)",
                    padding: '2.5rem',
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl text-regal-gold text-center flex-1 transition-all duration-500 group-hover/output:text-yellow-300 group-hover/output:scale-105" style={{ fontFamily: 'IM Fell English, serif' }}>
                        Thy Victorian Transformation
                      </h3>
                      <button
                        onClick={handleCopy}
                        className="ml-4 p-2 text-regal-gold hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                        title="Copy to clipboard"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-lg leading-relaxed text-off-white transition-all duration-500 group-hover/output:text-gray-100" style={{ fontFamily: 'IM Fell English, serif' }}>
                      <TextGenerateEffect duration={2} filter={false} words={outputText} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mt-8 md:mt-10 mb-24 md:mb-20 w-full">
                <button
                  onClick={handleReset}
                  className="w-full md:w-auto mb-3 md:mb-0 px-6 py-3 text-lg font-bold text-regal-gold bg-transparent border-2 border-regal-gold rounded-lg shadow-lg transform transition-all duration-300 hover:bg-regal-gold hover:text-dark-charcoal hover:shadow-[0_0_20px_rgba(236,212,81,0.4)] hover:scale-105 active:scale-95"
                  style={{ fontFamily: 'IM Fell English, serif' }}
                >
                  Commence Anew
                </button>
                <button
                  onClick={handleGenerateAnother}
                  disabled={isLoading}
                  className="w-full md:w-auto px-6 py-3 text-base font-bold text-[#b22234] bg-transparent border-2 border-[#b22234] rounded-lg shadow-lg transform transition-all duration-300 hover:bg-[#b22234] hover:text-white hover:border-[#b22234] hover:shadow-[0_0_20px_rgba(178,34,52,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'IM Fell English, serif' }}
                >
                  Summon Again
                </button>
              </div>
            </div>
          )}
        </div>
        <footer className="w-full text-center z-50 fixed bottom-0 left-0 bg-dark-charcoal py-4 border-t border-regal-gold">
          <p className="text-gray-500 text-base md:text-xl px-2" style={{ fontFamily: 'IM Fell English, serif' }}>
            Initiative by a <a href="https://github.com/vanzeez" target="_blank" rel="noopener noreferrer" className="text-regal-gold hover:text-yellow-300 font-bold underline inline">Victorian lady</a> to bestow your Gen Z musings with a touch of Victorian grandeur.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
