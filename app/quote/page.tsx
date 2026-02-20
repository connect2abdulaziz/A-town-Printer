import { Metadata } from 'next';
import QuoteForm from '@/components/forms/QuoteForm';
import { Clock, Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get a Quote | A-Town Printers',
  description: 'Request a custom quote for your printing needs. Fast turnaround, reliable service, and professional print quality.',
};

export default function QuotePage() {
  const benefits = [
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'We typically respond within 24 hours',
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your information is safe with us',
    },
    {
      icon: CheckCircle,
      title: 'No Obligation',
      description: 'Free quotes with no commitment required',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-36 overflow-hidden bg-primary text-primary-foreground">
  
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-accent">
            Get Your Quote
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll provide a detailed quote with pricing and turnaround times.
          </p>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-background">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits Cards Section - Top */}
          <div className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Benefits Cards */}
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="bg-primary rounded-2xl shadow-xl border-2 border-primary/20 p-6 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 text-primary-foreground"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center border-2 border-primary-foreground/30">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary-foreground mb-1">{benefit.title}</h3>
                        <p className="text-sm text-primary-foreground/80">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Section - Bottom */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-border/50 p-6 lg:p-8 bg-gradient-to-b from-white to-muted/20">
              <div className="mb-6 pb-6 border-b border-border/50">
                <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-2 text-center">Request a Quote</h2>
                <p className="text-muted-foreground text-sm text-center">
                  Fill out the form below and we&apos;ll get back to you with a detailed quote.
                </p>
              </div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
