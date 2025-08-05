import { useState } from 'react'

const ShareButtons = () => {
  const [copied, setCopied] = useState(false)
  
  const siteUrl = 'https://18.cuantofalta.cl'
  const shareText = '¿Cuánto falta para el 18? ¡Cuenta regresiva para las Fiestas Patrias de Chile! 🇨🇱'
  
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + siteUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
    instagram: `https://www.instagram.com/`, // Instagram no permite compartir enlaces directamente
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`
  }
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = siteUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  const openShare = (platform) => {
    if (platform === 'instagram') {
      // Para Instagram, simplemente abrimos la app/web
      window.open(shareLinks.instagram, '_blank')
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    }
  }
  
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 md:p-4 mb-3 md:mb-4">
      <h3 className="text-center text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
        📤 ¡Comparte la cuenta regresiva!
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {/* WhatsApp */}
        <button
          onClick={() => openShare('whatsapp')}
          className="flex items-center gap-1 md:gap-2 bg-green-500 hover:bg-green-600 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors duration-200 shadow-md text-sm md:text-base"
          title="Compartir en WhatsApp"
        >
          <span className="text-base md:text-lg">📱</span>
          <span className="font-medium">WhatsApp</span>
        </button>
        
        {/* Facebook */}
        <button
          onClick={() => openShare('facebook')}
          className="flex items-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors duration-200 shadow-md text-sm md:text-base"
          title="Compartir en Facebook"
        >
          <span className="text-base md:text-lg">📘</span>
          <span className="font-medium">Facebook</span>
        </button>
        
        {/* Instagram */}
        <button
          onClick={() => openShare('instagram')}
          className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors duration-200 shadow-md text-sm md:text-base"
          title="Abrir Instagram"
        >
          <span className="text-base md:text-lg">📷</span>
          <span className="font-medium">Instagram</span>
        </button>
        
        {/* X (Twitter) */}
        <button
          onClick={() => openShare('twitter')}
          className="flex items-center gap-1 md:gap-2 bg-black hover:bg-gray-800 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors duration-200 shadow-md text-sm md:text-base"
          title="Compartir en X (Twitter)"
        >
          <span className="text-base md:text-lg">🐦</span>
          <span className="font-medium">X</span>
        </button>
        
        {/* Copiar enlace */}
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors duration-200 shadow-md text-sm md:text-base ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          title="Copiar enlace"
        >
          <span className="text-base md:text-lg">{copied ? '✅' : '🔗'}</span>
          <span className="font-medium">{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
      </div>
      
      <p className="text-center text-xs md:text-sm text-gray-600 mt-2 md:mt-3">
        🇨🇱 ¡Comparte la emoción de las Fiestas Patrias!
      </p>
    </div>
  )
}

export default ShareButtons

