'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { CheckCircle, XCircle, Eye, Star, MapPin, Briefcase } from 'lucide-react';

interface Craftsman {
  _id: string;
  userId: {
    name: string;
    email: string;
    phone: string;
  };
  specialty: string;
  bio: string;
  experience: number;
  hourlyRate: number;
  location: {
    city: string;
    address: string;
  };
  certifications: string[];
  verified: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export default function VerificationPage() {
  const [craftsmen, setsetCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPendingCraftsmen();
  }, []);

  const fetchPendingCraftsmen = async () => {
    try {
      const response = await fetch('/api/admin/craftsmen/pending');
      const data = await response.json();
      setsetCraftsmen(data.craftsmen || []);
    } catch (error) {
      console.error('Error fetching craftsmen:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (craftsmanId: string, verified: boolean) => {
    try {
      await fetch(`/api/admin/craftsmen/${craftsmanId}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified }),
      });

      setsetCraftsmen(craftsmen.filter((c) => c._id !== craftsmanId));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error verifying craftsman:', error);
    }
  };

  const getSpecialtyLabel = (specialty: string) => {
    const labels: Record<string, string> = {
      plumber: 'سباك',
      electrician: 'كهربائي',
      carpenter: 'نجار',
      painter: 'دهان',
      mason: 'بناء',
      gardener: 'بستاني',
      cleaner: 'عامل نظافة',
      other: 'أخرى',
    };
    return labels[specialty] || specialty;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          التحقق من الحرفيين
        </h1>
        <p className="text-gray-600 font-medium">
          راجع وتحقق من طلبات الحرفيين الجدد
        </p>
      </div>

      {/* Pending Craftsmen Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {craftsmen.map((craftsman) => (
          <Card key={craftsman._id} variant="elevated" hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {craftsman.userId.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">
                    {craftsman.userId.name}
                  </h3>
                  <Badge variant="info" size="sm">
                    {getSpecialtyLabel(craftsman.specialty)}
                  </Badge>
                </div>
              </div>
              <Badge variant="warning">قيد المراجعة</Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Briefcase className="w-4 h-4" />
                <span>{craftsman.experience} سنوات خبرة</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <MapPin className="w-4 h-4" />
                <span>{craftsman.location.city}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{craftsman.hourlyRate} DH/ساعة</span>
              </div>
            </div>

            <p className="text-gray-700 font-medium mb-4 line-clamp-2">
              {craftsman.bio}
            </p>

            {craftsman.certifications.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  الشهادات:
                </p>
                <div className="flex flex-wrap gap-2">
                  {craftsman.certifications.map((cert, index) => (
                    <Badge key={index} variant="default" size="sm">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setSelectedCraftsman(craftsman);
                  setIsModalOpen(true);
                }}
              >
                <Eye className="w-4 h-4" />
                عرض التفاصيل
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => handleVerify(craftsman._id, true)}
              >
                <CheckCircle className="w-4 h-4" />
                قبول
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => handleVerify(craftsman._id, false)}
              >
                <XCircle className="w-4 h-4" />
                رفض
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {craftsmen.length === 0 && (
        <Card variant="elevated" className="text-center py-12">
          <p className="text-gray-500 font-medium text-lg">
            لا توجد طلبات تحقق جديدة
          </p>
        </Card>
      )}

      {/* Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="تفاصيل الحرفي"
        size="lg"
      >
        {selectedCraftsman && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {selectedCraftsman.userId.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {selectedCraftsman.userId.name}
                </h3>
                <p className="text-gray-600 font-medium">
                  {selectedCraftsman.userId.email}
                </p>
                <p className="text-gray-600 font-medium">
                  {selectedCraftsman.userId.phone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  التخصص
                </p>
                <p className="font-bold text-gray-900">
                  {getSpecialtyLabel(selectedCraftsman.specialty)}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  الخبرة
                </p>
                <p className="font-bold text-gray-900">
                  {selectedCraftsman.experience} سنوات
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  السعر/ساعة
                </p>
                <p className="font-bold text-gray-900">
                  {selectedCraftsman.hourlyRate} DH
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  المدينة
                </p>
                <p className="font-bold text-gray-900">
                  {selectedCraftsman.location.city}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">
                السيرة الذاتية
              </p>
              <p className="text-gray-700 font-medium leading-relaxed">
                {selectedCraftsman.bio}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">
                العنوان
              </p>
              <p className="text-gray-700 font-medium">
                {selectedCraftsman.location.address}
              </p>
            </div>

            {selectedCraftsman.certifications.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  الشهادات
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCraftsman.certifications.map((cert, index) => (
                    <Badge key={index} variant="info">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => handleVerify(selectedCraftsman._id, true)}
              >
                <CheckCircle className="w-5 h-5" />
                قبول الطلب
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={() => handleVerify(selectedCraftsman._id, false)}
              >
                <XCircle className="w-5 h-5" />
                رفض الطلب
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
