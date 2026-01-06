"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@repo/ui/components";
import { Check, Gift, CreditCard } from "lucide-react";
import Link from "next/link";

export default function BuyVoucherPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [email, setEmail] = useState("");

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);

  const handleBuy = () => {
    // Basic validation
    if (!finalAmount || finalAmount <= 0) {
      alert("Proszę wybrać lub wpisać kwotę bonu.");
      return;
    }
    if (!email) {
      alert("Proszę podać adres e-mail.");
      return;
    }

    // Mock purchase logic
    alert(`Dziękujemy! Kupiono bon o wartości ${finalAmount} PLN. Kod zostanie wysłany na ${email}.`);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
             <span className="font-serif font-bold text-xl">BeautyFinder</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Podaruj Piękno</h1>
          <p className="text-muted-foreground">
            Kup bon podarunkowy do wykorzystania w dowolnym salonie.
          </p>
        </div>

        <Card className="w-full shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Konfiguracja Bonu
            </CardTitle>
            <CardDescription>
              Wybierz kwotę i wprowadź dane odbiorcy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Amount Selection */}
            <div className="space-y-3">
              <Label>Wybierz wartość</Label>
              <div className="grid grid-cols-3 gap-3">
                {[50, 100, 200, 300, 500].map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={selectedAmount === amount ? "border-primary" : ""}
                    onClick={() => handleAmountSelect(amount)}
                    type="button"
                  >
                    {amount} zł
                  </Button>
                ))}
                <Button
                    variant={selectedAmount === null ? "default" : "outline"}
                    className={selectedAmount === null ? "border-primary" : ""}
                    onClick={() => setSelectedAmount(null)}
                    type="button"
                >
                    Inna
                </Button>
              </div>
            </div>

            {/* Custom Amount Input */}
            {selectedAmount === null && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Label htmlFor="custom-amount">Wpisz własną kwotę (PLN)</Label>
                <div className="relative">
                    <Input
                      id="custom-amount"
                      type="text"
                      inputMode="numeric"
                      placeholder="np. 150"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="pl-8"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">zł</span>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Adres e-mail odbiorcy</Label>
              <Input
                id="email"
                type="email"
                placeholder="jan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Kod bonu wyślemy na ten adres natychmiast po wpłacie.
              </p>
            </div>

            {/* Total Summary */}
            <div className="pt-4 border-t flex justify-between items-end">
                <div>
                    <span className="text-sm text-muted-foreground">Do zapłaty:</span>
                    <div className="text-2xl font-bold text-primary">{finalAmount ? `${finalAmount} PLN` : '---'}</div>
                </div>
            </div>

          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full gap-2" onClick={handleBuy} disabled={!finalAmount || finalAmount <= 0}>
              <CreditCard className="w-4 h-4" />
              Kup Teraz
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
                Wróć do strony głównej
            </Link>
        </div>
      </div>
    </div>
  );
}
