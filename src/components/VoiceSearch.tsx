import { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function VoiceSearch() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  }, []);

  const handleSearch = () => {
    if (transcript.trim()) {
      navigate(`/search?q=${encodeURIComponent(transcript)}`);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="px-4 py-3">
      <div className="relative flex items-center gap-3">
        {/* Voice Button */}
        <button
          onClick={startListening}
          disabled={isListening}
          className={cn(
            "flex-shrink-0 p-4 rounded-full transition-all duration-300 shadow-lg",
            isListening 
              ? "bg-accent animate-pulse scale-110" 
              : "bg-primary hover:bg-primary/90"
          )}
        >
          {isListening ? (
            <Mic className="h-7 w-7 text-accent-foreground animate-bounce" />
          ) : (
            <Mic className="h-7 w-7 text-primary-foreground" />
          )}
        </button>

        {/* Search Input / Transcript Display */}
        <div className="flex-1 relative">
          <div className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all",
            isListening 
              ? "border-accent bg-accent/10" 
              : "border-border bg-secondary"
          )}>
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            
            {transcript ? (
              <div className="flex-1 flex items-center gap-2">
                <span className="text-foreground font-medium truncate">
                  {transcript}
                </span>
                <button 
                  onClick={clearTranscript}
                  className="p-1 rounded-full hover:bg-muted"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">
                {isListening ? "🎤 बोलिए..." : "🎙️ आवाज़ से खोजें"}
              </span>
            )}
          </div>

          {/* Listening Animation */}
          {isListening && (
            <div className="absolute -bottom-1 left-4 right-4 flex justify-center gap-1">
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Search Button (shown when transcript exists) */}
        {transcript && (
          <button
            onClick={handleSearch}
            className="flex-shrink-0 p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Search className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-center text-xs text-muted-foreground mt-2">
        {isListening 
          ? "सुन रहा हूँ... बोलना जारी रखें" 
          : "माइक बटन दबाएं और बोलें \"ट्रैक्टर चाहिए\""
        }
      </p>
    </div>
  );
}
