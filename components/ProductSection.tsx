
import React from 'react';
import { Product, LanguageCode } from '../types';

interface ProductSectionProps {
  products: Product[];
  language: LanguageCode;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ products, language }) => {
  return (
    <section id="solutions" className="py-16 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
            {language === 'en' ? 'Solutions' : 'ဝန်ဆောင်မှုများ'}
          </h2>
          <p className="text-2xl font-bold text-black">
            {language === 'en' ? 'Our Tools' : 'ကျွန်ုပ်တို့၏ ကိရိယာများ'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col group border-b border-gray-100 pb-12">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-50 mb-6">
                {product.video_url ? (
                  <video
                    src={product.video_url}
                    className="w-full h-full object-cover"
                    controls
                    poster={product.image_url}
                  />
                ) : (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-black">
                  {product.name}
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 px-2 py-0.5 rounded">
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-blue-600 font-medium mb-3">{product.tagline}</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, idx) => (
                  <span key={idx} className="text-[11px] text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
