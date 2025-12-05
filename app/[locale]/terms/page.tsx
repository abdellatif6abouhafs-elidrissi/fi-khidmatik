import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { FileText, CheckCircle } from 'lucide-react';

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
              {locale === 'ar' ? 'شروط الاستخدام' : 'Conditions d\'Utilisation'}
            </h1>
            <p className="text-lg font-semibold drop-shadow-md">
              {locale === 'ar'
                ? 'آخر تحديث: ديسمبر 2025'
                : 'Dernière mise à jour : Décembre 2025'}
            </p>
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
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      1. قبول الشروط
                    </h2>
                    <p>
                      باستخدامك لمنصة Fi-Khidmatik، فإنك توافق على الالتزام بهذه الشروط والأحكام.
                      إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      2. الخدمات المقدمة
                    </h2>
                    <p>
                      Fi-Khidmatik هي منصة وساطة تربط العملاء بالحرفيين المحترفين. نحن لا نقدم
                      الخدمات بأنفسنا بل نسهل الاتصال بين الطرفين.
                    </p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>نوفر منصة آمنة للحجز والدفع</li>
                      <li>نتحقق من هوية ومؤهلات الحرفيين</li>
                      <li>نوفر نظام تقييمات شفاف</li>
                      <li>نقدم خدمة عملاء لحل أي مشاكل</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      3. التسجيل والحساب
                    </h2>
                    <p>
                      يجب عليك تقديم معلومات دقيقة وكاملة عند التسجيل. أنت مسؤول عن:
                    </p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>الحفاظ على سرية كلمة المرور الخاصة بك</li>
                      <li>جميع الأنشطة التي تحدث تحت حسابك</li>
                      <li>إخطارنا فوراً بأي استخدام غير مصرح به</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      4. الحجز والدفع
                    </h2>
                    <p>
                      عند حجز خدمة، فإنك توافق على:
                    </p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>دفع الرسوم المحددة للخدمة</li>
                      <li>احترام مواعيد الحجز</li>
                      <li>تقديم معلومات صحيحة عن الخدمة المطلوبة</li>
                      <li>الالتزام بسياسة الإلغاء الخاصة بنا</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      5. مسؤوليات العملاء
                    </h2>
                    <p>كعميل، أنت مسؤول عن:</p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>تقديم وصف دقيق للخدمة المطلوبة</li>
                      <li>توفير بيئة عمل آمنة للحرفي</li>
                      <li>احترام الحرفي وممتلكاته</li>
                      <li>الدفع في الوقت المحدد</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      6. مسؤوليات الحرفيين
                    </h2>
                    <p>كحرفي، أنت مسؤول عن:</p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>تقديم خدمات عالية الجودة</li>
                      <li>احترام مواعيد الحجز</li>
                      <li>الحفاظ على سلوك مهني</li>
                      <li>تقديم معلومات دقيقة عن مهاراتك وأسعارك</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      7. الإلغاء والاسترداد
                    </h2>
                    <p>
                      يمكن إلغاء الحجوزات قبل 24 ساعة من الموعد المحدد دون رسوم.
                      الإلغاءات المتأخرة قد تخضع لرسوم إلغاء تصل إلى 50% من قيمة الخدمة.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      8. المحتوى والملكية الفكرية
                    </h2>
                    <p>
                      جميع المحتويات على المنصة محمية بموجب قوانين الملكية الفكرية.
                      لا يجوز استخدام أو نسخ أو توزيع المحتوى دون إذن كتابي.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      9. حدود المسؤولية
                    </h2>
                    <p>
                      Fi-Khidmatik ليست مسؤولة عن:
                    </p>
                    <ul className="list-disc list-inside mr-6 mt-3 space-y-2">
                      <li>جودة الخدمات المقدمة من الحرفيين</li>
                      <li>أي أضرار ناتجة عن استخدام الخدمات</li>
                      <li>النزاعات بين العملاء والحرفيين</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      10. التغييرات على الشروط
                    </h2>
                    <p>
                      نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات
                      مهمة عبر البريد الإلكتروني أو من خلال المنصة.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 ml-2" />
                      11. القانون الواجب التطبيق
                    </h2>
                    <p>
                      تخضع هذه الشروط لقوانين المملكة المغربية. أي نزاع يتم حله من خلال
                      المحاكم المختصة في المغرب.
                    </p>
                  </div>

                  <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-black text-gray-900 mb-3">
                      للاستفسارات
                    </h3>
                    <p>
                      إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على:
                    </p>
                    <p className="mt-2">
                      <strong>البريد الإلكتروني:</strong> legal@fi-khidmatik.ma
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 text-gray-700 font-medium leading-relaxed">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      1. Acceptation des Conditions
                    </h2>
                    <p>
                      En utilisant la plateforme Fi-Khidmatik, vous acceptez de vous conformer à ces
                      termes et conditions. Si vous n'acceptez pas une partie de ces conditions,
                      veuillez ne pas utiliser nos services.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      2. Services Fournis
                    </h2>
                    <p>
                      Fi-Khidmatik est une plateforme d'intermédiation qui connecte les clients aux
                      artisans professionnels. Nous ne fournissons pas les services nous-mêmes mais
                      facilitons la connexion entre les parties.
                    </p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Nous fournissons une plateforme sécurisée pour la réservation et le paiement</li>
                      <li>Nous vérifions l'identité et les qualifications des artisans</li>
                      <li>Nous fournissons un système d'évaluation transparent</li>
                      <li>Nous offrons un service client pour résoudre les problèmes</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      3. Inscription et Compte
                    </h2>
                    <p>
                      Vous devez fournir des informations précises et complètes lors de l'inscription.
                      Vous êtes responsable de :
                    </p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Maintenir la confidentialité de votre mot de passe</li>
                      <li>Toutes les activités effectuées sous votre compte</li>
                      <li>Nous informer immédiatement de toute utilisation non autorisée</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      4. Réservation et Paiement
                    </h2>
                    <p>
                      En réservant un service, vous acceptez de :
                    </p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Payer les frais spécifiés pour le service</li>
                      <li>Respecter les horaires de réservation</li>
                      <li>Fournir des informations correctes sur le service demandé</li>
                      <li>Respecter notre politique d'annulation</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      5. Responsabilités des Clients
                    </h2>
                    <p>En tant que client, vous êtes responsable de :</p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Fournir une description précise du service requis</li>
                      <li>Fournir un environnement de travail sûr pour l'artisan</li>
                      <li>Respecter l'artisan et ses biens</li>
                      <li>Payer à temps</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      6. Responsabilités des Artisans
                    </h2>
                    <p>En tant qu'artisan, vous êtes responsable de :</p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>Fournir des services de haute qualité</li>
                      <li>Respecter les horaires de réservation</li>
                      <li>Maintenir un comportement professionnel</li>
                      <li>Fournir des informations précises sur vos compétences et tarifs</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      7. Annulation et Remboursement
                    </h2>
                    <p>
                      Les réservations peuvent être annulées jusqu'à 24 heures avant le rendez-vous sans
                      frais. Les annulations tardives peuvent entraîner des frais d'annulation pouvant
                      aller jusqu'à 50% de la valeur du service.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      8. Contenu et Propriété Intellectuelle
                    </h2>
                    <p>
                      Tout le contenu de la plateforme est protégé par les lois sur la propriété
                      intellectuelle. L'utilisation, la copie ou la distribution du contenu sans
                      autorisation écrite est interdite.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      9. Limitations de Responsabilité
                    </h2>
                    <p>
                      Fi-Khidmatik n'est pas responsable de :
                    </p>
                    <ul className="list-disc list-inside ml-6 mt-3 space-y-2">
                      <li>La qualité des services fournis par les artisans</li>
                      <li>Tout dommage résultant de l'utilisation des services</li>
                      <li>Les litiges entre clients et artisans</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      10. Modifications des Conditions
                    </h2>
                    <p>
                      Nous nous réservons le droit de modifier ces conditions à tout moment. Vous serez
                      informé de tout changement important par e-mail ou via la plateforme.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">
                      <CheckCircle className="inline w-6 h-6 text-blue-600 mr-2" />
                      11. Loi Applicable
                    </h2>
                    <p>
                      Ces conditions sont régies par les lois du Royaume du Maroc. Tout litige sera
                      résolu devant les tribunaux compétents au Maroc.
                    </p>
                  </div>

                  <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-black text-gray-900 mb-3">
                      Pour Toute Question
                    </h3>
                    <p>
                      Si vous avez des questions concernant ces conditions, veuillez nous contacter à :
                    </p>
                    <p className="mt-2">
                      <strong>Email :</strong> legal@fi-khidmatik.ma
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
