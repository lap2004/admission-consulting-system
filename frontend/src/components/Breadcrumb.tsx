// components/Breadcrumb.tsx
'use client';

import { usePathname } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';

const Breadcrumb = () => {
  const pathname = usePathname(); 
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbSegments = segments.filter(seg => seg !== 'guide');


  return (
    <div className="text-md px-6 text-gray-500 mt-2 flex items-center">
      <Link href="/" className="hover:underline text-blue-400 font-semibold">Trang chủ</Link>
      {breadcrumbSegments.map((seg, i) => {
        const href = '/' + segments.slice(0, i + 1).join('/');
        return (
          <div key={i}>
            <NavigateNextIcon className='text-blue-300 text-xs'/>
            <Link href={href} className=" text-blue-400 font-semibold hover:underline capitalize">{seg.replace('-', ' ')}</Link>{/* thay the dua tren ten da dat */}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
