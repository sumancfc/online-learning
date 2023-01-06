import Image from "next/image";

const Avatar = ({ src, width, height, quality, alt, className = "" }) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      quality={quality}
      alt={alt}
      className={className}
    />
  );
};

export default Avatar;
