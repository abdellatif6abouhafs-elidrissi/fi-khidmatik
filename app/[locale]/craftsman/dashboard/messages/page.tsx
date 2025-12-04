import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Send, Search } from 'lucide-react';
import Input from '@/components/ui/Input';

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const conversations = [
    {
      id: '1',
      customer: 'Ahmed Bennani',
      lastMessage: locale === 'ar' ? 'شكرا على العمل الممتاز' : 'Merci pour l\'excellent travail',
      time: '10:30',
      unread: 0,
    },
    {
      id: '2',
      customer: 'Fatima Zahra',
      lastMessage: locale === 'ar' ? 'متى يمكنك البدء بالعمل؟' : 'Quand pouvez-vous commencer?',
      time: '09:15',
      unread: 2,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'الرسائل' : 'Messages'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar' ? 'تواصل مع عملائك' : 'Communiquez avec vos clients'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card variant="elevated" className="lg:col-span-1" padding="none">
          <div className="p-4 border-b">
            <Input
              placeholder={locale === 'ar' ? 'بحث...' : 'Rechercher...'}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                      {conv.customer.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold truncate">{conv.customer}</h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card variant="elevated" className="lg:col-span-2" padding="none">
          <div className="p-6 border-b">
            <h2 className="font-bold text-xl">
              {locale === 'ar' ? 'اختر محادثة' : 'Sélectionnez une conversation'}
            </h2>
          </div>
          <div className="h-[500px] flex items-center justify-center text-gray-500">
            {locale === 'ar'
              ? 'اختر محادثة من القائمة للبدء'
              : 'Sélectionnez une conversation pour commencer'}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder={locale === 'ar' ? 'اكتب رسالة...' : 'Tapez un message...'}
                className="flex-1"
              />
              <Button variant="primary">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
