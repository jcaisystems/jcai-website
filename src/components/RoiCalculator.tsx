// jcaisystems/jcai-website/src/components/RoiCalculator.tsx
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const RoiCalculator = () => {
  const [employees, setEmployees] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(10);
  const [calculationPeriod, setCalculationPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [results, setResults] = useState<{ time: number; money: number } | null>(null);

  const calculateSavings = () => {
    const weeklyMoneySaved = employees * hourlyRate * hoursSavedPerWeek;
    const weeklyTimeSaved = employees * hoursSavedPerWeek;

    if (calculationPeriod === 'monthly') {
      setResults({
        time: weeklyTimeSaved * 4.33,
        money: weeklyMoneySaved * 4.33,
      });
    } else {
      setResults({
        time: weeklyTimeSaved * 52,
        money: weeklyMoneySaved * 52,
      });
    }
  };

  // This useEffect hook now only runs AFTER the results have been calculated at least once.
  useEffect(() => {
    if (results) {
      calculateSavings();
    }
  }, [calculationPeriod]); // It only needs to watch the toggle now.

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calculate Your <span className="gradient-text">Potential ROI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop guessing. See the real numbers.
          </p>
        </div>
        <Card className="p-8 max-w-2xl mx-auto bg-card border-border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
                  className="bg-secondary border-border focus:border-cyan-500"
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Average Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                  className="bg-secondary border-border focus:border-cyan-500"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="hoursSavedPerWeek">Hours Saved Per Employee Per Week</Label>
              <Input
                id="hoursSavedPerWeek"
                type="number"
                value={hoursSavedPerWeek}
                onChange={(e) => setHoursSavedPerWeek(parseInt(e.target.value) || 0)}
                className="bg-secondary border-border focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Label>Calculation Period</Label>
              <ToggleGroup 
                type="single" 
                defaultValue="yearly" 
                onValueChange={(value: 'monthly' | 'yearly') => value && setCalculationPeriod(value)}
                className="bg-secondary/50 rounded-lg p-1"
              >
                <ToggleGroupItem 
                  value="monthly" 
                  aria-label="Monthly"
                  className="px-4 py-2 rounded-md data-[state=on]:bg-cyan-500 data-[state=on]:text-slate-900 font-semibold"
                >
                  Monthly
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="yearly" 
                  aria-label="Yearly"
                  className="px-4 py-2 rounded-md data-[state=on]:bg-cyan-500 data-[state=on]:text-slate-900 font-semibold"
                >
                  Yearly
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {!results && (
                <Button onClick={calculateSavings} className="w-full hover:bg-[#6a8f28]" variant="hero">
  Calculate Savings
</Button>

            )}
            
            {results && (
              <div className="text-center pt-6 space-y-4 border-t border-border animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">Time Saved</p>
                    <p className="text-4xl font-bold text-cyan-400">
                      {Math.round(results.time).toLocaleString()} hrs
                    </p>
                    {/* CORRECTED TEXT HERE */}
                    <p className="text-muted-foreground">per {calculationPeriod === 'monthly' ? 'month' : 'year'}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">Money Saved</p>
                    <p className="text-4xl font-bold text-cyan-400">
                      ${Math.round(results.money).toLocaleString()}
                    </p>
                     {/* AND CORRECTED TEXT HERE */}
                     <p className="text-muted-foreground">per {calculationPeriod === 'yearly' ? 'year' : 'month'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};