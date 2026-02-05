import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 visual */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-accent/20 mb-4">404</div>
          <div className="w-32 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          The page may have been moved or doesn't exist.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent-hover transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>

          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-8 py-4 bg-card text-card-foreground border-2 border-border rounded-lg font-semibold hover:bg-muted transition-all duration-200"
          >
            <Search className="mr-2 h-5 w-5" />
            Browse Services
          </Link>
        </div>

        {/* Helpful links */}
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Or try one of these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/clothing"
              className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Clothing Printing
            </Link>
            <Link
              href="/large-format"
              className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Large Format
            </Link>
            <Link
              href="/print-marketing"
              className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Print Marketing
            </Link>
            <Link
              href="/upload"
              className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Upload Artwork
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}