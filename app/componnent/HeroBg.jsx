import HeroSection from "./Hero";

const HeroBGWrper = () => {
    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Teal Glow Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #00a6f4 100%)
      `,
                    backgroundSize: "100% 100%",
                }}
            />

            <HeroSection />

        </div>
    )
}

export default HeroBGWrper;