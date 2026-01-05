import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Produkt: ["Funkcje", "Cennik", "Integracje", "Aktualizacje"],
  Firma: ["O nas", "Blog", "Kariera", "Prasa"],
  Zasoby: ["Centrum pomocy", "Samouczki", "Dokumentacja API", "Społeczność"],
  Prawne: ["Prywatność", "Warunki", "Bezpieczeństwo", "Ciasteczka"],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-cta flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Beaution
              </span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Nowoczesna platforma do zarządzania salonem, która pomaga
              profesjonalistom beauty prosperować.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@Beaution.io</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-Beaution</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Beaution. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Polityka prywatności
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Warunki korzystania z usługi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
