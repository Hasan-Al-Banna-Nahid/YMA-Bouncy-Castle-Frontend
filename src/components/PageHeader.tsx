import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Bg from "../assets/images/jeremiah-lawrence.webp";

type PageHeaderProps = {
  title: string;
  crumbRight: string;
  className?: string;
  children?: React.ReactNode;
};

export default function PageHeader({
  title,
  crumbRight,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={clsx(
        "relative w-full text-white",
        "min-h-[clamp(260px,42vh,520px)]",
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={Bg}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* vignette */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="pt-14 sm:pt-20 lg:pt-32 text-center">
          {/* Title: fluid type scales with viewport */}
          <h1 className="drop-shadow-sm font-bold leading-[1.05] break-words text-[clamp(22px,6vw,56px)]">
            {title}
          </h1>

          {/* Ribbon breadcrumb */}
          <div className="mt-4 sm:mt-6 inline-flex items-center justify-center">
            <span className="relative inline-block select-none">
              <span className="relative inline-block skew-x-[-40deg] bg-brand shadow-[0_2px_0_rgba(0,0,0,0.08)]">
                <span className="inline-flex skew-x-[40deg] items-center px-3 sm:px-4 py-[6px] sm:py-[7px] text-[11px] sm:text-[12px] font-black uppercase tracking-wide">
                  <Link href="/" className="text-black/90 no-underline">
                    Home
                  </Link>
                  <span className="ml-2 text-white">{crumbRight}</span>
                </span>
              </span>
            </span>
          </div>
        </div>

        {/* Optional extra content below breadcrumb */}
        {children && <div className="mt-6 sm:mt-8">{children}</div>}
      </div>

      {/* bottom gold diagonal accent — width adapts, avoids overflow */}
      <div className="h-4 absolute w-[min(90vw,450px)] bg-[repeating-linear-gradient(120deg,var(--color-brand)_0px,var(--color-brand)_2px,transparent_2px,transparent_10px)] -bottom-2 left-1/2 -translate-x-1/2" />
    </section>
  );
}
