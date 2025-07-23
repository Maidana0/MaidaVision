'use client';

import { CommandInput } from 'maidana07/components/ui/command';
import { Button } from 'maidana07/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import useSpeechToText from 'maidana07/hooks/use-speech-to-text';
import cn from 'maidana07/utils/cn';
import { useEffect } from 'react';
import useDialogStore from 'maidana07/store/use-dialog-store';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';

const errorMessages = {
  'not-supported': 'Tu navegador no soporta el reconocimiento de voz',
  'not-allowed': 'No se pudo acceder al micrófono. Verifica los permisos',
  'no-speech': 'No se detectó ninguna voz',
  'network': 'Error de red al procesar el audio',
  'service-not-allowed': 'Servicio no disponible',
  'default': 'Error al iniciar el reconocimiento de voz'
};

interface VoiceSearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export default function VoiceSearchInput({
  value,
  onValueChange,
  placeholder = "Buscar películas o series...",
  loading = false,
}: VoiceSearchInputProps) {
  const isDialogOpen = useDialogStore(useShallow(state => state.search))

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
    isSupported
  } = useSpeechToText({ preserveTranscriptOnMobile: true });

  // Manejar el estado del diálogo y el transcript
  useEffect(() => {
    if (transcript) {
      onValueChange(transcript);
    }
    if (!isDialogOpen && isListening) {
      stopListening();
    }
  }, [transcript, onValueChange, isDialogOpen, isListening, stopListening]);

  // Manejar errores con Sonner
  useEffect(() => {
    if (error) toast.error(errorMessages[error.type] || errorMessages.default);
  }, [error]);

  return (
    <div className="flex items-center align-middle px-1">
      <CommandInput
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        className="pr-9"
        contentClassName="w-full"
      />
      <Button
        size="icon"
        variant="ghost"
        type="button"
        className={cn(
          "absolute right-3 p-3 transition-all",
          isListening ? "text-primary" : "text-muted-foreground",
          (loading || !isSupported || error) && "opacity-50 cursor-not-allowed",
        )}
        disabled={loading || !isSupported || !!error}
        onClick={() => {
          if (!isSupported) {
            toast.error(errorMessages['not-supported']);
            return;
          }
          isListening ? stopListening() : startListening();
        }}
        title={
          !isSupported
            ? errorMessages["not-supported"]
            : isListening
              ? "Detener dictado"
              : "Buscar por voz"
        }
      >
        {isListening ? (
          <MicOff className="size-5" />
        ) : (
          <Mic className="size-5" />
        )}
      </Button>
    </div>
  );
}
