import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

// Import bee images
import honeycomb from "@/assets/bees/honeycomb.jpg";
import queenWithWorkers from "@/assets/bees/queen-with-workers.jpg";
import beeCloseup from "@/assets/bees/bee-closeup.jpg";

export default function Products() {
  return (
    <section className="py-16 bg-[var(--color-neutral)]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-16">
          Nucs & Queens for Sale
        </h2>
        
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg mb-8 text-center">
            Our Native Irish Honeybees are carefully bred and selected to maintain the purest 
            genetic lines while focusing on gentleness, productivity, and disease resistance. 
            All our stock is locally adapted to thrive in Ireland's climate.
          </p>
        </div>
        
        {/* Products Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Nucleus Colonies */}
          <Card className="overflow-hidden shadow-lg">
            <img 
              src={honeycomb} 
              alt="Honeycomb structure with developing brood" 
              className="w-full h-64 object-cover"
            />
            
            <CardContent className="p-6">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">Nucleus Colonies (Nucs)</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-accent mb-2">What's Included:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>5 frames of bees, brood, and stores</li>
                  <li>Young, mated queen (marked and clipped)</li>
                  <li>Disease-free certification</li>
                  <li>Starter colony ready to expand</li>
                  <li>Full guidance on installation and management</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-accent mb-2">Benefits:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Locally adapted bees suited to Irish conditions</li>
                  <li>Excellent honey production potential</li>
                  <li>Calm temperament for easy management</li>
                  <li>Disease resistance built through selective breeding</li>
                </ul>
              </div>
              
              <div className="bg-[var(--color-neutral)] p-4 rounded-lg mb-6">
                <p className="font-bold">Price: <span className="text-accent">€250 per nuc</span></p>
                <p className="text-sm">€50 deposit required at booking</p>
              </div>
              
              <Button 
                asChild
                variant="default"
                className="bg-primary hover:bg-secondary"
              >
                <Link href="/booking">Reserve for 2026</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Queens */}
          <Card className="overflow-hidden shadow-lg">
            <img 
              src={queenWithWorkers} 
              alt="Queen bee surrounded by worker bees" 
              className="w-full h-64 object-cover"
            />
            
            <CardContent className="p-6">
              <h3 className="text-2xl font-display font-bold text-primary mb-4">Mated Queens</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-accent mb-2">What's Included:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Young, mated queen (marked and clipped)</li>
                  <li>Introduction cage</li>
                  <li>Detailed introduction instructions</li>
                  <li>Email/phone support for installation</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-lg text-accent mb-2">Queen Qualities:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Bred from our best native Irish stock</li>
                  <li>Selected for productivity and gentleness</li>
                  <li>Mated in isolated areas to ensure genetic purity</li>
                  <li>Strong egg-laying capacity</li>
                  <li>Excellent colony management behaviors</li>
                </ul>
              </div>
              
              <div className="bg-[var(--color-neutral)] p-4 rounded-lg mb-6">
                <p className="font-bold">Price: <span className="text-accent">€60 per queen</span></p>
                <p className="text-sm">€20 deposit required at booking</p>
              </div>
              
              <Button 
                asChild
                variant="default"
                className="bg-primary hover:bg-secondary"
              >
                <Link href="/booking">Reserve for 2026</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Availability Section */}
        <Card className="p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-display font-bold text-primary mb-6 text-center">2026 Availability</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <h4 className="font-bold text-xl mb-2 text-accent">May 2026</h4>
              <p>Limited queens available</p>
              <p className="text-sm italic mt-2">Nucs typically not ready</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center bg-primary text-white">
              <h4 className="font-bold text-xl mb-2 text-[var(--color-accent-light)]">June 2026</h4>
              <p>Queens and nucs available</p>
              <p className="text-sm italic mt-2">Peak availability</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <h4 className="font-bold text-xl mb-2 text-accent">July 2026</h4>
              <p>Limited queens and nucs</p>
              <p className="text-sm italic mt-2">Subject to availability</p>
            </div>
          </div>
          
          <div className="bg-[var(--color-neutral)] p-4 rounded-lg">
            <h4 className="font-bold text-lg text-center mb-4 flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              Important Notes:
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>All orders are subject to weather conditions and colony development</li>
              <li>Early booking is recommended as availability is limited</li>
              <li>Collection from our apiary in Connemara (exact location provided after booking)</li>
              <li>We provide guidance on transportation and installation</li>
              <li>Final payment is due at collection</li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}
