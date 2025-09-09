"use client";

import Image from "next/image";

const leftItems = [
  { name: "NATURA", img: "/assets/images/new-arrival/product-1.webp" },
  { name: "OUD AMBARI", img: "/assets/images/new-arrival/product-2.webp" },
  { name: "QASIDA BRONZE", img: "/assets/images/new-arrival/product-3.webp" },
  { name: "FAVOURITE LEGACY", img: "/assets/images/new-arrival/product-4.webp" },
];

const rightItems = [
  { name: "DARK ROSE", img: "/assets/images/dark-rose.webp" },
  { name: "SUGAR ROSE", img: "/assets/images/sugar-rose.webp" },
  { name: "X BOND GOLD GIFT SET", img: "/assets/images/xbond-giftset.webp" },
  { name: "INSPIRE", img: "/assets/images/inspire.webp" },
];

function Row({ items }: { items: { name: string; img: string }[] }) {
  return (
    <>
      {items.map((p) => (
        <div key={p.name} className="flex items-center gap-3 px-8 py-6">
          <Image src={p.img} alt={p.name} width={40} height={40} />
          <span className="text-xl tracking-[0.35em] font-light">{p.name}</span>
        </div>
      ))}
    </>
  );
}

export default function MarqueeDual() {
  return (
    <section className="w-full border-y border-gray-300">
      {/* First row: scroll left */}
      <div className="relative w-full overflow-hidden border-b border-gray-300 group">
        <div className="flex w-max whitespace-nowrap animate-marquee-left group-hover:[animation-play-state:paused]">
          <Row items={leftItems} />
          <Row items={leftItems} />
        </div>
      </div>

      {/* Second row: scroll right */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max whitespace-nowrap animate-marquee-right group-hover:[animation-play-state:paused]">
          <Row items={rightItems} />
          <Row items={rightItems} />
        </div>
      </div>
    </section>
  );
}
