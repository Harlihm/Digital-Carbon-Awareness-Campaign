import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Separator } from './components/ui/separator';
import { Badge } from './components/ui/badge';
import { Leaf, Heart, Users, Calculator, Car, Lightbulb, Zap } from 'lucide-react';
import { useEffect } from 'react';



export default function App() {
  const [generatorUses, setGeneratorUses] = useState('');
  const [motorcycleUses, setMotorcycleUses] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [generatorDuration, setGeneratorDuration] = useState('');
  const [motorcycleDuration, setMotorcycleDuration] = useState('');
  const [emissions, setEmissions] = useState<number | null>(null);

  const images = [
  '/images/emission1.png',
  '/images/emission2.png',
  // '/images/emission3.jpg',
  // '/images/emission4.jpg',
];

const [currentImageIndex, setCurrentImageIndex] = useState(0);

// Change image every 1 second
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 2000);
  return () => clearInterval(interval);
}, []);

 const calculateEmissions = () => {
  // Emission factors (kg CO₂ per hour of use)
  const emissionFactors: Record<string, number> = {
    petrol: 2.3,    // Petrol generator/motorcycle
    diesel: 2.7,    // Diesel generator
    kerosene: 2.5   // Kerosene stoves/lights
  };

  // Convert inputs to numbers, safely fallback to 0
  const generatorUsesNum = parseFloat(generatorUses) || 0;
  const generatorDurationNum = parseFloat(generatorDuration) || 0;
  const motorcycleUsesNum = parseFloat(motorcycleUses) || 0;
  const motorcycleDurationNum = parseFloat(motorcycleDuration) || 0;

  // Weekly total hours of usage
  const generatorWeekly = generatorUsesNum * generatorDurationNum;
  const motorcycleWeekly = motorcycleUsesNum * motorcycleDurationNum;
  const totalHours = generatorWeekly + motorcycleWeekly;

  // Select emission factor based on fuel type or default to petrol (2.3)
  const factor = fuelType in emissionFactors ? emissionFactors[fuelType] : 2.3;

  // Final weekly emission in kg CO₂
  const weeklyEmissions = totalHours * factor;

  // Update the state
  setEmissions(weeklyEmissions);
};


const getRiskLevel = (value: number) => {
  if (value <= 20) return { label: 'Safe ✅', color: 'text-green-600' };
  if (value <= 30) return { label: 'Medium ⚠️', color: 'text-yellow-500' };
  if (value <= 50) return { label: 'Risky 🔶', color: 'text-orange-500' };
  return { label: 'Danger 🔥', color: 'text-red-600' };
};




  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-semibold text-gray-800">Carbon Footprint Aware</span>
            </div>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('intro')} className="text-gray-600 hover:text-green-600 transition-colors">
                Introduction
              </button>
              <button onClick={() => scrollToSection('impact')} className="text-gray-600 hover:text-green-600 transition-colors">
                Health Impact
              </button>
              <button onClick={() => scrollToSection('tips')} className="text-gray-600 hover:text-green-600 transition-colors">
                Tips
              </button>
              <button onClick={() => scrollToSection('calculator')} className="text-gray-600 hover:text-green-600 transition-colors">
                Calculator
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              Digital Awareness Campaign
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Reduce Your Campus 
              <span className="text-green-600"> Carbon Footprint</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Learn about carbon emissions from fuel-powered machines on campus and discover how you can make a positive impact on our shared environment.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => scrollToSection('intro')} size="lg" className="bg-green-600 hover:bg-green-700">
              Learn More
            </Button>
            <Button onClick={() => scrollToSection('calculator')} variant="outline" size="lg">
              Calculate Your Emissions
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Understanding Carbon Emissions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carbon emissions are gases released into the atmosphere when fossil fuels are burned. Here's what you need to know.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-orange-500 mb-2" />
                <CardTitle>What Are They?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Carbon emissions are greenhouse gases, primarily CO₂, released when burning fossil fuels like petrol, diesel, and kerosene in generators and vehicles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Car className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Common Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  On campus, main sources include generators for backup power, motorcycles for transportation, and other fuel-powered equipment used daily.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-red-500 mb-2" />
                <CardTitle>Why It Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  These emissions contribute to climate change, air pollution, and can cause respiratory problems, especially in enclosed campus environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Health & Ethical Impact Section */}
      <section id="impact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Health & Ethical Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your carbon emissions extend beyond personal impact - they affect the entire campus community and environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle>Community Health Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>Respiratory Issues:</strong> Fumes can trigger asthma and breathing problems in sensitive individuals
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>Air Quality:</strong> Reduces overall air quality in dormitories, libraries, and study areas
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>Vulnerable Groups:</strong> Particularly affects students with pre-existing health conditions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Leaf className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Ethical Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>Shared Environment:</strong> The campus is a shared space that we all have a duty to protect
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>Future Generations:</strong> Reducing emissions helps preserve the environment for future students
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <strong>Leadership Role:</strong> As educated individuals, we should model sustainable behavior
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* ---------------------------------- */}
          {/* Auto-rotating / click-change image */}
