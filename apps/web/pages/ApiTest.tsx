import React from 'react';
import { API } from '@shared/api';

const ApiTest = () => {
  const [heroSlides, setHeroSlides] = React.useState<any>(null);
  const [properties, setProperties] = React.useState<any>(null);
  const [articles, setArticles] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const testApis = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Testing API calls...');
        console.log('API object:', API);
        console.log('API.heroSlides:', API.heroSlides);
        console.log('API.heroSlides.list:', API.heroSlides.list);
        
        // Test hero slides
        console.log('Fetching hero slides...');
        const slides = await API.heroSlides.list();
        console.log('Hero slides response:', slides);
        setHeroSlides(slides);

        // Test properties
        console.log('Fetching trending properties...');
        const props = await API.properties.trending(3);
        console.log('Properties response:', props);
        setProperties(props);

        // Test articles
        console.log('Fetching articles...');
        const arts = await API.articles.list(3);
        console.log('Articles response:', arts);
        setArticles(arts);

      } catch (err) {
        console.error('API test error:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    testApis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl">Testing APIs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">API Test Failed</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
          <p className="text-gray-600 mb-4">
            This means the frontend cannot connect to the backend API. Please check:
          </p>
          <ul className="text-left text-gray-600 space-y-2">
            <li>• Backend server is running on port 8080</li>
            <li>• Frontend environment variable VITE_API_BASE_URL is set correctly</li>
            <li>• No CORS issues between frontend and backend</li>
            <li>• Network connectivity between ports</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          🎉 API Test Successful!
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hero Slides */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hero Slides ({heroSlides?.length || 0})
            </h2>
            {heroSlides?.map((slide: any, index: number) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <img 
                  src={slide.image_url} 
                  alt={slide.title || 'Hero slide'} 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{slide.title}</h3>
                <p className="text-sm text-gray-600">{slide.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Properties */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Trending Properties ({properties?.length || 0})
            </h2>
            {properties?.map((prop: any, index: number) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <img 
                  src={prop.primary_image_url} 
                  alt={prop.title} 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-sm">{prop.title}</h3>
                <p className="text-lg font-bold text-red-600">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: prop.price_currency,
                  }).format(prop.price_amount)}
                </p>
                <p className="text-sm text-gray-600">
                  {prop.bedrooms} bed • {prop.bathrooms} bath • {prop.area_value} {prop.area_unit}
                </p>
              </div>
            ))}
          </div>

          {/* Articles */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Articles ({articles?.length || 0})
            </h2>
            {articles?.map((article: any, index: number) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <img 
                  src={article.image_url} 
                  alt={article.title} 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-sm">{article.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{article.category}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded inline-block">
            <strong>✅ All APIs are working correctly!</strong>
            <br />
            The frontend can successfully fetch data from the backend.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
