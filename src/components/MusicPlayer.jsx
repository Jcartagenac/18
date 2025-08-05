import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, ExternalLink } from 'lucide-react'

const MusicPlayer = () => {
  const [showVideo, setShowVideo] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  // ID del video de YouTube "Chica Vacilona" de Contrabando Sureño
  const youtubeVideoId = "vHa6PzOg6oA"
  const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`

  useEffect(() => {
    // Mostrar el video después de la primera interacción del usuario
    const handleFirstInteraction = () => {
      setHasUserInteracted(true)
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
  }, [])

  const toggleVideo = () => {
    setShowVideo(!showVideo)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5 }}
      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-3 md:p-6 mb-4 md:mb-6 relative overflow-hidden"
    >
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-600/10 animate-pulse"></div>
      
      <div className="relative z-10 text-white text-center">
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 flex items-center justify-center gap-2">
          🎵 Música Patriótica 🎵
        </h3>
        
        <div className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-3 md:p-4 mb-3 md:mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-red-400">🇨🇱</span>
            <span className="font-medium text-base md:text-lg">Chica Vacilona</span>
            <span className="text-red-400">🇨🇱</span>
          </div>
          <p className="text-sm text-gray-300 mb-1">Contrabando Sureño</p>
          <p className="text-xs text-gray-400">🎶 Cumbia Ranchera Chilena 🎶</p>
        </div>

        {/* Reproductor de YouTube embebido */}
        {hasUserInteracted && showVideo ? (
          <div className="mb-4">
            {/* Contenedor responsivo para YouTube */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Chica Vacilona - Contrabando Sureño"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          /* Imagen de vista previa */
          <div className="mb-4">
            <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <img
                src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                alt="Chica Vacilona - Vista previa"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-red-600 rounded-full p-4 cursor-pointer"
                  onClick={toggleVideo}
                >
                  <Play size={32} className="text-white ml-1" />
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Controles */}
        <div className="flex items-center justify-center gap-4">
          {!showVideo ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVideo}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors duration-200 shadow-lg flex items-center gap-2"
              disabled={!hasUserInteracted}
            >
              <Play size={20} />
              <span>Reproducir Video</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVideo}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors duration-200 shadow-lg flex items-center gap-2"
            >
              <Pause size={20} />
              <span>Ocultar Video</span>
            </motion.button>
          )}
          
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full transition-colors duration-200 shadow-lg flex items-center gap-2"
          >
            <ExternalLink size={20} />
            <span className="hidden sm:inline">YouTube</span>
          </motion.a>
        </div>

        {/* Indicador de estado */}
        <div className="mt-3 text-xs text-gray-400">
          {!hasUserInteracted && (
            <p className="animate-pulse">🎵 Haz clic en cualquier lugar para activar el reproductor 🎵</p>
          )}
          {hasUserInteracted && !showVideo && (
            <p className="text-yellow-400">▶️ Presiona "Reproducir Video" para escuchar la música</p>
          )}
          {hasUserInteracted && showVideo && (
            <p className="text-green-400">🎵 Video de YouTube reproduciéndose 🎵</p>
          )}
        </div>

        {/* Nota sobre la música */}
        <div className="mt-4 text-xs text-gray-500 border-t border-gray-600 pt-3">
          <p>🎼 Video oficial de "Chica Vacilona" - Contrabando Sureño</p>
          <p className="mt-1">🎥 Reproducción directa desde YouTube con audio de alta calidad</p>
        </div>
      </div>
    </motion.div>
  )
}

export default MusicPlayer

