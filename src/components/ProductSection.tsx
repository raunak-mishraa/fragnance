import Image from "next/image";

export default function ProductSection() {
  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Product Image */}
        <div className="flex justify-end">
          <div className="relative h-80 w-full max-w-md flex items-end justify-end">
            <Image
              src="/assets/test/test_3.jpg"
              alt="Ombre Oud Perfume"
              width={280} // ✅ fixed width
              height={320} // ✅ fixed height
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div>
          <p className="text-gray-700 text-sm leading-relaxed mb-6 w-4/6">
            A captivating fragrance that will leave you spellbound. Immerse
            yourself in a heavenly symphony of scents carefully crafted to
            elevate your senses and leave a lasting impression. Ombre Oud bursts
            with freshness from notes of orange, bergamot, lemon, apple, and
            peach, leading to heart notes of whitewood, cedarwood, jasmine
            sambac, and anise for a tranquil, confident aura. Base notes of
            amber, iris, and vanilla create an alluring trail, making this
            fragrance your signature scent that leaves an unforgettable
            impression.
          </p>
          <button className="bg-black text-white px-6 py-3 tracking-wider hover:bg-gray-800 transition">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}
