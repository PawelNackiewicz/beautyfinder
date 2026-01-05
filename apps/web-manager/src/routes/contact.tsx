import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // W rzeczywistej aplikacji tutaj byłoby wysłanie formularza
    toast.success("Wiadomość wysłana!", {
      description: "Skontaktujemy się z Tobą w ciągu 24 godzin.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Beaution Manager
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/functions"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Funkcje
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Cennik
            </Link>
            <Link to="/contact" className="text-sm font-medium text-primary">
              Kontakt
            </Link>
            <Link to="/login">
              <Button variant="default">Zaloguj się</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Skontaktuj się
          <br />
          <span className="text-primary">z nami</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Masz pytania? Chcesz umówić prezentację? Napisz do nas, a odpowiemy w
          ciągu 24 godzin.
        </p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Wyślij wiadomość</CardTitle>
              <CardDescription>
                Wypełnij formularz, a nasz zespół skontaktuje się z Tobą
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Imię i nazwisko *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jan Kowalski"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jan@przyklad.pl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+48 123 456 789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Temat *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="W czym możemy pomóc?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Wiadomość *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Opisz swoją sprawę..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Wyślij wiadomość
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informacje kontaktowe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">kontakt@beaution.pl</p>
                    <p className="text-sm text-muted-foreground">
                      Odpowiadamy w ciągu 24h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground">+48 123 456 789</p>
                    <p className="text-sm text-muted-foreground">
                      Pon-Pt: 9:00 - 17:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-muted-foreground">
                      ul. Przykładowa 123
                      <br />
                      00-001 Warszawa
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Umów prezentację</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Chcesz zobaczyć system w akcji? Umów bezpłatną, 30-minutową
                  prezentację online z naszym ekspertem.
                </p>
                <Button className="w-full" variant="outline">
                  Umów prezentację
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wsparcie techniczne</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Już korzystasz z Beaution Manager i potrzebujesz pomocy?
                </p>
                <Link to="/login">
                  <Button className="w-full" variant="outline">
                    Zaloguj się do wsparcia
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Szybkie odpowiedzi
          </h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Jak szybko otrzymam odpowiedź?
                </h3>
                <p className="text-muted-foreground">
                  Staramy się odpowiadać na wszystkie zapytania w ciągu 24
                  godzin w dni robocze.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Czy mogę umówić się na demo?
                </h3>
                <p className="text-muted-foreground">
                  Tak! Oferujemy bezpłatne 30-minutowe prezentacje online.
                  Skontaktuj się z nami, aby umówić termin.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Gdzie mogę znaleźć dokumentację?
                </h3>
                <p className="text-muted-foreground">
                  Po zalogowaniu masz dostęp do pełnej dokumentacji i bazy
                  wiedzy w panelu wsparcia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          © 2025 Beaution Manager. Wszystkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
}
