import Image from "next/image";
import Header from "../components/Header";
import HeroSec from "../components/HeroSec";
import SelectedWorkSec from "../components/SelectedWorkSec";
import AboutSec from "../components/AboutSec";
import SkillsSec from "../components/SkillsSec";
import ContactSec from "../components/ContactSec";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col px-6 md:px-12 lg:px-20">
        <Header />
        <HeroSec />
        <SelectedWorkSec />
        <AboutSec />
        <SkillsSec />
        <ContactSec />
        <Footer />
      </div>
    </>
  );
}
