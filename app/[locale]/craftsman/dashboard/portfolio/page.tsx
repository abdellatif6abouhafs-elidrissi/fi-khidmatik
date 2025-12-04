import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Mock portfolio items
  const portfolioItems = [
    {
      id: '1',
      title: locale === 'ar' ? 'تركيب إضاءة حديثة' : 'Installation éclairage moderne',
      description: locale === 'ar'
        ? 'تركيب نظام إضاءة LED حديث في شقة'
        : 'Installation système LED moderne dans appartement',
      date: '2025-11-15',
      views: 145,
    },
    {
      id: '2',
      title: locale === 'ar' ? 'صيانة كهربائية شاملة' : 'Maintenance électrique complète',
      description: locale === 'ar'
        ? 'فحص وصيانة النظام الكهربائي لفيلا'
        : 'Inspection et maintenance système électrique villa',
      date: '2025-10-28',
      views: 98,
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {locale === 'ar' ? 'معرض الأعمال' : 'Portfolio'}
          </h1>
          <p className="text-gray-600 font-medium">
            {locale === 'ar'
              ? 'اعرض أعمالك السابقة وجذب المزيد من العملاء'
              : 'Montrez vos travaux et attirez plus de clients'}
          </p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4" />
          {locale === 'ar' ? 'إضافة عمل' : 'Ajouter un projet'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <Card key={item.id} variant="elevated" padding="none">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-6xl">📸</span>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{item.date}</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{item.views}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="flex-1">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add New Card */}
        <Card variant="elevated" padding="none" className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">
                {locale === 'ar' ? 'إضافة مشروع جديد' : 'Ajouter un nouveau projet'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
