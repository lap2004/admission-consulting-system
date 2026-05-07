'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Breadcrumb from '@/src/components/Breadcrumb';

const pages = [
  { id: '2.1-dang-ky', label: '1.Đăng ký' },
  { id: '2.2-dang-nhap', label: '2.Đăng nhập' },
  { id: '2.3-quen-mat-khau', label: '3.Quên mật khẩu' },
  { id: '3-su-dung-chatbot', label: '4.Hỗ trợ sử dụng chatbot' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpen = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className="h-screen max-h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 shadow sticky top-0 z-50 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hệ thống hỗ trợ người dùng</h1>

        {/* Mobile menu icon */}
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 h-full z-40 bg-white p-4 w-72 shadow transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:relative md:block md:h-auto md:z-auto
          `}
        >
          <nav className="space-y-1 mt-14 md:mt-0">
            <Link
              href={`/guide/1-gioi-thieu`}
              className={` ${pathname === "/guide/1-gioi-thieu"
                ? 'font-bold text-blue-600'
                : 'hover:bg-blue-300'
                } block px-4 py-2 rounded transition text-[#777777] text-lg`}
            >
              Giới thiệu
            </Link>
            {pages.map((page) => {
              const href = `/guide/${page.id}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={page.id}
                  href={href}
                  className={`block px-4 py-1 rounded transition text-[#777777] text-md ${isActive ? 'font-bold text-blue-600' : 'hover:bg-blue-300'
                    }`}
                    onClick={handleOpen} 
                >
                  {page.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay khi mở sidebar mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-300 bg-opacity-50 z-30 md:hidden"
            onClick={handleOpen}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white no-scrollbar z-10 relative">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
