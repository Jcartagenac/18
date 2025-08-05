import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

// Importar imágenes
import banderaChile1 from './assets/DEtVOd2CRmXS.jpg'
import banderaChile2 from './assets/G4gtKKpBkdDx.png'
import banderaChile3 from './assets/CxrAY2UXBZ6P.png'
import copihue1 from './assets/NaEuFPKg8W1I.jpg'
import copihue2 from './assets/Mqpm6Ozo5LUg.png'
import copihue3 from './assets/9ssTTF2HUE77.png'

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [weekdaysLeft, setWeekdaysLeft] = useState(0)
  const [floatingElements, setFloatingElements] = useState([])

  // Calcular tiempo restante hasta el 18 de septiembre
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let targetDate = new Date(currentYear, 8, 18) // 18 de septiembre (mes 8 = septiembre)
      
      // Si ya pasó el 18 de septiembre de este año, calcular para el próximo año
      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 8, 18)
      }
      
      const difference = targetDate - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
        
        // Calcular días de la semana restantes
        const daysUntil = Math.floor(difference / (1000 * 60 * 60 * 24))
        const weekdays = Math.floor(daysUntil / 7)
        setWeekdaysLeft(weekdays)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  // Crear elementos flotantes (banderas y copihues)
  useEffect(() => {
    const images = [banderaChile1, banderaChile2, banderaChile3, copihue1, copihue2, copihue3]
    const elements = []
    
    for (let i = 0; i < 15; i++) {
      const isCopihue = Math.random() > 0.5
      const imageIndex = isCopihue ? Math.floor(Math.random() * 3) + 3 : Math.floor(Math.random() * 3)
      
      elements.push({
        id: i,
        src: images[imageIndex],
        type: isCopihue ? 'copihue' : 'bandera',
        left: Math.random() * 95,
        animationDuration: 8 + Math.random() * 6,
        delay: Math.random() * 5
      })
    }
    
    setFloatingElements(elements)
  }, [])

  const formatTime = (value) => {
    return value.toString().padStart(2, '0')
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-600 via-white to-blue-800">
      {/* Elementos flotantes animados */}
      {floatingElements.map((element) => (
        <motion.img
          key={element.id}
          src={element.src}
          alt={element.type}
          className={`absolute w-12 h-12 object-contain pointer-events-none ${
            element.type === 'copihue' ? 'opacity-80' : 'opacity-70'
          }`}
          style={{
            left: `${element.left}vw`,
            top: '-100px'
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: element.animationDuration,
            repeat: Infinity,
            delay: element.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Header con banderas */}
      <header className="relative z-10 bg-gradient-to-r from-red-600 to-blue-800 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <img src={banderaChile2} alt="Bandera Chile" className="w-12 h-8 object-cover rounded" />
            <h1 className="text-3xl md:text-5xl font-bold">¿Cuánto falta para el 18?</h1>
            <img src={banderaChile2} alt="Bandera Chile" className="w-12 h-8 object-cover rounded" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl mt-2"
          >
            ¡Celebremos juntos nuestras Fiestas Patrias!
          </motion.p>
        </div>
      </header>

      {/* Contador principal */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-4xl w-full"
        >
          {/* Contador de tiempo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
            {[
              { label: 'Días', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="bg-gradient-to-br from-blue-800 to-red-600 text-white rounded-2xl p-4 md:p-6 shadow-lg"
              >
                <div className="text-3xl md:text-5xl font-bold mb-2">
                  {formatTime(item.value)}
                </div>
                <div className="text-sm md:text-lg font-medium opacity-90">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mensaje de días de la semana */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-xl md:text-2xl text-blue-800 font-semibold mb-6"
          >
            {weekdaysLeft > 0 ? (
              <>Faltan <span className="text-red-600 font-bold">{weekdaysLeft}</span> semanas para el 18 de septiembre.</>
            ) : (
              "¡Ya llegamos al 18 de septiembre!"
            )}
          </motion.div>

          {/* Reproductor de música */}
          <MusicPlayer />
        </motion.div>
      </main>

      {/* Footer patriótico */}
      <footer className="relative z-10 bg-gradient-to-r from-blue-800 to-red-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src={copihue3} alt="Copihue" className="w-8 h-8" />
              <span className="text-2xl font-bold">Orgullo chileno — Viva Chile</span>
              <img src={banderaChile3} alt="Bandera Chile" className="w-8 h-6" />
            </div>
            
            <div className="max-w-4xl mx-auto text-sm md:text-base leading-relaxed mb-6">
              <p className="mb-4">
                ¿Quieres saber cuánto falta para el 18? ¡Aquí tienes la mejor cuenta regresiva para las Fiestas Patrias de Chile! 
                Consulta en tiempo real cuánto falta para el 18 de septiembre y prepárate para celebrar en grande con fondas, 
                cueca, empanadas y la mejor tradición nacional.
              </p>
              <p>
                Recuerda que el 18 es la fiesta más importante de Chile: comparte esta página y mantente al tanto de cuánto 
                falta para el 18, cuánto falta para las Fiestas Patrias y cuándo es el 18 de septiembre.
              </p>
            </div>

            {/* Keywords SEO ocultos */}
            <div className="text-xs opacity-10 leading-tight">
              ¿Cuánto falta para el 18? ¿Cuánto falta para el 18 de septiembre? ¿Cuánto falta para las Fiestas Patrias? 
              ¿Cuándo es el 18 en Chile? Cuenta regresiva 18 septiembre Chile. Cuenta atrás Fiestas Patrias. 
              Celebración nacional chilena. Patrias chilenas. Cueca, fondas, ramadas. Calendario fiestas patrias Chile.
            </div>

            <div className="text-sm mt-6 border-t border-white/20 pt-4">
              © Todos los derechos reservados — 
              <a href="https://cuantofalta.cl" className="underline hover:text-yellow-300 transition-colors ml-1">
                cuantofalta.cl
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default App

