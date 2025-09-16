import { Gift, ShieldCheck, Headset, Truck } from "lucide-react";

const services = [
  {
    icon: <Truck className="w-8 h-8 text-gray-800" />,
    text: "FREE DELIVERY ABOVE 100 AED",
  },
  {
    icon: <Gift className="w-8 h-8 text-gray-800" />,
    text: "SATISFIED OR REFUNDED",
  },
  {
    icon: <Headset className="w-8 h-8 text-gray-800" />,
    text: "TOP-NOTCH SUPPORT",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-gray-800" />,
    text: "SECURE PAYMENTS",
  },
];

export default function ServiceHighlights({ color = "bg-white" }: { color?: string }) {
  return (
    <section className={`border-t border-gray-200 py-14 ${color} border-t border-gray-300`}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            {service.icon}
            <p className="text-sm font-medium tracking-wider text-gray-700">
              {service.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