<div className="w-full max-w-3xl mx-auto my-10 cursor-pointer" onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}>
  <img
    src={images[currentImageIndex]}
    alt="Carbon Emission Awareness"
    className="w-full h-104 object-cover rounded-lg shadow-md transition-all duration-500"
  />
</div>
        </div>
      </section>

      {/* Tips Section */}
      <section id="tips" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tips for Students
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, practical ways you can reduce your carbon footprint on campus today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-yellow-500 mb-2" />
                <CardTitle>Energy Conservation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Turn off generators when not needed</li>
                  <li>• Use energy-efficient appliances</li>
                  <li>• Unplug devices when not in use</li>
                  <li>• Optimize generator usage schedules</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <Car className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Transportation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use public transportation</li>
                  <li>• Share rides with classmates</li>
                  <li>• Walk or cycle for short distances</li>
                  <li>• Maintain vehicles properly</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <Users className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>Community Action</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Organize carpooling groups</li>
                  <li>• Advocate for cleaner alternatives</li>
                  <li>• Share awareness with friends</li>
                  <li>• Support renewable energy initiatives</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <Zap className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle>Smart Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use generators during off-peak hours</li>
                  <li>• Combine errands into single trips</li>
                  <li>• Choose cleaner fuel options</li>
                  <li>• Regular maintenance for efficiency</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <Leaf className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>Alternative Options</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Explore solar power options</li>
                  <li>• Use power banks for small devices</li>
                  <li>• Choose electric alternatives when available</li>
                  <li>• Support campus green initiatives</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <CardTitle>Lifestyle Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Plan activities to reduce trips</li>
                  <li>• Use digital resources over printed</li>
                  <li>• Choose products with less packaging</li>
                  <li>• Educate others about environmental impact</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Calculator className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Carbon Emission Calculator
            </h2>
            <p className="text-lg text-gray-600">
              Calculate your weekly carbon footprint from generator and motorcycle usage.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Carbon Footprint Assessment</CardTitle>
              <CardDescription>
                Enter your weekly usage patterns to see your estimated CO₂ emissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Generator Usage</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="generator-uses">Times used per week</Label>
                      <Input
                        id="generator-uses"
                        type="number"
                        placeholder="e.g., 5"
                        value={generatorUses}
                        onChange={(e) => setGeneratorUses(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="generator-duration">Hours per session</Label>
                      <Input
                        id="generator-duration"
                        type="number"
                        step="0.5"
                        placeholder="e.g., 2.5"
                        value={generatorDuration}
                        onChange={(e) => setGeneratorDuration(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Motorcycle Usage</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="motorcycle-uses">Times used per week</Label>
                      <Input
                        id="motorcycle-uses"
                        type="number"
                        placeholder="e.g., 10"
                        value={motorcycleUses}
                        onChange={(e) => setMotorcycleUses(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="motorcycle-duration">Hours per session</Label>
                      <Input
                        id="motorcycle-duration"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 0.5"
                        value={motorcycleDuration}
                        onChange={(e) => setMotorcycleDuration(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="fuel-type">Primary fuel type</Label>
                <Select value={fuelType} onValueChange={setFuelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="kerosene">Kerosene</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateEmissions} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Calculate My Emissions
              </Button>

              {emissions !== null && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Weekly Emissions</h3>
                    <div className="text-4xl font-bold text-green-600 mb-4">
                      {emissions.toFixed(2)} kg CO₂
                      
                    </div>
                          <div className={`text-lg font-semibold ${getRiskLevel(emissions).color} mb-4`}>
        Status: {getRiskLevel(emissions).label}
      </div>

                    {/* <div className="text-gray-600 space-y-2">
                      <p>That's equivalent to approximately:</p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-white/50 p-3 rounded">
                          <div className="font-semibold">{(emissions * 52).toFixed(0)} kg CO₂</div>
                          <div className="text-sm">per year</div>
                        </div>
                        <div className="bg-white/50 p-3 rounded">
                          <div className="font-semibold">{(emissions / 2.3 * 4.6).toFixed(1)} km</div>
                          <div className="text-sm">car driving equivalent</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="text-xl font-semibold">Carbon Footprint Aware</span>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Together, we can create a more sustainable campus environment. Every small action contributes to a larger positive impact on our shared community and planet.
          </p>
          <Separator className="my-6 bg-gray-600" />
          <p className="text-gray-400">
            Share this website with your fellow students to spread awareness about carbon emissions and environmental responsibility.
          </p>
        </div>
      </footer>
    </div>
  );
}