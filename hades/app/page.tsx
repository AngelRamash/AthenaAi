"use client";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="relative w-full overflow-hidden">
        {/* Background Image (Static, Responsive Dimensions) */}
        <div
          className="absolute top-0 left-0 w-full h-full -z-10"
          style={{
            backgroundImage: `url('/assets/Background4.png')`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover", // Ensure the background image covers the whole container
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label="Scenic background image representing the theme of Athena"
        ></div>

        {/* Header */}
        <Header />

        {/* Outer Pillars Section */}
        <Parallax speed={40}>
          <div
            className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url('/assets/Outer_columns.png')`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover", // Adjust to cover to ensure it scales properly
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "translateY(0%)", // Removed the 400% upward shift to ensure better scaling
            }}
            role="img"
            aria-label="Image of outer columns depicting ancient architecture"
          ></div>
        </Parallax>

        {/* Inner Pillars Section */}
        <Parallax speed={-30}>
          <div
            className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url('/assets/Inner_columns.png')`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover", // Adjust to cover for better scaling
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "translateY(0%)", // Removed the 120% upward shift
            }}
            role="img"
            aria-label="Image of inner columns showcasing intricate designs"
          ></div>
        </Parallax>

        {/* Effects Section */}
        <Parallax speed={-10}>
          <div
            className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url('/assets/Effects.png')`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover", // Adjust to cover for better scaling
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "translateY(0%)", // Removed the 130% upward shift
            }}
            role="img"
            aria-label="Visual effects representing ethereal ambiance"
          ></div>
        </Parallax>

        {/* Athena Character Section */}
        <Parallax speed={30}>
          <div
            className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url('/assets/Athena_character.png')`,
              backgroundBlendMode: "overlay",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "translateY(0%)", // Ensure no upward shift
            }}
            role="img"
            aria-label="Athena character illustration"
          ></div>
        </Parallax>
        <div>
          <Hero></Hero>
        </div>
      </div>
    </ParallaxProvider>
  );
}
