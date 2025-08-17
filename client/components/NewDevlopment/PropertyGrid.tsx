import { MapPin } from 'lucide-react';

const properties = [
  {
    id: 1,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/43e974fc28e2bb81f4298cadcb6474a51e1ec9ef?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 2,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/6eb10ab9ac9f4099c0dcd3f953b66100071d5333?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 3,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/fe53cdc63390850172274f0096d87d7a9a802b47?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 4,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/fe53cdc63390850172274f0096d87d7a9a802b47?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 5,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/43e974fc28e2bb81f4298cadcb6474a51e1ec9ef?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 6,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/6eb10ab9ac9f4099c0dcd3f953b66100071d5333?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 7,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/43e974fc28e2bb81f4298cadcb6474a51e1ec9ef?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 8,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/6eb10ab9ac9f4099c0dcd3f953b66100071d5333?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 9,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/fe53cdc63390850172274f0096d87d7a9a802b47?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 10,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/fe53cdc63390850172274f0096d87d7a9a802b47?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 11,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/43e974fc28e2bb81f4298cadcb6474a51e1ec9ef?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  },
  {
    id: 12,
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/6eb10ab9ac9f4099c0dcd3f953b66100071d5333?width=952',
    title: 'Choeng Mon',
    location: 'Street, Dubai, 00000, UAE'
  }
];

function PropertyCard({ property }: { property: typeof properties[0] }) {
  return (
    <div className="relative group cursor-pointer">
      <div 
        className="h-[827px] bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(164deg, rgba(0, 0, 0, 0.00) 62.58%, rgba(0, 0, 0, 0.67) 85.39%), url('${property.image}')`
        }}
      >
        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-[31px] font-dm-sans font-semibold mb-2">
            {property.title}
          </h3>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-white" />
            <span className="text-[19px] font-dm-sans font-medium">
              {property.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyGrid() {
  return (
    <section className="w-full bg-white py-4">
      <div className="max-w-[1600px] mx-auto px-4 md:px-[70px]">
        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
