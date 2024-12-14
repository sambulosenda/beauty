import Image from "next/image";
import { Star, MapPin } from 'lucide-react';
import { motion } from "framer-motion";
import { Provider } from "@/types/provider";
import Link from "next/link";

interface ProviderCardProps {
  provider: Provider;
  index: number;
  isNew?: boolean;
}

export function ProviderCard({ provider, index, isNew = false }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/business/${provider.slug || provider.id}`}>
        <div className="group cursor-pointer h-full bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            {isNew && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
                  New
                </span>
              </div>
            )}
            <Image
              src={provider.logo || '/placeholder.svg'}
              alt={provider.businessName || provider.name || ''}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
              {provider.businessName || provider.name}
            </h3>
            {/* Temporarily hardcoded rating until we implement reviews */}
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-900">4.8</span>
              <div className="flex items-center" aria-label="Rating: 4.8 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 5
                        ? "fill-rose-500 text-rose-500"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500">(New)</span>
            </div>
            {provider.address && (
              <div className="flex items-center space-x-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{provider.address}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 
