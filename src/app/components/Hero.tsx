export default function Hero() {
    return (
      <section className="relative h-screen w-full">
        {/* Background video/image */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/perfume-bg.mp4" type="video/mp4" />
        </video>
  
        <div className="absolute inset-0 bg-black/40"></div>
  
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Luxury Perfumes
          </h1>
        </div>
      </section>
    )
  }
  