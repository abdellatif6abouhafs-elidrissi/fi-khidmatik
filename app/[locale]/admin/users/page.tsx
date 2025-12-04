'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Search, UserPlus, Edit, Trash2, Mail, Phone } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((u) => u._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'danger';
      case 'craftsman':
        return 'info';
      default:
        return 'default';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'مشرف';
      case 'craftsman':
        return 'حرفي';
      case 'customer':
        return 'عميل';
      default:
        return role;
    }
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">المستخدمون</h1>
          <p className="text-gray-600 font-medium">
            إدارة جميع المستخدمين في المنصة
          </p>
        </div>
        <Button variant="primary">
          <UserPlus className="w-5 h-5" />
          إضافة مستخدم
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6" padding="md">
        <Input
          placeholder="ابحث عن مستخدم..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-5 h-5" />}
        />
      </Card>

      {/* Users Table */}
      <Card variant="elevated" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  المستخدم
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  الهاتف
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  الدور
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  تاريخ التسجيل
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('ar-MA')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">لم يتم العثور على مستخدمين</p>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="تعديل المستخدم"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <Input label="الاسم" defaultValue={selectedUser.name} />
            <Input label="البريد الإلكتروني" defaultValue={selectedUser.email} />
            <Input label="الهاتف" defaultValue={selectedUser.phone} />
            <div className="flex gap-3 pt-4">
              <Button variant="primary" className="flex-1">
                حفظ التغييرات
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
