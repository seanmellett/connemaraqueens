import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Layers,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Connemara Queens</h3>
            <p className="mb-4">Preserving Ireland's native honeybee heritage through sustainable beekeeping practices and selective breeding.</p>
            <p className="text-sm opacity-75">© {new Date().getFullYear()} Connemara Queens. All rights reserved.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors duration-200">About the Native Irish Honey Bee</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors duration-200">Nucs & Queens</Link></li>
              <li><Link href="/booking" className="hover:text-accent transition-colors duration-200">Book Now</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="mb-4">Subscribe to our newsletter for updates on availability and beekeeping tips.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-r-none text-gray-800 w-full"
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-[var(--color-accent-light)] rounded-l-none transition-colors duration-300"
              >
                <Layers className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-accent hover:text-white transition-colors duration-300">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-accent hover:text-white transition-colors duration-300">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-accent hover:text-white transition-colors duration-300">
                <TwitterIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
