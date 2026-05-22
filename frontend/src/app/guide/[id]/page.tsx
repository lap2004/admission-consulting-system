'use client';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import KeyIcon from '@mui/icons-material/Key';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LockIcon from '@mui/icons-material/Lock';
import PushPinIcon from '@mui/icons-material/PushPin';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';


type Params = {
  id: string;
};

const cardData = [
  {
    title: 'Giới thiệu',
    image: '/bot.jpg',
    des: '/guide/1-gioi-thieu',
  },
  {
    title: 'Đăng ký',
    image: '/dangky.png',
    des: '/guide/2.1-dang-ky',
  },
  {
    title: 'Đăng nhập',
    image: '/dangnhap.png',
    des: '/guide/2.2-dang-nhap',
  },
  {
    title: 'Quên mật khẩu',
    image: '/changepass.png',
    des: '/guide/2.3-quen-mat-khau',
  },
  {
    title: 'Hỗ trợ sử dụng Chatbot',
    image: '/bot.jpg',
    des: '/guide/3-su-dung-chatbot',
  },
  // {
  //   title: 'Hỗ trợ sử dụng Chatbot',
  //   image: '/bot.jpg',
  // },
];
export default function Page({ params }: { params: Promise<Params> }) {
  const { id } = use(params);

  if (id === '1-gioi-thieu') {
    return (
      <div>
        <div className='p-6 flex flex-col gap-10 mb-10 flex-wrap mx-auto'>
          <Card
            sx={{
              width: '100%',
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              image={"/huongdan.webp"}
              alt={"chatbot"}
              sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </Card>

          <div className='flex gap-2 items-center'>
            <WavingHandIcon className='text-yellow-500' />
            <p className='text-3xl text-[#2C2C2C] font-bold'>Xin chào!</p>
          </div>

          <div className='flex gap-2 items-center text-black'>
            <p className='text-2xl'>Cảm ơn quý khách hàng đã tin dùng:</p>
            <Link href={""} className='p-2 bg-blue-100 text-blue-500 rounded-md'>Đưa link web vào đây</Link>
          </div>


        </div>
        <h1 className='text-[#2C2C2C] text-3xl font-bold px-6'>Nội dung hướng dẫn:</h1>
        <div className='text-black max-w-7xl '>
          <div className='flex gap-10 mb-10 flex-wrap mx-auto'>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4,
                // justifyContent: 'center',
                padding: 4,
              }}
            >
              {cardData.map((item, idx) => (
                <Link href={`${item.des}`} key={idx} >
                  <Card
                    sx={{
                      width: 300,
                      height: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={{ height: 200, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}
                      >
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </Box>

          </div>
        </div>
      </div>
    );
  }


  if (id === '2.1-dang-ky') {
    return (
      <div className='text-black'>
        <div className='p-6 flex flex-col gap-10 mb-10'>

          {/* noi dung trang */}
          <section className='flex flex-col gap-6'>
            {/* 1 */}
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold text-[#2C2C2C]'>1.Đăng Ký</h1>
              <div className='flex gap-1'>
                <LockIcon className='text-yellow-500' />
                <p className='text-lg text-[#B3B3B3]'>HƯỚNG DẪN ĐĂNG KÝ TÀI KHOẢN AI CHATBOT</p>
              </div>
            </div>
            {/*  */}

            {/* 2 */}
            <div className='flex flex-col gap-2 justify-center items-center'>
              <Image src="/dangky.png" alt="dangky" width={500} height={400} style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 8 }} />
            </div>
            {/*  */}

            {/* b1 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Bước 1: Truy cập vào trang đăng ký</p>
                <div>
                  <p>Mở trình duyệt truy cập vào:</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

            {/* b2 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Bước 2: Nhập thông tin cá nhân</p>
                <p>Điền đầy đủ các thông tin như sau:</p>

                <div className=''>
                  <ul className="list-disc pl-5 space-y-3 text-lg text-gray-800 ">
                    <li>
                      <strong>Full Name <span className="font-normal">(Họ và tên)</span>:</strong> Nhập họ tên đầy đủ của bạn. <br />
                      <em className="text-gray-500">Ví dụ: John Smith</em>
                    </li>
                    <li>
                      <strong>Email Address <span className="font-normal">(Địa chỉ email)</span>:</strong> Nhập email hợp lệ. <br />
                      <em className="text-gray-500">Ví dụ: nguyenvana@example.com</em>
                    </li>
                    <li>
                      <strong>Password <span className="font-normal">(Mật khẩu)</span>:</strong> Tạo mật khẩu mạnh (nên có chữ hoa, chữ thường, số và ký tự đặc biệt).
                    </li>
                  </ul>

                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

            {/* b3 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Bước 3: Tạo tài khoản</p>
                <div>
                  <p>Nhấn vào nút <strong>“Đăng ký”</strong> để hoàn tất bước đăng ký.</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

            {/* b4 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Bước 4: Đăng nhập và sử dụng</p>
                <div className='flex flex-col gap-2'>
                  <p>Sau khi đăng ký tài khoản, hệ thống sẽ tự đưa bạn qua trang đăng nhập hoặc có thể truy cập qua:</p>
                  <div>
                    <ArrowRightAltIcon className='text-yellow-500' />
                    <a href={''} className='text-blue-600 hover:underline'>
                      Để đường dẫn trang đăng nhập vào đây vào đây
                    </a>
                  </div>
                  <p>Đăng nhập và bắt đầu trải nghiệm các tính năng của AI VLU Chatbot!</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

            {/* hotro */}
            <div>
              <div className='flex flex-col gap-2'>
                <p>Bạn cần hỗ trợ?</p>
                <div className='flex gap-1'>
                  <EmailIcon className='text-blue-500' />
                  <p>Gmail hỗ trợ : </p>
                  <a href="mailto:chatbotvlu@gmail.com" type='email' className='hover:text-blue-500'>chatbotvlu@gmail.com</a>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />


            {/* luu y */}
            <div>
              <div className='flex flex-col gap-2'>
                <div className='flex '>
                  <PushPinIcon className='text-red-500' />
                  <p>Lưu ý !</p>
                </div>
                <div className='flex gap-1'>
                  <ul className="list-disc pl-5 space-y-3 text-md text-gray-800 ">
                    <li>
                      <p>Mật khẩu phải có ít nhất là 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt để đảm bảo an toàn.</p>
                    </li>

                    <li>
                      <p>Email không được trùng với email đã tạo tài khoản trước đó.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </section>
          {/* end */}
        </div>
      </div>
    );
  }

  if (id === '2.2-dang-nhap') {
    return (
      <div className='text-black'>
        <div className='p-6 flex flex-col gap-10 mb-10'>

          {/* noi dung trang */}
          <section className='flex flex-col gap-4'>
            {/* 1 */}
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold text-[#2C2C2C]'>2.Đăng Nhập</h1>
              <div className='flex gap-1'>
                <KeyIcon className='text-yellow-500' />
                <p className='text-lg text-[#B3B3B3]'>HƯỚNG DẪN ĐĂNG NHẬP TÀI KHOẢN AI VLUCHATBOT</p>
              </div>
            </div>
            {/*  */}

            {/* 2 */}
            <div className='flex flex-col gap-2 justify-center items-center'>
              <Image src="/dangnhap.png" alt="dangnhap" width={500} height={400} style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 8 }} />
            </div>
            {/*  */}

            {/* b1 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Bước 1: Truy cập vào trang đăng ký</p>
                <div>
                  <p>Mở trình duyệt và truy cập vào đường dẫn để có thể vào trang đăng nhập:</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

            {/* b2 */}
            <div>
              <div className='flex flex-col gap-4'>
                <p className='text-xl font-bold text-dark-grey'>Bước 2: Chọn phương thức đăng nhập</p>
                <p>Bạn có thể chọn 1 trong 2 cách sau:</p>

                {/* cach1 */}
                <div className='flex flex-col '>
                  <ul className="list-disc pl-5 space-y-3 text-md text-gray-800 ">
                    <li>
                      <strong>Cách 1: Đăng nhập bằng Email & Mật khẩu</strong>
                      <div>
                        <ul className='list-decimal marker:text-gray-400 p-4 space-y-2 '>
                          <li className=' text-black'>Nhập <strong>Email</strong> đã đăng ký (VD: nguyenvana@gmail.com).</li>
                          <li className=' text-black'>Nhập <strong>Mật khẩu</strong> tương ứng.</li>
                          <li className=' text-black'>Nhấn nút <strong>“Đăng nhập”</strong></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <div className='flex gap-1'>
                    <LightbulbIcon className='text-yellow-400' />
                    <p>Nếu quên mật khẩu, hãy nhấp vào <strong>“Quên mật khẩu?”</strong> để khôi phục.</p>
                  </div>
                </div>
                <hr className='border-gray-300' />


                {/* cach2 */}
                <div>
                  <ul className="list-disc pl-5 text-md text-gray-800 ">
                    <li>
                      <strong>Cách 2: Đăng nhập bằng tài khoản Google</strong>
                      <div>
                        <ul className='list-disc marker:text-blue-400 p-4 '>
                          <li className=' text-black'>Nhấn vào Sign in with Google và làm theo các bước hướng dẫn xác thực</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

            {/* b3 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Bước 3: Hoàn tất đăng nhập</p>
                <div>
                  <p>Sau khi đăng nhập thành công, bạn sẽ được chuyển đến <strong>“giao diện chính”</strong> để bắt đầu sử dụng các tính năng AI VLUChatbot.</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

            {/* dangky, hotro */}
            <div>
              <div className='flex flex-col gap-2'>
                <p>Bạn chưa có tài khoản?</p>
                <div className='flex gap-1'>
                  <ArrowRightAltIcon className='text-yellow-500' />
                  <p>Nhấn vào <strong>“Create an account”</strong> để đăng ký miễn phí!</p>
                </div>
                <div className='flex gap-1'>
                  <EmailIcon className='text-blue-500' />
                  <p>Gmail hỗ trợ : </p>
                  <a href="mailto:chatbotvlu@gmail.com" type='email' className='hover:text-blue-500'>chatbotvlu@gmail.com</a>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />

          </section>
          {/* end */}
        </div>
      </div>
    );
  }

  if (id === '2.3-quen-mat-khau') {
    return (
      <div className='text-black'>
        <div className='p-6 flex flex-col gap-10 mb-10'>

          {/* noi dung trang */}
          <section className='flex flex-col gap-4'>
            {/* head */}
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold text-[#2C2C2C]'>3.Đổi và lấy lại mật khẩu</h1>
              <div className='flex gap-1'>
                <SyncAltIcon className='text-blue-500' />
                <p className='text-lg text-[#B3B3B3]'>HƯỚNG DẪN ĐỔI VÀ LẤY LẠI MẬT KHẨU TÀI KHOẢN AI VLUCHATBOT</p>
              </div>
            </div>
            {/*  */}

            {/* 2 */}



            {/* th1 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Trường hợp 1: Bạn vẫn còn nhớ mật khẩu mà vẫn muốn đổi mật khẩu</p>
                <div className='flex flex-col gap-2'>
                  <p>Mở trình duyệt và truy cập vào đường dẫn để có thể vào trang đổi mật khẩu</p>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <Image src="/changepass.png" alt="changepass" width={500} height={400} style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 8 }} />
                  </div>
                  <div className='flex gap-1'>
                    <PushPinIcon className='text-red-500' />
                    <p>Lưu ý ! ( Bạn phải đăng nhập để đổi mật khẩu )</p>
                  </div>

                </div>

                <ul className='list-decimal marker:text-gray-400 p-4 space-y-2 pl-12 '>
                  <li className=' text-black'>Nhập <strong>“Mật khẩu”</strong>chính xác với mật khẩu đã đăng ký.</li>
                  <li className=' text-black'>Nhập <strong>“Mật khẩu mới”</strong>.</li>
                  <li className=' text-black'>Nhập lại <strong>“Mật khẩu”</strong> đúng với mật khẩu bạn mới vừa nhập.</li>
                </ul>

                <p>Nhấn nút <strong>“Xác nhận đổi mật khẩu”</strong>.</p>
                <div className='flex gap-1'>
                  <CheckCircleIcon className='text-green-500' />
                  <p>Hệ thống đưa bạn về <strong>Trang chủ</strong> và mật khẩu đã được thay đổi</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />
            {/* end th1 */}

            {/* th2 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Trường hợp 2: Bạn không còn nhớ mật khẩu của tài khoản mà mình đã tạo</p>
                <div className='flex flex-col gap-2'>
                  <p>Mở trình duyệt và truy cập vào đường dẫn để có thể vào trang quên mật khẩu</p>
                  <div>
                    <ArrowRightAltIcon className='text-yellow-500' />
                    <a href={''} className='text-blue-600 hover:underline'>
                      Để đg dẫn vào đây
                    </a>
                  </div>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <Image src="/quenmk.png" alt="quenmk" width={500} height={400} style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 8 }} />
                  </div>
                  <div className='flex gap-1'>
                    <PushPinIcon className='text-red-500' />
                    <p>Lưu ý ! ( Bạn không cần đăng nhập để có thể thực hiện chức năng này)</p>
                  </div>

                </div>

                <ul className='list-decimal marker:text-gray-400 p-4 space-y-2 pl-12 '>
                  <li className=' text-black'>Nhập <strong>“Email”</strong> đúng với tài khoản bạn muốn đổi mật khẩu .</li>
                  <li className=' text-black'>Nhấn vào <strong>“GỬI MÃ ĐẶT LẠI MẬT KHẨU”</strong>.</li>
                </ul>

                <div className='flex gap-1'>
                  <InfoIcon className='text-blue-500' />
                  <p>Hệ thống đưa bạn về trang <strong>Đăng nhập</strong> và đồng thời hệ thống cũng gửi mật khẩu tạm thời qua email của bạn.</p>
                </div>
                <div className='flex gap-1'>
                  <InfoIcon className='text-blue-500' />
                  <p>Vui lòng đăng nhập bằng <strong>mật khẩu</strong> đã được hệ thống cấp tạm thời để có thể tới bước đổi mật khẩu.</p>
                </div>
                <div className='flex gap-1'>
                  <InfoIcon className='text-blue-500' />
                  <p>Hệ thống sẽ đưa bạn qua trang <strong>đổi mật khẩu</strong>. Vui lòng làm theo các chỉ dẫn ở trên <strong>Trường hợp 1.</strong></p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />
            {/* end th2 */}

          </section>
          {/* end */}
        </div>
      </div>
    );
  }

  if (id === '3-su-dung-chatbot') {
    return (
      <div className='text-black'>
        <div className='p-6 flex flex-col gap-10 mb-10'>
          {/* noi dung trang */}
          <section className='flex flex-col gap-4'>
            {/* head */}
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold text-[#2C2C2C]'>4.Hướng dẫn sử dụng chatbot</h1>
              <div className='flex gap-1'>
                <SyncAltIcon className='text-blue-500' />
                <p className='text-lg text-[#B3B3B3]'>HƯỚNG DẪN NGƯỜI DÙNG CHAT VỚI LẠI AI VLUCHATBOT</p>
              </div>
            </div>

            {/* th1 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Trường hợp 1: Đối với các bạn là học sinh muốn đăng ký vào học tại trường.</p>
                <div className='flex flex-col gap-2'>
                  <p>Mở trình duyệt và truy cập vào trang chủ thì bạn có thể thấy các thông tin của trường và mục <strong>“CHAT TUYỂN SINH”</strong></p>
                  <div>
                    <ArrowRightAltIcon className='text-yellow-500' />
                    <a href={'/'} className='text-blue-600 hover:underline'>
                      Trang Chủ
                    </a>
                  </div>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <Image src="/changepass.png" alt="chatbot" width={500} height={400} style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 8 }} />
                  </div>
                  <div className='flex gap-1'>
                    <PushPinIcon className='text-red-500' />
                    <p>Lưu ý ! ( Bạn phải đăng nhập để đổi mật khẩu )</p>
                  </div>

                </div>

                <ul className='list-decimal marker:text-gray-400 p-4 space-y-2 pl-12 '>
                  <li className=' text-black'>Nhập <strong>“Mật khẩu”</strong>chính xác với mật khẩu đã đăng ký.</li>
                  <li className=' text-black'>Nhập <strong>“Mật khẩu mới”</strong>.</li>
                  <li className=' text-black'>Nhập lại <strong>“Mật khẩu”</strong> đúng với mật khẩu bạn mới vừa nhập.</li>
                </ul>

                <p>Nhấn nút <strong>“Xác nhận đổi mật khẩu”</strong>.</p>
                <div className='flex gap-1'>
                  <CheckCircleIcon className='text-green-500' />
                  <p>Hệ thống đưa bạn về <strong>Trang chủ</strong> và mật khẩu đã được thay đổi</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />
            {/* end th1 */}

            {/* th2 */}
            <div>
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold text-dark-grey'>Trường hợp 2: Bạn không còn nhớ mật khẩu của tài khoản mà mình đã tạo</p>
                <div className='flex flex-col gap-2'>
                  <p>Mở trình duyệt và truy cập vào đường dẫn để có thể vào trang quên mật khẩu</p>
                  <div>
                    <ArrowRightAltIcon className='text-yellow-500' />
                    <a href={''} className='text-blue-600 hover:underline'>
                      Để đg dẫn vào đây
                    </a>
                  </div>
                  <div className='flex flex-col gap-2 justify-center items-center'>
                    <Image src="/quenmk.png" alt="quenmk" width={500} height={400} style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 8 }} />
                  </div>
                  <div className='flex gap-1'>
                    <PushPinIcon className='text-red-500' />
                    <p>Lưu ý ! ( Bạn không cần đăng nhập để có thể thực hiện chức năng này)</p>
                  </div>

                </div>

                <ul className='list-decimal marker:text-gray-400 p-4 space-y-2 pl-12 '>
                  <li className=' text-black'>Nhập <strong>“Email”</strong> đúng với tài khoản bạn muốn đổi mật khẩu .</li>
                  <li className=' text-black'>Nhấn vào <strong>“GỬI MÃ ĐẶT LẠI MẬT KHẨU”</strong>.</li>
                </ul>

                <div className='flex gap-1'>
                  <InfoIcon className='text-blue-500' />
                  <p>Hệ thống đưa bạn về trang <strong>Đăng nhập</strong> và đồng thời hệ thống cũng gửi mật khẩu tạm thời qua email của bạn.</p>
                </div>
                <div className='flex gap-1'>
                  <InfoIcon className='text-blue-500' />
                  <p>Vui lòng đăng nhập bằng <strong>mật khẩu</strong> đã được hệ thống cấp tạm thời để có thể tới bước đổi mật khẩu.</p>
                </div>
                <div className='flex gap-1'>
                  <InfoIcon className='text-blue-500' />
                  <p>Hệ thống sẽ đưa bạn qua trang <strong>đổi mật khẩu</strong>. Vui lòng làm theo các chỉ dẫn ở trên <strong>Trường hợp 1.</strong></p>
                </div>
              </div>
            </div>
            <hr className='border-gray-300' />


          </section>
          {/* end */}

        </div>
      </div>
    );
  }

  return <div className='text-black flex justify-center items-center min-h-screen'>Không có nội dung phù hợp</div>;
}
