import { AlertCircle, AlertTriangle, CheckCheck } from "lucide-react";

// Import bee images
import beekeeperFrame from "@/assets/bees/beekeeper-frame.jpg";
import beeInGreen from "@/assets/bees/bee-in-green.jpg";
import beeWithPollen from "@/assets/bees/bee-with-pollen.jpg";
import beeSideView from "@/assets/bees/bee-side-view.jpg";
import beeOnLavender2 from "@/assets/bees/bee-on-lavender2.jpg";
import hiveEntrance from "@/assets/bees/hive-entrance.jpg";

export default function About() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-16">
          About Connemara Queens
        </h2>

        {/* About the Beekeeper */}
        <div className="bg-[var(--color-neutral)] p-8 rounded-lg shadow-md mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="col-span-1">
              <img 
                src={beekeeperFrame} 
                alt="Sean Mellett, Beekeeper inspecting a frame of bees" 
                className="rounded-lg w-full h-auto object-cover mx-auto shadow-lg border-4 border-white"
              />
            </div>
            
            <div className="col-span-2">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">Meet the Beekeeper Behind Connemara Queens</h3>
              <p className="mb-4 text-lg leading-relaxed">
                Hi, I'm Sean Mellett — a lifelong nature enthusiast, passionate beekeeper, and proud Connemara native. 
                My deep love for the natural world and the landscape I call home inspired me to create Connemara Queens — 
                a project rooted in conservation and guided by the influence of dedicated local beekeepers like Dave Geoghegan, 
                Paddy Finnerty, and Ger Coyne. Like them, I am committed to the careful breeding of the Native Irish Honey Bee 
                (Apis mellifera mellifera), preserving its genetics, resilience, and gentle temperament for generations to come.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                As Chairman of the Connemara Beekeepers Association and a Diploma student in Apiculture, I've seen first-hand 
                the importance of supporting our native bee not just for honey production, but for biodiversity and ecological balance. 
                The queens and nucleus colonies I offer are bred from locally adapted, pure Apis mellifera mellifera stock — 
                selected for their calm temperament, hardiness, and ability to thrive in the rugged climate of the west of Ireland. 
                Connemara Queens is part of a broader effort to promote sustainable beekeeping, protect native genetics, and ensure 
                our bees remain a vital part of the landscape for years to come.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're a seasoned beekeeper or just starting out, I'd love to hear from you. Feel free to get in touch 
                or place a deposit to reserve your Native Irish Queens or nucs for the 2026 season — and join me in supporting 
                the future of our native bee.
              </p>
            </div>
          </div>
        </div>
        
        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-display font-bold text-primary mb-4">Apis mellifera mellifera</h3>
            <p className="mb-4 text-lg">
              The Native Irish Honey Bee, known scientifically as <em>Apis mellifera mellifera</em>, 
              has been present in Ireland for thousands of years. Adapted to our climate, these bees 
              are particularly suited to Ireland's cool, damp conditions.
            </p>
            <p className="mb-4 text-lg">
              Dark in color with distinctive features, they're hardy survivors known for their excellent 
              foraging abilities even in challenging weather conditions.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={beeInGreen} 
              alt="Native Irish honeybee on rosemary" 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        {/* Conservation Section */}
        <div className="bg-[var(--color-neutral)] p-8 rounded-lg shadow-md mb-16">
          <h3 className="text-2xl font-display font-bold text-primary mb-6">Why Conservation Matters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Threats to Survival
              </h4>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Hybridization with imported bee subspecies</li>
                <li>Loss of habitat and forage resources</li>
                <li>Pesticide exposure and agricultural practices</li>
                <li>Parasites and diseases, including the Varroa mite</li>
                <li>Climate change affecting forage availability</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
                <CheckCheck className="h-5 w-5" />
                Benefits of Conservation
              </h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Preserving genetic diversity essential for bee health</li>
                <li>Maintaining bees adapted to local climate and flora</li>
                <li>Supporting Ireland's biodiversity and ecosystem services</li>
                <li>Promoting sustainable and resilient beekeeping practices</li>
                <li>Protecting cultural heritage in traditional beekeeping</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Help Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-display font-bold text-primary mb-6">What You Can Do to Help</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <div className="help-action-card">
              <h4 className="font-bold text-lg mb-2">Plant Bee-Friendly Gardens</h4>
              <p>Include native flowering plants that provide nectar and pollen throughout the season.</p>
            </div>
            
            <div className="help-action-card">
              <h4 className="font-bold text-lg mb-2">Avoid Pesticides</h4>
              <p>Use natural alternatives to chemical pesticides and herbicides in your garden.</p>
            </div>
            
            <div className="help-action-card">
              <h4 className="font-bold text-lg mb-2">Support Local Beekeepers</h4>
              <p>Buy honey and bee products from local beekeepers who raise native bees.</p>
            </div>
            
            <div className="help-action-card">
              <h4 className="font-bold text-lg mb-2">Create Habitat</h4>
              <p>Leave areas of your garden wild to provide nesting sites for wild bees.</p>
            </div>
            
            <div className="help-action-card">
              <h4 className="font-bold text-lg mb-2">Spread Awareness</h4>
              <p>Educate others about the importance of native bees to our ecosystem.</p>
            </div>
            
            <div className="help-action-card">
              <h4 className="font-bold text-lg mb-2">Choose Native Bees</h4>
              <p>If you're a beekeeper, consider keeping native Irish honeybees rather than imported subspecies.</p>
            </div>
          </div>
        </div>
        
        {/* Gallery Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-display font-bold text-primary mb-6 text-center">Gallery: Native Irish Honeybees</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg shadow-md">
              <img 
                src={beeSideView} 
                alt="Profile view of a native Irish honeybee" 
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md">
              <img 
                src={beeWithPollen} 
                alt="Honeybee with pollen basket" 
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md">
              <img 
                src={beeOnLavender2} 
                alt="Honeybee foraging on lavender" 
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md">
              <img 
                src={hiveEntrance}
                alt="Honeybees at hive entrance" 
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
