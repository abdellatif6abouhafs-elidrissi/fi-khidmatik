import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Wrench,
  Zap,
  Hammer,
  PaintBucket,
  Home,
  Leaf,
  Sparkles,
  Search,
  Calendar,
  CreditCard,
  CheckCircle,
  Star,
  Shield,
  Clock,
} from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  const services = [
    { icon: Wrench, name: t('services.plumber') },
    { icon: Zap, name: t('services.electrician') },
    { icon: Hammer, name: t('services.carpenter') },
    { icon: PaintBucket, name: t('services.painter') },
    { icon: Home, name: t('services.mason') },
    { icon: Leaf, name: t('services.gardener') },
    { icon: Sparkles, name: t('services.cleaner') },
  ];

  const steps = [
    {
      icon: Search,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
    },
    {
      icon: Calendar,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
    },
    {
      icon: CreditCard,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
    },
  ];

  const features = [
    {
      icon: Shield,
      title: locale === 'ar' ? 'حرفيون موثوقون' : 'Artisans vérifiés',
      description:
        locale === 'ar'
          ? 'جميع الحرفيين معتمدون وموثقون'
          : 'Tous les artisans sont certifiés et vérifiés',
    },
    {
      icon: Star,
      title: locale === 'ar' ? 'تقييمات حقيقية' : 'Avis authentiques',
      description:
        locale === 'ar'
          ? 'تقييمات من عملاء حقيقيين'
          : 'Évaluations de clients réels',
    },
    {
      icon: Clock,
      title: locale === 'ar' ? 'حجز سريع' : 'Réservation rapide',
      description:
        locale === 'ar'
          ? 'احجز في دقائق معدودة'
          : 'Réservez en quelques minutes',
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 font-semibold drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg mb-8 font-medium drop-shadow-md">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/craftsmen`}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                {t('hero.findCraftsman')}
              </Link>
              <Link
                href={`/${locale}/auth/register?type=craftsman`}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                {t('hero.becomeCraftsman')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900">
            {t('services.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition"
                >
                  <div className="p-4 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-sm font-bold text-center text-gray-800">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900">
            {t('howItWorks.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-700 font-medium">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md"
                >
                  <div className="p-4 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-black mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700 font-medium">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 drop-shadow-lg">
            {locale === 'ar'
              ? 'هل أنت حرفي محترف؟'
              : 'Vous êtes un artisan professionnel ?'}
          </h2>
          <p className="text-xl mb-8 font-semibold drop-shadow-md">
            {locale === 'ar'
              ? 'انضم إلى منصتنا واحصل على المزيد من العملاء'
              : 'Rejoignez notre plateforme et obtenez plus de clients'}
          </p>
          <Link
            href={`/${locale}/auth/register?type=craftsman`}
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            {t('hero.becomeCraftsman')}
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
