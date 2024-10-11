import { Parallax } from "react-scroll-parallax";

const ParallaxSection = ({ speed, backgroundImage, ariaLabel, backgroundSize = "cover" }) => (
    <Parallax speed={speed}>
      <section
        className="relative min-h-[50vh] md:min-h-screen w-full flex items-center justify-center bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundBlendMode: "overlay",
          backgroundSize,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label={ariaLabel}
      ></section>
    </Parallax>
  );

  export default ParallaxSection;