import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  MapPin, 
  Info,
  Hash,
  ImageIcon,
  Users,
  CreditCard,
  Building,
  Award,
  Heart,
  Globe
} from 'lucide-react';

interface UserProfileViewProps {
  jobTrackState?: any;
  onNavigateToTab?: (tabId: string, subTabId?: string) => void;
}

export default function UserProfileView({ jobTrackState, onNavigateToTab }: UserProfileViewProps) {
  return (
    <div id="user-profile-view" className="space-y-6 text-left font-sans select-none animate-fade-in pb-10">
      
      {/* GENTLE UN-BOXED HEADER AVATAR SECTION */}
      <div className="flex items-center gap-6 py-2 px-3 select-none">
        {/* Rounded circular avatar */}
        <div className="w-16 h-16 rounded-full bg-[#0062ff] text-white flex items-center justify-center font-black text-2xl tracking-wide font-sans shadow-xs shrink-0 select-none">
          MT
        </div>

        {/* User identification info */}
        <div className="space-y-2 leading-none text-left">
          <div>
            <h2 className="text-[22px] font-black text-[#0d2f5c] tracking-tight font-sans">Minh Trần</h2>
            <p className="text-[13px] text-slate-600 font-bold font-sans mt-0.5">
              Backend Engineer (BE)
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="bg-[#ebf5ff] text-[#0062ff] border border-[#d6eaff] text-[10.5px] font-extrabold px-2 py-0.5 rounded-md tracking-wide font-sans shrink-0">
              L-2841
            </span>
            <span className="bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] text-[10.5px] font-extrabold px-2 py-0.5 rounded-md tracking-wide font-sans shrink-0">
              Onboarding
            </span>
          </div>
        </div>
      </div>

      {/* 2-COLUMN BOTTOM LAYOUT PROFILE SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* LEFT COLUMN: IDENTIFICATION, CONTACT, LEGAL DOCS */}
        <div className="flex flex-col gap-6">

          {/* Section 1: Thông tin định danh */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-4xs overflow-hidden">
            {/* Header bar - Clean blue consistent layout style */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f0f7ff]/80 border-b border-blue-50">
              <User className="w-4 h-4 text-[#0062ff] stroke-[2.25]" />
              <h3 className="font-extrabold text-[#0062ff] text-[13px] tracking-wide uppercase font-sans">
                Thông tin định danh
              </h3>
            </div>

            {/* List key-value */}
            <div className="divide-y divide-slate-100">
              
              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Họ và tên đầy đủ
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">Minh Trần</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Hash className="w-3.5 h-3.5 text-slate-400" /> Mã nhân sự
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans font-mono tracking-wider">L-2841</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" /> Ảnh đại diện
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans select-all">
                  Avatar_MinhTran.png
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> Giới tính
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">Nam</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Ngày sinh
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans font-mono">15/08/1998</span>
              </div>

            </div>
          </div>

          {/* Section 2: Thông tin liên lạc */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-4xs overflow-hidden">
            {/* Header bar - Consistent style & color as Section 1 */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f0f7ff]/80 border-b border-blue-50">
              <Mail className="w-4 h-4 text-[#0062ff] stroke-[2.25]" />
              <h3 className="font-extrabold text-[#0062ff] text-[13px] tracking-wide uppercase font-sans">
                Thông tin liên lạc
              </h3>
            </div>

            {/* List key-value */}
            <div className="divide-y divide-slate-100">

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email công ty
                </span>
                <a 
                  href="mailto:minh.tran@vndirect.com.vn" 
                  className="text-[13.5px] text-[#0062ff] font-extrabold font-sans hover:underline break-all"
                >
                  minh.tran@vndirect.com.vn
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Globe className="w-3.5 h-3.5 text-slate-400" /> Email cá nhân
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans break-all">
                  minhtran.bk@gmail.com
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Số điện thoại
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans font-mono select-all">
                  0912 345 678
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Địa chỉ thường trú
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">
                  Quận Bình Thạnh, TP. Hồ Chí Minh
                </span>
              </div>

            </div>
          </div>

          {/* Section 5: Thông tin khẩn cấp & bổ sung */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-4xs overflow-hidden">
            {/* Header bar - Consistent color */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f0f7ff]/80 border-b border-blue-50">
              <Heart className="w-4 h-4 text-[#0062ff] stroke-[2.25]" />
              <h3 className="font-extrabold text-[#0062ff] text-[13px] tracking-wide uppercase font-sans">
                Thông tin khẩn cấp & bổ sung
              </h3>
            </div>

            {/* List key-value */}
            <div className="divide-y divide-slate-100">

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Người liên hệ khẩn cấp
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">
                  Trần Quốc Anh (Bố)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> SĐT khẩn cấp
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans font-mono select-all">
                  0912 999 888
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: WORK INFO, EMERGENCY CONTACT */}
        <div className="flex flex-col gap-6">

          {/* Section 4: Thông tin công việc */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-4xs overflow-hidden">
            {/* Header bar - Consistent color */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f0f7ff]/80 border-b border-blue-50">
              <Briefcase className="w-4 h-4 text-[#0062ff] stroke-[2.25]" />
              <h3 className="font-extrabold text-[#0062ff] text-[13px] tracking-wide uppercase font-sans">
                Thông tin công việc
              </h3>
            </div>

            {/* List key-value */}
            <div className="divide-y divide-slate-100">

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Ngày vào công ty
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans font-mono">
                  06/04/2026
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> Văn phòng làm việc
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">
                  Saigon Tower
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> COE
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">
                  DTOS · OD-Finance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Award className="w-3.5 h-3.5 text-slate-400" /> FS
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">
                  Backend Engineer (BE)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Info className="w-3.5 h-3.5 text-slate-400" /> Trạng thái nhân sự
                </span>
                <span className="text-[13.5px] font-sans">
                  <strong className="text-[#0d2f5c] font-black">Đang hoạt động</strong>{" "}
                  <span className="text-slate-600 font-semibold">(Onboarding)</span>
                </span>
              </div>

            </div>
          </div>

          {/* Section 3: Giấy tờ pháp lý */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-4xs overflow-hidden">
            {/* Header bar - Consistent color */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f0f7ff]/80 border-b border-blue-50">
              <CreditCard className="w-4 h-4 text-[#0062ff] stroke-[2.25]" />
              <h3 className="font-extrabold text-[#0062ff] text-[13px] tracking-wide uppercase font-sans">
                Giấy tờ pháp lý
              </h3>
            </div>

            {/* List key-value */}
            <div className="divide-y divide-slate-100">

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" /> CCCD / CMND
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans font-mono select-all">
                  079098001234
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Ngày cấp CCCD
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans font-mono">
                  20/10/2021
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 px-4 items-center">
                <span className="text-[13px] text-slate-700 font-bold flex items-center gap-2 font-sans">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> Nơi cấp CCCD
                </span>
                <span className="text-[13.5px] text-[#0d2f5c] font-black font-sans">
                  Cục Cảnh sát QLHC về TTXH
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* FOOTER COOPERATIVE FOOTNOTE */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 flex gap-3 text-[12.5px] text-slate-600 leading-relaxed font-sans">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div>
          Hệ thống <strong>ESB Dynamic Service Blueprint Portal</strong> hoạt động theo cơ chế thời gian thực. Bất kỳ sự thay đổi hoặc bổ sung nào trong quá trình Khai báo Job Track sẽ được tự động cập nhật và đồng bộ lên Hồ sơ tổng thể trong vòng 24 giờ kể từ khi được Quản lý trực tiếp phê duyệt.
        </div>
      </div>

    </div>
  );
}
