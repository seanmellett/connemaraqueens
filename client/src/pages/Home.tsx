import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, Sprout, GraduationCap } from "lucide-react";

// Import bee images
import beesFlying from "@/assets/bees/flying-bees.jpg";
import beeOnLavender from "@/assets/bees/bee-on-lavender.jpg";
import beeOnDandelion from "@/assets/bees/bee-on-dandelion.jpg";
import queenWithWorkers from "@/assets/bees/queen-with-workers.jpg";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${beesFlying})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">Native Irish Honeybees</h2>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
            Preserving and protecting the legacy of Ireland's native honey bee - <em>Apis mellifera mellifera</em>
          </p>
          <Button 
            asChild
            className="bg-accent hover:bg-[var(--color-accent-light)] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Link href="/booking">Book Now for 2026</Link>
          </Button>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Our Mission</h3>
          <p className="text-lg leading-relaxed mb-8">
            At Connemara Queens, we're dedicated to conserving and promoting the Native Irish Honey Bee. 
            Through careful breeding and sustainable practices, we're helping to preserve this vital species 
            for future generations while providing beekeepers with healthy, locally-adapted colonies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="feature-card">
              <div className="text-accent text-3xl mb-4">
                <Sprout className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">Conservation</h4>
              <p>Preserving the genetic purity of Ireland's native honeybee through selective breeding programs.</p>
            </div>
            
            <div className="feature-card">
              <div className="text-accent text-3xl mb-4">
                <Leaf className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">Sustainability</h4>
              <p>Practicing sustainable beekeeping methods that respect both the bees and the environment.</p>
            </div>
            
            <div className="feature-card">
              <div className="text-accent text-3xl mb-4">
                <GraduationCap className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">Education</h4>
              <p>Sharing knowledge about native bees and their importance to Ireland's ecology.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Photo Gallery Section */}
      <section className="bg-[var(--color-neutral)] py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-8">Native Irish Honeybees</h3>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            These beautiful pollinators are essential to Ireland's ecosystem and agriculture. Explore the beauty
            and importance of our native honeybees through these images.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={beeOnLavender} 
                alt="Honeybee foraging on lavender" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={beeOnDandelion} 
                alt="Honeybee on dandelion" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={queenWithWorkers} 
                alt="Queen bee with worker bees" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button 
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link href="/about">Learn More About Native Irish Honeybees</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
