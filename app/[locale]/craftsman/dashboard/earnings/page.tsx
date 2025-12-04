import Card from '@/components/ui/Card';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import Button from '@/components/ui/Button';

export default async function EarningsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Mock data
  const stats = {
    total: 12500,
    thisMonth: 3200,
    pending: 850,
    completed: 15,
  };

  const transactions = [
    {
      id: '1',
      date: '2025-12-03',
      customer: 'Ahmed Bennani',
      service: locale === 'ar' ? 'صيانة كهربائية' : 'Maintenance électrique',
      amount: 350,
      status: 'paid',
    },
    {
      id: '2',
      date: '2025-12-02',
      customer: 'Fatima Zahra',
      service: locale === 'ar' ? 'تركيب مصابيح' : 'Installation de luminaires',
      amount: 200,
      status: 'paid',
    },
    {
      id: '3',
      date: '2025-12-01',
      customer: 'Mohamed Alami',
      service: locale === 'ar' ? 'إصلاح أعطال' : 'Réparation de pannes',
      amount: 500,
      status: 'pending',
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {locale === 'ar' ? 'الأرباح' : 'Revenus'}
          </h1>
          <p className="text-gray-600 font-medium">
            {locale === 'ar' ? 'تتبع أرباحك ومعاملاتك المالية' : 'Suivez vos revenus et transactions'}
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4" />
          {locale === 'ar' ? 'تحميل التقرير' : 'Télécharger le rapport'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card variant="elevated" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100 font-medium">
              {locale === 'ar' ? 'إجمالي الأرباح' : 'Total des revenus'}
            </span>
            <DollarSign className="w-5 h-5 text-blue-100" />
          </div>
          <div className="text-3xl font-black">{stats.total} DH</div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">
              {locale === 'ar' ? 'هذا الشهر' : 'Ce mois'}
            </span>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black text-gray-900">{stats.thisMonth} DH</div>
          <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <TrendingUp className="w-4 h-4" />
            <span>+15%</span>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">
              {locale === 'ar' ? 'قيد الانتظار' : 'En attente'}
            </span>
            <DollarSign className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-black text-gray-900">{stats.pending} DH</div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">
              {locale === 'ar' ? 'المعاملات المكتملة' : 'Transactions terminées'}
            </span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-black text-gray-900">{stats.completed}</div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card variant="elevated" padding="none">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">
            {locale === 'ar' ? 'آخر المعاملات' : 'Dernières transactions'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  {locale === 'ar' ? 'التاريخ' : 'Date'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  {locale === 'ar' ? 'العميل' : 'Client'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  {locale === 'ar' ? 'الخدمة' : 'Service'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  {locale === 'ar' ? 'المبلغ' : 'Montant'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  {locale === 'ar' ? 'الحالة' : 'Statut'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600 font-medium">{transaction.date}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{transaction.customer}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{transaction.service}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">{transaction.amount} DH</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {transaction.status === 'paid'
                        ? locale === 'ar'
                          ? 'مدفوع'
                          : 'Payé'
                        : locale === 'ar'
                        ? 'قيد الانتظار'
                        : 'En attente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
