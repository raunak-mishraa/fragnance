
// app/components/PerfumeBottle.js
export default function PerfumeBottle({ variant, title, subtitle, featured = false }: { variant: string, title: string, subtitle: string, featured?: boolean }) {
    const getBottleSize = () => {
      if (featured) return 'w-32 h-48 lg:w-40 lg:h-60'
      return 'w-24 h-36 lg:w-32 lg:h-48'
    }
  
    const getCapColor = () => {
      switch (variant) {
        case 'left': return 'bg-gradient-to-b from-pink-200 to-pink-300'
        case 'center': return 'bg-gradient-to-b from-pink-100 to-pink-200'
        case 'right': return 'bg-gradient-to-b from-rose-200 to-rose-300'
        default: return 'bg-gradient-to-b from-pink-200 to-pink-300'
      }
    }
  
    const getBottleColor = () => {
      switch (variant) {
        case 'left': return 'bg-gradient-to-b from-amber-600/80 to-amber-700/80'
        case 'center': return 'bg-gradient-to-b from-amber-500/80 to-amber-600/80'
        case 'right': return 'bg-gradient-to-b from-amber-600/80 to-amber-700/80'
        default: return 'bg-gradient-to-b from-amber-600/80 to-amber-700/80'
      }
    }
  
    return (
      <div className={`perfume-bottle ${featured ? 'scale-110' : ''}`}>
        <div className="relative group cursor-pointer">
          {/* Bottle */}
          <div className="flex flex-col items-center">
            {/* Cap */}
            <div className={`${getCapColor()} w-8 h-12 lg:w-10 lg:h-16 rounded-t-lg shadow-lg relative`}>
              <div className="absolute inset-x-2 top-2 h-2 bg-white/30 rounded"></div>
            </div>
            
            {/* Neck */}
            <div className="bg-gradient-to-b from-pink-200/80 to-pink-300/80 w-6 h-6 lg:w-8 lg:h-8"></div>
            
            {/* Main Bottle */}
            <div className={`${getBottleSize()} ${getBottleColor()} rounded-lg shadow-2xl relative overflow-hidden`}>
              {/* Glass Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
              
              {/* Label */}
              <div className="absolute bottom-4 inset-x-2">
                <div className="bg-black/40 backdrop-blur-sm rounded p-2 text-center">
                  <div className="w-6 h-6 mx-auto mb-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                    <div className="text-black text-xs font-bold">H</div>
                  </div>
                  <div className="text-white text-xs font-medium tracking-wider uppercase">
                    {title}
                  </div>
                  <div className="text-white/80 text-xs">
                    {subtitle}
                  </div>
                </div>
              </div>
              
              {/* Liquid Level */}
              <div className="absolute bottom-0 inset-x-0 h-3/4 bg-gradient-to-t from-amber-700/60 to-transparent"></div>
            </div>
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    )
  }