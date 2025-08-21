import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-white font-dm-sans">
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            {title}
          </h1>
          <p className="text-xl text-brand-gray-500 mb-8">
            {description || "This page is coming soon. We're working hard to bring you amazing content."}
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-brand-red text-white font-medium hover:bg-red-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
