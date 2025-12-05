'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { ChevronDown, ChevronUp, HelpCircle, Users, Shield, CreditCard } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const generalFAQs: FAQItem[] = locale === 'ar' ? [
    {
      question: 'ما هي Fi-Khidmatik؟',
      answer: 'Fi-Khidmatik هي منصة رقمية تربط العملاء بالحرفيين المحترفين في المغرب. نوفر خدمات متنوعة من السباكة، الكهرباء، النجارة، الدهان وغيرها.',
    },
    {
      question: 'كيف يمكنني حجز خدمة؟',
      answer: 'يمكنك تصفح الحرفيين المتاحين، اختيار الحرفي المناسب، ثم النقر على "احجز الآن". املأ تفاصيل الحجز وسيتم تأكيد موعدك.',
    },
    {
      question: 'هل الحرفيون معتمدون؟',
      answer: 'نعم، جميع الحرفيين على منصتنا يتم التحقق من هويتهم ومؤهلاتهم قبل قبولهم. نضمن لك حرفيين موثوقين ومحترفين.',
    },
    {
      question: 'ما هي تكلفة الخدمات؟',
      answer: 'تختلف التكلفة حسب نوع الخدمة والحرفي. يعرض كل حرفي سعره بالساعة أو بالخدمة. يمكنك رؤية السعر الإجمالي قبل تأكيد الحجز.',
    },
  ] : [
    {
      question: 'Qu\'est-ce que Fi-Khidmatik ?',
      answer: 'Fi-Khidmatik est une plateforme numérique qui connecte les clients aux artisans professionnels au Maroc. Nous offrons divers services : plomberie, électricité, menuiserie, peinture et plus encore.',
    },
    {
      question: 'Comment puis-je réserver un service ?',
      answer: 'Vous pouvez parcourir les artisans disponibles, choisir celui qui vous convient, puis cliquer sur "Réserver". Remplissez les détails de la réservation et votre rendez-vous sera confirmé.',
    },
    {
      question: 'Les artisans sont-ils certifiés ?',
      answer: 'Oui, tous les artisans sur notre plateforme sont vérifiés et certifiés avant d\'être acceptés. Nous vous garantissons des artisans fiables et professionnels.',
    },
    {
      question: 'Quel est le coût des services ?',
      answer: 'Le coût varie selon le type de service et l\'artisan. Chaque artisan affiche son tarif horaire ou par service. Vous pouvez voir le prix total avant de confirmer la réservation.',
    },
  ];

  const customerFAQs: FAQItem[] = locale === 'ar' ? [
    {
      question: 'كيف أقوم بالدفع؟',
      answer: 'نقبل الدفع نقداً بعد إتمام الخدمة أو عبر المنصة ببطاقة الائتمان. جميع المدفوعات آمنة ومضمونة.',
    },
    {
      question: 'ماذا لو لم أكن راضياً عن الخدمة؟',
      answer: 'رضاك هو أولويتنا. إذا لم تكن راضياً، يمكنك الاتصال بخدمة العملاء وسنعمل على حل المشكلة أو استرداد المبلغ إذا لزم الأمر.',
    },
    {
      question: 'هل يمكنني إلغاء الحجز؟',
      answer: 'نعم، يمكنك إلغاء الحجز قبل 24 ساعة من الموعد المحدد دون أي رسوم. الإلغاء المتأخر قد يتضمن رسوم إلغاء.',
    },
    {
      question: 'كيف أعرف إذا كان الحرفي موثوقاً؟',
      answer: 'يمكنك قراءة تقييمات العملاء السابقين، مشاهدة معرض أعماله، والتحقق من سنوات خبرته ومؤهلاته.',
    },
  ] : [
    {
      question: 'Comment puis-je payer ?',
      answer: 'Nous acceptons le paiement en espèces après la prestation ou via la plateforme par carte bancaire. Tous les paiements sont sécurisés et garantis.',
    },
    {
      question: 'Que faire si je ne suis pas satisfait du service ?',
      answer: 'Votre satisfaction est notre priorité. Si vous n\'êtes pas satisfait, contactez notre service client et nous travaillerons à résoudre le problème ou à vous rembourser si nécessaire.',
    },
    {
      question: 'Puis-je annuler ma réservation ?',
      answer: 'Oui, vous pouvez annuler votre réservation jusqu\'à 24 heures avant le rendez-vous sans frais. Les annulations tardives peuvent entraîner des frais d\'annulation.',
    },
    {
      question: 'Comment savoir si un artisan est fiable ?',
      answer: 'Vous pouvez lire les avis des clients précédents, consulter son portfolio, et vérifier ses années d\'expérience et qualifications.',
    },
  ];

  const craftsmanFAQs: FAQItem[] = locale === 'ar' ? [
    {
      question: 'كيف يمكنني التسجيل كحرفي؟',
      answer: 'انقر على "سجل كحرفي" في الصفحة الرئيسية، املأ معلوماتك ووثائقك، وانتظر الموافقة من فريقنا.',
    },
    {
      question: 'ما هي العمولة التي تأخذها المنصة؟',
      answer: 'نأخذ عمولة صغيرة من كل حجز ناجح لتغطية تكاليف المنصة والتسويق. ستحصل على معظم قيمة الخدمة.',
    },
    {
      question: 'متى أحصل على أموالي؟',
      answer: 'يتم تحويل الأموال إلى حسابك خلال 3-5 أيام عمل بعد إتمام الخدمة وتأكيد العميل.',
    },
    {
      question: 'كيف أحصل على المزيد من العملاء؟',
      answer: 'حافظ على تقييم عالٍ، أضف صور أعمالك السابقة، اكتب نبذة تعريفية جيدة، وكن سريع الاستجابة لطلبات الحجز.',
    },
  ] : [
    {
      question: 'Comment puis-je m\'inscrire comme artisan ?',
      answer: 'Cliquez sur "S\'inscrire comme Artisan" sur la page d\'accueil, remplissez vos informations et documents, et attendez l\'approbation de notre équipe.',
    },
    {
      question: 'Quelle commission prend la plateforme ?',
      answer: 'Nous prenons une petite commission sur chaque réservation réussie pour couvrir les coûts de plateforme et de marketing. Vous recevrez la majorité de la valeur du service.',
    },
    {
      question: 'Quand vais-je recevoir mon argent ?',
      answer: 'Les fonds sont transférés sur votre compte dans les 3-5 jours ouvrables après la prestation et confirmation du client.',
    },
    {
      question: 'Comment obtenir plus de clients ?',
      answer: 'Maintenez une note élevée, ajoutez des photos de vos travaux précédents, rédigez une bonne bio, et soyez réactif aux demandes de réservation.',
    },
  ];

  const paymentFAQs: FAQItem[] = locale === 'ar' ? [
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل الدفع ببطاقات الائتمان (Visa, Mastercard)، والدفع نقداً بعد الخدمة. قريباً سنضيف المحفظة الإلكترونية.',
    },
    {
      question: 'هل معلومات الدفع آمنة؟',
      answer: 'نعم، جميع المعاملات محمية بتشفير SSL ونستخدم بوابات دفع موثوقة ومعتمدة.',
    },
    {
      question: 'متى يتم خصم المبلغ؟',
      answer: 'يتم خصم المبلغ بعد تأكيد الحجز أو بعد إتمام الخدمة حسب نوع الدفع المختار.',
    },
  ] : [
    {
      question: 'Quels sont les moyens de paiement disponibles ?',
      answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard) et le paiement en espèces après service. Bientôt, nous ajouterons le portefeuille électronique.',
    },
    {
      question: 'Les informations de paiement sont-elles sécurisées ?',
      answer: 'Oui, toutes les transactions sont protégées par cryptage SSL et nous utilisons des passerelles de paiement fiables et certifiées.',
    },
    {
      question: 'Quand le montant est-il débité ?',
      answer: 'Le montant est débité après confirmation de la réservation ou après la prestation selon le type de paiement choisi.',
    },
  ];

  const categories = [
    {
      icon: HelpCircle,
      title: locale === 'ar' ? 'عام' : 'Général',
      faqs: generalFAQs,
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'للعملاء' : 'Pour les Clients',
      faqs: customerFAQs,
    },
    {
      icon: Shield,
      title: locale === 'ar' ? 'للحرفيين' : 'Pour les Artisans',
      faqs: craftsmanFAQs,
    },
    {
      icon: CreditCard,
      title: locale === 'ar' ? 'الدفع' : 'Paiement',
      faqs: paymentFAQs,
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
              {locale === 'ar' ? 'الأسئلة الشائعة' : 'Questions Fréquentes'}
            </h1>
            <p className="text-xl font-semibold drop-shadow-md">
              {locale === 'ar'
                ? 'إجابات على أسئلتك الأكثر شيوعاً'
                : 'Réponses à vos questions les plus fréquentes'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {categories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                      {category.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {category.faqs.map((faq, index) => {
                      const globalIndex = categoryIndex * 100 + index;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <Card
                          key={index}
                          variant="elevated"
                          className="cursor-pointer hover:shadow-xl transition-shadow"
                          onClick={() => toggleQuestion(globalIndex)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 flex-1 pr-4">
                              {faq.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                          {isOpen && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-gray-700 font-medium leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-4">
              {locale === 'ar'
                ? 'لم تجد إجابة لسؤالك؟'
                : 'Vous n\'avez pas trouvé de réponse ?'}
            </h3>
            <p className="text-gray-700 font-medium mb-6">
              {locale === 'ar'
                ? 'تواصل معنا وسنكون سعداء بمساعدتك'
                : 'Contactez-nous et nous serons heureux de vous aider'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              {locale === 'ar' ? 'اتصل بنا' : 'Nous Contacter'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
