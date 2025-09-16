import Image from "next/image";
import CustomLink from "maidana07/components/ui/custom-link"
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-montserrat',
});

const Logo = ({ notHidden }: { notHidden?: boolean }) => (
  <div className={`items-center align-middle ${notHidden ? "flex" : "sm:flex hidden"} gap-3 h-8`}>
    <Image
      alt="maida-vision"
      src={"/logo/icon-64x64.png"}
      className="object-contain size-full"
      width={64}
      height={64}
    />

    <CustomLink href="/" className={`text-lg uppercase tracking-widest ${montserrat.className}`}>
      <span className="font-medium">Maida</span>
      <span className="text-primary font-bold">Vision</span>
    </CustomLink>
  </div>
)

export default Logo;