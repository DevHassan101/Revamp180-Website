
import Link from "next/link";
export default function CTAButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group/btn relative inline-flex items-center gap-4 bg-[linear-gradient(135deg,#080B78,#00004D)] pl-1.5 pr-8 md:pr-10 py-1.5 rounded-full transition-all duration-700
    shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
    hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]
    cursor-pointer overflow-hidden"
    >
      <div className="relative z-10 flex items-center gap-3">
        <div className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all duration-700 ease-out shadow-lg rotate-0 group-hover/btn:-rotate-40">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-5.5 md:h-5.5 fill-[#080B78] transition-all duration-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </div>
        <span className="text-white font-semibold tracking-wide text-sm md:text-[17px] whitespace-nowrap drop-shadow-sm">
          {label}
        </span>
      </div>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
    </Link>
  );
}