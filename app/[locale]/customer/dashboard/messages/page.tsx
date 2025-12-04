import { requireCustomer } from '@/lib/auth-helpers';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { MessageSquare, Send } from 'lucide-react';

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await requireCustomer();
  const { locale } = await params;

  // This will be populated later with actual messages from database
  const messages: any[] = [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          {locale === 'ar' ? 'الرسائل' : 'Messages'}
        </h1>
        <p className="text-gray-600 font-medium">
          {locale === 'ar'
            ? 'تواصل مع الحرفيين'
            : 'Communiquez avec les artisans'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card variant="elevated" className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'المحادثات' : 'Conversations'}
          </h2>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium text-sm">
                {locale === 'ar'
                  ? 'لا توجد محادثات بعد'
                  : 'Aucune conversation'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {msg.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">
                        {msg.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate font-medium">
                        {msg.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Message Area */}
        <Card variant="elevated" className="lg:col-span-2">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                {locale === 'ar'
                  ? 'اختر محادثة للبدء'
                  : 'Sélectionnez une conversation pour commencer'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-[500px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Message bubbles will go here */}
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={
                      locale === 'ar'
                        ? 'اكتب رسالة...'
                        : 'Tapez un message...'
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium"
                  />
                  <Button variant="primary">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
