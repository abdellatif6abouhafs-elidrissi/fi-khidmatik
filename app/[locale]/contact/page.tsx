'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      alert(
        locale === 'ar'
          ? 'تم إرسال رسالتك بنجاح! سنرد عليك قريباً'
          : 'Votre message a été envoyé avec succès ! Nous vous répondrons bientôt'
      );
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: locale === 'ar' ? 'الهاتف' : 'Téléphone',
      value: '+212 5 22 XX XX XX',
      link: 'tel:+212522XXXXXX',
    },
    {
      icon: Mail,
      title: locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: 'contact@fi-khidmatik.ma',
      link: 'mailto:contact@fi-khidmatik.ma',
    },
    {
      icon: MapPin,
      title: locale === 'ar' ? 'العنوان' : 'Adresse',
      value:
        locale === 'ar'
          ? 'الدار البيضاء، المغرب'
          : 'Casablanca, Maroc',
      link: null,
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
              {locale === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
            </h1>
            <p className="text-xl font-semibold drop-shadow-md">
              {locale === 'ar'
                ? 'نحن هنا لمساعدتك! لا تتردد في التواصل معنا'
                : 'Nous sommes là pour vous aider ! N\'hésitez pas à nous contacter'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} variant="elevated" hover>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-700 font-medium">{info.value}</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                {locale === 'ar' ? 'أرسل لنا رسالة' : 'Envoyez-nous un Message'}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {locale === 'ar'
                  ? 'املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن'
                  : 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais'}
              </p>
            </div>

            <Card variant="elevated">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={locale === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder={
                      locale === 'ar' ? 'أدخل اسمك' : 'Entrez votre nom'
                    }
                  />
                  <Input
                    label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    placeholder={
                      locale === 'ar'
                        ? 'example@email.com'
                        : 'example@email.com'
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={locale === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder={
                      locale === 'ar'
                        ? '+212 6XX XX XX XX'
                        : '+212 6XX XX XX XX'
                    }
                  />
                  <Input
                    label={locale === 'ar' ? 'الموضوع' : 'Sujet'}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    placeholder={
                      locale === 'ar' ? 'موضوع رسالتك' : 'Sujet de votre message'
                    }
                  />
                </div>

                <Textarea
                  label={locale === 'ar' ? 'الرسالة' : 'Message'}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  placeholder={
                    locale === 'ar'
                      ? 'اكتب رسالتك هنا...'
                      : 'Écrivez votre message ici...'
                  }
                />

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-full"
                >
                  <Send className="w-5 h-5" />
                  {loading
                    ? locale === 'ar'
                      ? 'جاري الإرسال...'
                      : 'Envoi en cours...'
                    : locale === 'ar'
                    ? 'إرسال الرسالة'
                    : 'Envoyer le Message'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-4">
              {locale === 'ar'
                ? 'ابحث عن إجابة سريعة؟'
                : 'Besoin d\'une réponse rapide ?'}
            </h3>
            <p className="text-gray-700 font-medium mb-6">
              {locale === 'ar'
                ? 'تحقق من صفحة الأسئلة الشائعة للحصول على إجابات فورية'
                : 'Consultez notre page FAQ pour des réponses instantanées'}
            </p>
            <a
              href={`/${locale}/faq`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              {locale === 'ar' ? 'زيارة الأسئلة الشائعة' : 'Visiter la FAQ'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
