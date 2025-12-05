import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const principles = [
    {
      icon: Shield,
      title: locale === 'ar' ? 'الحماية' : 'Protection',
      description:
        locale === 'ar'
          ? 'نحمي بياناتك بأعلى معايير الأمان'
          : 'Nous protégeons vos données avec les plus hauts standards de sécurité',
    },
    {
      icon: Lock,
      title: locale === 'ar' ? 'الخصوصية' : 'Confidentialité',
      description:
        locale === 'ar'
          ? 'معلوماتك الشخصية تبقى خاصة وآمنة'
          : 'Vos informations personnelles restent privées et sécurisées',
    },
    {
      icon: Eye,
      title: locale === 'ar' ? 'الشفافية' : 'Transparence',
      description:
        locale === 'ar'
          ? 'نوضح بشكل واضح كيف نستخدم بياناتك'
          : 'Nous expliquons clairement comment nous utilisons vos données',
    },
    {
      icon: Database,
      title: locale === 'ar' ? 'التحكم' : 'Contrôle',
      description:
        locale === 'ar'
          ? 'أنت تتحكم في بياناتك الشخصية'
          : 'Vous contrôlez vos données personnelles',
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Politique de Confidentialité'}
            </h1>
            <p className="text-lg font-semibold drop-shadow-md">
              {locale === 'ar'
                ? 'آخر تحديث: ديسمبر 2025'
                : 'Dernière mise à jour : Décembre 2025'}
            </p>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-lg"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-700 font-medium text-sm">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card variant="elevated" className="prose prose-lg max-w-none">
              {locale === 'ar' ? (
                <div className="space-y-8 text-gray-700 font-medium leading-relaxed" dir="rtl">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      1. المعلومات التي نجمعها
                    </h2>
                    <p>نقوم بجمع الأنواع التالية من المعلومات:</p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li><strong>معلومات الحساب:</strong> الاسم، البريد الإلكتروني، رقم الهاتف</li>
                      <li><strong>معلومات الملف الشخصي:</strong> الصورة الشخصية، العنوان، التخصص (للحرفيين)</li>
                      <li><strong>معلومات الحجز:</strong> تفاصيل الخدمات المطلوبة والمواعيد</li>
                      <li><strong>معلومات الدفع:</strong> تفاصيل بطاقة الائتمان (مشفرة)</li>
                      <li><strong>معلومات الاستخدام:</strong> كيفية استخدامك للمنصة</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      2. كيف نستخدم معلوماتك
                    </h2>
                    <p>نستخدم معلوماتك من أجل:</p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>تقديم وتحسين خدماتنا</li>
                      <li>معالجة الحجوزات والمدفوعات</li>
                      <li>التواصل معك بخصوص حجوزاتك</li>
                      <li>إرسال إشعارات وتحديثات مهمة</li>
                      <li>منع الاحتيال وضمان الأمان</li>
                      <li>تحليل وتحسين تجربة المستخدم</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      3. مشاركة المعلومات
                    </h2>
                    <p>نشارك معلوماتك فقط في الحالات التالية:</p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li><strong>مع الحرفيين:</strong> نشارك معلومات الاتصال الضرورية لإتمام الخدمة</li>
                      <li><strong>مع مزودي الخدمات:</strong> معالجات الدفع ومقدمي الخدمات التقنية</li>
                      <li><strong>للامتثال القانوني:</strong> عند الطلب من السلطات المختصة</li>
                      <li><strong>بموافقتك:</strong> في أي حالة أخرى بعد الحصول على موافقتك</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      4. أمان البيانات
                    </h2>
                    <p>
                      نتخذ تدابير أمنية صارمة لحماية معلوماتك الشخصية:
                    </p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>تشفير البيانات الحساسة (SSL/TLS)</li>
                      <li>خوادم آمنة ومحمية</li>
                      <li>وصول محدود للموظفين المصرح لهم</li>
                      <li>مراقبة أمنية مستمرة</li>
                      <li>نسخ احتياطي منتظم</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      5. حقوقك
                    </h2>
                    <p>لديك الحق في:</p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>الوصول إلى معلوماتك الشخصية</li>
                      <li>تصحيح أو تحديث معلوماتك</li>
                      <li>حذف حسابك ومعلوماتك</li>
                      <li>الاعتراض على معالجة بياناتك</li>
                      <li>تنزيل نسخة من بياناتك</li>
                      <li>إلغاء الاشتراك في الرسائل التسويقية</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      6. ملفات تعريف الارتباط (Cookies)
                    </h2>
                    <p>
                      نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة. يمكنك التحكم في
                      ملفات تعريف الارتباط من خلال إعدادات المتصفح.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      7. الاحتفاظ بالبيانات
                    </h2>
                    <p>
                      نحتفظ بمعلوماتك طالما كان حسابك نشطاً أو كما هو ضروري لتقديم خدماتنا.
                      يمكنك طلب حذف بياناتك في أي وقت.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      8. خصوصية الأطفال
                    </h2>
                    <p>
                      خدماتنا مخصصة للأشخاص الذين تبلغ أعمارهم 18 عاماً أو أكثر. لا نجمع
                      معلومات من الأطفال دون سن 18 عاماً عن قصد.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      9. التغييرات على سياسة الخصوصية
                    </h2>
                    <p>
                      قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنخطرك بأي تغييرات مهمة
                      عبر البريد الإلكتروني أو من خلال المنصة.
                    </p>
                  </div>

                  <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-black text-gray-900 mb-3">
                      اتصل بنا
                    </h3>
                    <p>
                      إذا كان لديك أي أسئلة حول سياسة الخصوصية أو ترغب في ممارسة حقوقك:
                    </p>
                    <p className="mt-2">
                      <strong>البريد الإلكتروني:</strong> privacy@fi-khidmatik.ma
                    </p>
                    <p className="mt-1">
                      <strong>الهاتف:</strong> +212 5 22 XX XX XX
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 text-gray-700 font-medium leading-relaxed">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      1. Informations que Nous Collectons
                    </h2>
                    <p>Nous collectons les types d'informations suivants :</p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li><strong>Informations de compte :</strong> nom, email, numéro de téléphone</li>
                      <li><strong>Informations de profil :</strong> photo, adresse, spécialité (pour artisans)</li>
                      <li><strong>Informations de réservation :</strong> détails des services et rendez-vous</li>
                      <li><strong>Informations de paiement :</strong> détails de carte bancaire (cryptés)</li>
                      <li><strong>Informations d'utilisation :</strong> comment vous utilisez la plateforme</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      2. Comment Nous Utilisons Vos Informations
                    </h2>
                    <p>Nous utilisons vos informations pour :</p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Fournir et améliorer nos services</li>
                      <li>Traiter les réservations et paiements</li>
                      <li>Communiquer avec vous concernant vos réservations</li>
                      <li>Envoyer des notifications et mises à jour importantes</li>
                      <li>Prévenir la fraude et assurer la sécurité</li>
                      <li>Analyser et améliorer l'expérience utilisateur</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      3. Partage d'Informations
                    </h2>
                    <p>Nous partageons vos informations uniquement dans les cas suivants :</p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li><strong>Avec les artisans :</strong> informations de contact nécessaires pour le service</li>
                      <li><strong>Avec les prestataires :</strong> processeurs de paiement et services techniques</li>
                      <li><strong>Conformité légale :</strong> sur demande des autorités compétentes</li>
                      <li><strong>Avec votre consentement :</strong> dans tout autre cas avec votre autorisation</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      4. Sécurité des Données
                    </h2>
                    <p>
                      Nous prenons des mesures strictes pour protéger vos informations :
                    </p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Chiffrement des données sensibles (SSL/TLS)</li>
                      <li>Serveurs sécurisés et protégés</li>
                      <li>Accès limité au personnel autorisé</li>
                      <li>Surveillance de sécurité continue</li>
                      <li>Sauvegardes régulières</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      5. Vos Droits
                    </h2>
                    <p>Vous avez le droit de :</p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Accéder à vos informations personnelles</li>
                      <li>Corriger ou mettre à jour vos informations</li>
                      <li>Supprimer votre compte et informations</li>
                      <li>Vous opposer au traitement de vos données</li>
                      <li>Télécharger une copie de vos données</li>
                      <li>Vous désabonner des communications marketing</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      6. Cookies
                    </h2>
                    <p>
                      Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez contrôler
                      les cookies via les paramètres de votre navigateur.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      7. Conservation des Données
                    </h2>
                    <p>
                      Nous conservons vos informations tant que votre compte est actif ou nécessaire
                      pour fournir nos services. Vous pouvez demander la suppression à tout moment.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      8. Confidentialité des Enfants
                    </h2>
                    <p>
                      Nos services sont destinés aux personnes de 18 ans ou plus. Nous ne collectons
                      pas intentionnellement d'informations d'enfants de moins de 18 ans.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      9. Modifications de la Politique
                    </h2>
                    <p>
                      Nous pouvons mettre à jour cette politique périodiquement. Nous vous informerons
                      de tout changement important par email ou via la plateforme.
                    </p>
                  </div>

                  <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-black text-gray-900 mb-3">
                      Nous Contacter
                    </h3>
                    <p>
                      Pour toute question sur cette politique ou pour exercer vos droits :
                    </p>
                    <p className="mt-2">
                      <strong>Email :</strong> privacy@fi-khidmatik.ma
                    </p>
                    <p className="mt-1">
                      <strong>Téléphone :</strong> +212 5 22 XX XX XX
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
