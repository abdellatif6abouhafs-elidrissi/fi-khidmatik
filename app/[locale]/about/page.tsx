import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { Target, Users, Heart, Shield, TrendingUp, Award } from 'lucide-react';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const values = [
    {
      icon: Shield,
      title: locale === 'ar' ? 'الثقة والأمان' : 'Confiance et Sécurité',
      description:
        locale === 'ar'
          ? 'نضمن لك حرفيين موثوقين ومعتمدين مع تقييمات حقيقية من عملاء سابقين'
          : 'Nous garantissons des artisans vérifiés et certifiés avec des avis authentiques',
    },
    {
      icon: Heart,
      title: locale === 'ar' ? 'خدمة عملاء ممتازة' : 'Service Client Excellent',
      description:
        locale === 'ar'
          ? 'فريقنا متاح دائماً لمساعدتك وضمان رضاك التام'
          : 'Notre équipe est toujours disponible pour vous aider et garantir votre satisfaction',
    },
    {
      icon: TrendingUp,
      title: locale === 'ar' ? 'جودة عالية' : 'Qualité Supérieure',
      description:
        locale === 'ar'
          ? 'نختار أفضل الحرفيين المحترفين لضمان جودة الخدمة'
          : 'Nous sélectionnons les meilleurs artisans professionnels pour garantir la qualité',
    },
    {
      icon: Award,
      title: locale === 'ar' ? 'خبرة واحترافية' : 'Expertise et Professionnalisme',
      description:
        locale === 'ar'
          ? 'جميع حرفيينا لديهم سنوات من الخبرة في مجالاتهم'
          : 'Tous nos artisans ont des années d\'expérience dans leurs domaines',
    },
  ];

  const stats = [
    {
      number: '5000+',
      label: locale === 'ar' ? 'حرفي محترف' : 'Artisans professionnels',
    },
    {
      number: '15000+',
      label: locale === 'ar' ? 'عميل راضٍ' : 'Clients satisfaits',
    },
    {
      number: '30+',
      label: locale === 'ar' ? 'مدينة مغطاة' : 'Villes couvertes',
    },
    {
      number: '4.9/5',
      label: locale === 'ar' ? 'تقييم متوسط' : 'Note moyenne',
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-lg">
              {locale === 'ar' ? 'من نحن' : 'À propos de nous'}
            </h1>
            <p className="text-xl font-semibold drop-shadow-md">
              {locale === 'ar'
                ? 'منصة رائدة تربط الحرفيين المحترفين بالعملاء في المغرب'
                : 'Plateforme leader connectant artisans professionnels et clients au Maroc'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                {locale === 'ar' ? 'مهمتنا' : 'Notre Mission'}
              </h2>
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                {locale === 'ar'
                  ? 'نسعى لتسهيل الوصول إلى خدمات الحرفيين المحترفين في المغرب من خلال منصة رقمية آمنة وموثوقة. هدفنا هو خلق جسر بين العملاء الباحثين عن خدمات عالية الجودة والحرفيين الذين يبحثون عن فرص عمل جديدة.'
                  : 'Nous visons à faciliter l\'accès aux services d\'artisans professionnels au Maroc grâce à une plateforme numérique sécurisée et fiable. Notre objectif est de créer un pont entre les clients recherchant des services de qualité et les artisans à la recherche de nouvelles opportunités.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card variant="elevated">
                <div className="text-center p-6">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {locale === 'ar' ? 'للعملاء' : 'Pour les Clients'}
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {locale === 'ar'
                      ? 'نوفر لك إمكانية الوصول السريع إلى حرفيين موثوقين ومعتمدين مع ضمان الجودة والشفافية في الأسعار'
                      : 'Nous vous offrons un accès rapide à des artisans fiables et certifiés avec garantie de qualité et transparence des prix'}
                  </p>
                </div>
              </Card>

              <Card variant="elevated">
                <div className="text-center p-6">
                  <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {locale === 'ar' ? 'للحرفيين' : 'Pour les Artisans'}
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {locale === 'ar'
                      ? 'نساعدك على توسيع نشاطك والوصول إلى عملاء جدد مع إدارة سهلة لحجوزاتك وأرباحك'
                      : 'Nous vous aidons à développer votre activité et atteindre de nouveaux clients avec une gestion facile de vos réservations et revenus'}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              {locale === 'ar' ? 'قيمنا' : 'Nos Valeurs'}
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              {locale === 'ar'
                ? 'المبادئ التي نؤمن بها ونعمل من أجلها'
                : 'Les principes auxquels nous croyons et pour lesquels nous travaillons'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} variant="elevated" hover>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 font-medium text-sm">
                      {value.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 drop-shadow-lg">
              {locale === 'ar' ? 'إنجازاتنا بالأرقام' : 'Nos Réalisations en Chiffres'}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-2 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
              {locale === 'ar' ? 'قصتنا' : 'Notre Histoire'}
            </h2>
            <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
              <p>
                {locale === 'ar'
                  ? 'بدأت Fi-Khidmatik في عام 2024 برؤية واضحة: جعل خدمات الحرفيين المحترفين في متناول الجميع في المغرب. لاحظنا الصعوبات التي يواجهها العملاء في العثور على حرفيين موثوقين، والتحديات التي يواجهها الحرفيون في الوصول إلى عملاء جدد.'
                  : 'Fi-Khidmatik a débuté en 2024 avec une vision claire : rendre les services d\'artisans professionnels accessibles à tous au Maroc. Nous avons remarqué les difficultés des clients à trouver des artisans fiables, et les défis des artisans à atteindre de nouveaux clients.'}
              </p>
              <p>
                {locale === 'ar'
                  ? 'قررنا إنشاء منصة رقمية تجمع الطرفين، مع التركيز على الشفافية والجودة والثقة. اليوم، نفخر بخدمة آلاف العملاء والحرفيين في جميع أنحاء المغرب.'
                  : 'Nous avons décidé de créer une plateforme numérique réunissant les deux parties, en mettant l\'accent sur la transparence, la qualité et la confiance. Aujourd\'hui, nous sommes fiers de servir des milliers de clients et d\'artisans à travers le Maroc.'}
              </p>
              <p>
                {locale === 'ar'
                  ? 'مع كل حجز ناجح، نقترب أكثر من هدفنا: جعل المغرب مكاناً حيث يمكن للجميع الوصول بسهولة إلى خدمات عالية الجودة بأسعار عادلة.'
                  : 'Avec chaque réservation réussie, nous nous rapprochons de notre objectif : faire du Maroc un endroit où chacun peut facilement accéder à des services de qualité à des prix équitables.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              {locale === 'ar' ? 'انضم إلينا اليوم' : 'Rejoignez-nous Aujourd\'hui'}
            </h2>
            <p className="text-lg text-gray-700 font-medium mb-8">
              {locale === 'ar'
                ? 'سواء كنت تبحث عن خدمات أو حرفي يبحث عن فرص، Fi-Khidmatik هنا من أجلك'
                : 'Que vous recherchiez des services ou que vous soyez un artisan cherchant des opportunités, Fi-Khidmatik est là pour vous'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/craftsmen`}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
              >
                {locale === 'ar' ? 'ابحث عن حرفي' : 'Trouver un Artisan'}
              </a>
              <a
                href={`/${locale}/auth/register?type=craftsman`}
                className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
              >
                {locale === 'ar' ? 'سجل كحرفي' : 'S\'inscrire comme Artisan'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
