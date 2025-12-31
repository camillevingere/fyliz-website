import Footer8 from "@/components/footers/Footer8";
import Header8 from "@/components/headers/Header8";
import Brands from "@/components/homes/home-9/Brands";
import ClientSuccess from "@/components/homes/home-9/ClientSuccess";
import Faqs from "@/components/homes/home-9/Faqs";
import Hero from "@/components/homes/home-9/Hero";
import Process from "@/components/homes/home-9/Process";
import Solutions from "@/components/homes/home-9/Solutions";
import Testimonials from "@/components/homes/home-9/Testimonials";
export const metadata = {
  title: "Fyliz - Agence d'automatisation IA en France",
  description:
    "Fyliz automatise vos tâches répétitives avec l'IA et booste votre croissance de +30% en 90 jours.",
};
export default function page() {
  return (
    <div className="bp-xs bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel bg-white text-gray-900 overflow-x-hidden disable-cursor">
      <Header8 />
      <div id="wrapper" className="wrap">
        <Hero />
        <Process />
        <Brands />
        <ClientSuccess />
        <Solutions />
        <Testimonials />
        <Faqs />
      </div>
      <Footer8 />
    </div>
  );
}
