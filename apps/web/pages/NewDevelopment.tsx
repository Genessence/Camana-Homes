import { Header } from '../components/layout';
import Hero from '../components/NewDevlopment/Hero';
import Stats from '../components/NewDevlopment/Stats';
import PropertyGrid from '../components/NewDevlopment/PropertyGrid';
import Testimonials from '../components/NewDevlopment/Testimonials';
import LeadCapture from '../components/NewDevlopment/LeadCapture';
import StayInTheKnow from '../components/StayInTheKnow';


export default function NewDevelopment() {
  return (
    <div className="min-h-screen bg-white font-dm-sans">
      <main>
        <Hero />
        <Stats />
        <PropertyGrid />
        <Testimonials />
        <LeadCapture />
        <div className="m-[70px]"><StayInTheKnow /></div>
      </main>
      
    </div>
  );
}
