import { AlertCircle, AlertTriangle, CheckCheck } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-16">
          About the Native Irish Honey Bee
        </h2>
        
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
              src="https://pixabay.com/get/g2382b156152bdc4aeccc3b69fa18942512d7645f685ba56fa40bb172c79f24f6db1648c4efb1e941878f86d7c9dd12f781f5d6cf0a29d8f4040d4de0c66d3030_1280.jpg" 
              alt="Native Irish honeybee on flower" 
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
      </div>
    </section>
  );
}
