import Image from "next/image";

const Logo = () => {
  return (
    <Image
      //      loading='lazy'
      src='/img/logo/logo.png'
      alt='E Learning Platform Logo'
      width={120}
      height={50}
      quality={100}
      priority='true'
    />
  );
};

export default Logo;
