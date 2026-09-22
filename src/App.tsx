import { useState } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { HalloweenGallery } from "@/components/HalloweenGallery";
import { HalloweenBooking } from "@/components/HalloweenBooking";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import type { CategoryId } from "@/types/artwork";

function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar onSelectCategory={setActiveCategory} />
      <main>
        <Hero />
        <About />
        <Portfolio activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <HalloweenGallery />
        <HalloweenBooking />
        <Booking />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
