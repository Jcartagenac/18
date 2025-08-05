import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const audioRef = useRef(null)

  // URL de la canción "Chica Vacilona" de Contrabando Sureño
  const musicUrl = "https://www.youtube.com/watch?v=vHa6PzOg6oA"

  useEffect(() => {
    // Intentar reproducir automáticamente después de la primera interacción del usuario
    const handleFirstInteraction = () => {
      setHasUserInteracted(true)
      if (audioRef.current && !isPlaying) {
        playMusic()
      }
      // Remover el listener después de la primera interacción
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [isPlaying])

  const playMusic = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.log('No se pudo reproducir automáticamente:', error)
      }
    }
  }

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5 }}
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 relative overflow-hidden"
    >
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10 animate-pulse"></div>
      
      <div className="relative z-10 text-white text-center">
        <h3 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2">
          🎵 Música Patriótica 🎵
        </h3>
        
        <div className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-red-400">🌺</span>
            <span className="font-medium text-lg">Chica Vacilona</span>
            <span className="text-red-400">🌺</span>
          </div>
          <p className="text-sm text-gray-300 mb-1">Contrabando Sureño</p>
          <p className="text-xs text-gray-400">🎶 Cumbia Ranchera Chilena 🎶</p>
        </div>

        {/* Controles de reproducción */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        </div>

        {/* Indicador de estado */}
        <div className="mt-3 text-xs text-gray-400">
          {!hasUserInteracted && (
            <p className="animate-pulse">🎵 Haz clic en cualquier lugar para activar la música 🎵</p>
          )}
          {hasUserInteracted && isPlaying && (
            <p className="text-green-400">🎵 Reproduciendo música patriótica 🎵</p>
          )}
          {hasUserInteracted && !isPlaying && (
            <p className="text-yellow-400">⏸️ Música pausada</p>
          )}
        </div>

        {/* Nota sobre la música */}
        <div className="mt-4 text-xs text-gray-500 border-t border-gray-600 pt-3">
          <p>🎼 Música original disponible en YouTube y plataformas digitales</p>
          <p className="mt-1">
            <a 
              href={musicUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Ver video oficial en YouTube
            </a>
          </p>
        </div>
      </div>

      {/* Audio element (oculto) */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        {/* Nota: En un entorno real, aquí iría la URL del archivo de audio */}
        {/* Por ahora, usamos un placeholder ya que no tenemos acceso directo al archivo */}
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </motion.div>
  )
}

export default MusicPlayer

