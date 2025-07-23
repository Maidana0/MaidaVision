"use client"

import { useEffect, useRef, useState } from "react"
// Documentación generada con copilot utilizando el modelo de Claud Sonnet 3.5
/**
 * Error types that can occur during speech recognition
 */
type SpeechRecognitionErrorType = 
  | 'not-supported' 
  | 'no-speech'
  | 'network'
  | 'not-allowed'
  | 'service-not-allowed';

/**
 * Custom error class for speech recognition errors
 */
class SpeechRecognitionError extends Error {
  constructor(public type: SpeechRecognitionErrorType, message: string) {
    super(message);
    this.name = 'SpeechRecognitionError';
  }
}

/**
 * Configuration options for the speech-to-text hook
 */
interface SpeechToTextOptions {
  /** Whether recognition should continue after the user stops speaking */
  continuous?: boolean;
  /** Whether to return interim results while the user is speaking */
  interimResults?: boolean;
  /** BCP 47 language tag for recognition (e.g., 'es-AR', 'en-US') */
  lang?: string;
  /** Whether to preserve transcript on mobile devices after stopping */
  preserveTranscriptOnMobile?: boolean;
}

// Grammar for speech recognition punctuation marks
const SPEECH_GRAMMAR = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ; | ? | ! | ¿ | ¡ | : | - | ( | ) | [ | ] | { | } | \" | ' | < | > | / | \\ | _ | ~ | $ | % | ^ | & | * | + | = | @ | # | "


/**
 * A React hook that provides speech-to-text functionality using the Web Speech API
 * 
 * @param options - Configuration options for speech recognition
 * @returns An object containing the recognition state and control functions
 * 
 * @example
 * ```tsx
 * const { transcript, isListening, startListening, stopListening } = useSpeechToText({
 *   lang: 'es-AR',
 *   continuous: true
 * });
 * ```
 */
const useSpeechToText = ({
  interimResults = false,
  lang = "es-AR",
  continuous = false,
  preserveTranscriptOnMobile = false
}: SpeechToTextOptions = {}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<SpeechRecognitionError | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        throw new SpeechRecognitionError(
          'not-supported',
          'Speech recognition is not available in non-browser environments'
        );
      }

      if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        throw new SpeechRecognitionError(
          'not-supported',
          "Browser doesn't support speech recognition"
        );
      }

      const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

    const recognition = recognitionRef.current

    recognition.interimResults = interimResults
    recognition.lang = lang
    recognition.continuous = continuous

    if ("webkitSpeechGrammarList" in window) {

      const speechRecognitionList = new window.webkitSpeechGrammarList()
      speechRecognitionList.addFromString(SPEECH_GRAMMAR, 1)
      recognition.grammars = speechRecognitionList

      recognition.onresult = (event) => {
        let interimTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        interimTranscript = interimTranscript
          .replace(/punto y coma/gi, ";")
          .replace(/punto/gi, ".")
          .replace(/coma/gi, ",")
          .replace(/salto de línea/gi, "\n")
          .replace(/barra/gi, "/");



        // Poner en mayuscula la primer letra antes de los signos indicados...
        interimTranscript = interimTranscript
          .toLowerCase()
          .replace(/(^\w)|(\.|\;|\n)\s*\w/g, (match) => {
            return match.toUpperCase();
          });

        // Borrar espacios antes de la puntuacion && antes y despues de saltos de lineas
        interimTranscript = interimTranscript
          .replace(/\s+([.,;?!])/g, '$1')
          .replace(/\n+\s/g, '\n')
          .replace(/\s+\n/g, '\n');

        setTranscript(interimTranscript);
      };

    }

    recognition.onerror = (event) => {
      const errorType = event.error as SpeechRecognitionErrorType;
      const errorMessage = `Speech recognition error: ${event.error}`;
      setError(new SpeechRecognitionError(errorType, errorMessage));
      setIsListening(false);
    }

    recognition.onend = () => {
      setIsListening(false);
      if (!preserveTranscriptOnMobile && isMobile()) {
        setTranscript("");
      }
    }

    return () => {
      recognition.stop();
    }
    } catch (err) {
      if (err instanceof SpeechRecognitionError) {
        setError(err);
      } else {
        setError(new SpeechRecognitionError('not-supported', 'An unexpected error occurred'));
      }
    }
  }, [preserveTranscriptOnMobile])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }


  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }

  }

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    isSupported: !error?.type.includes('not-supported')
  }
}

const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android/i.test(navigator.userAgent);
};

export default useSpeechToText