import React, { useState } from 'react';
import { 
  ShieldCheck, Layers, Clock, UserCheck, FileText, 
  AlertTriangle, CheckCircle2, SlidersHorizontal, Search, Info,
  Calendar, Bell, Award, Lock, Unlock, BadgeCheck
} from 'lucide-react';
import { JobTrackData } from '../types';

interface IGGovernanceViewProps {
  state: JobTrackData;
}

interface NotificationItem {
  id: string;
  name: string;
  personId: string;
  initials: string;
  avatarBg: string;
  badgeType: 'pending' | 'review' | 'acknowledged';
  badgeLabel: string;
  badgeCls: string;
  dotColor?: string;
  textBlock: React.ReactNode;
  contentQuote?: {
    label: string;
    text: string;
    borderColorCls: string;
  };
  igQuote?: {
    label: string;
    text: string;
    borderColorCls: string;
  };
  pills?: Array<{
    label: string;
    cls: string;
  }>;
  footerTimestamps: string[];
}

export default function IGGovernanceView({ state }: IGGovernanceViewProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'review' | 'acknowledged'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Initial State Database of notifications from picture 2 and image records
  const baseNotifications: NotificationItem[] = [
    {
      id: "N-201",
      name: "Trần Anh",
      personId: "L-2811",
      initials: "TA",
      avatarBg: "bg-amber-500 text-white",
      badgeType: "review",
      badgeLabel: "Cần xem xét thêm",
      badgeCls: "bg-orange-50 text-[#d97706] border-orange-200",
      textBlock: (
        <span>
          SM <strong className="text-slate-900 font-extrabold">Lê Khánh</strong> đề nghị <strong className="text-amber-600 font-extrabold">xem xét thêm</strong> đề xuất Co-sign Job Track: <strong className="text-[#002868] font-black font-mono">SE × IPAG × CS × SOC</strong>
        </span>
      ),
      contentQuote: {
        label: "Nội dung:",
        text: "SM đề nghị review thêm: Cần rà soát độ cân bằng của kỹ năng Security Operation Engineer với Career path hiện tại.",
        borderColorCls: "border-amber-500 bg-amber-50/20"
      },
      igQuote: {
        label: "Kết quả xử lý IG:",
        text: "IG đã cross-check & duyệt thông qua. Kỹ năng Security Operation Engineer của Trần Anh hoàn toàn khớp với định hướng phát triển Client-facing bảo mật của nhóm.",
        borderColorCls: "border-emerald-500 bg-emerald-50/25 text-slate-800"
      },
      footerTimestamps: ["SM gửi: 24/05/2026 · 14:15"]
    },
    {
      id: "N-202",
      name: "Lê Trang",
      personId: "L-2856",
      initials: "LT",
      avatarBg: "bg-[#0b5499] text-white",
      badgeType: "pending",
      badgeLabel: "Chờ ghi nhận",
      badgeCls: "bg-orange-50 text-orange-600 border-orange-200",
      dotColor: "bg-amber-500",
      textBlock: (
        <span>
          SM <strong className="text-slate-900 font-extrabold font-sans">Lê Khánh</strong> đã co-sign Job Track: <strong className="text-[#002868] font-black font-mono">SE × BIS × SWE × BE</strong>
        </span>
      ),
      pills: [
        { label: "CT • SE — Solution Engineer", cls: "bg-blue-50 text-[#0062ff] border-blue-100" },
        { label: "FD • SWE — Software Engineering", cls: "bg-orange-50 text-orange-600 border-orange-100" },
        { label: "FS • BE — Backend Engineer", cls: "bg-rose-50 text-rose-600 border-rose-100" }
      ],
      footerTimestamps: [
        "SM duyệt: Hôm nay · 09:24",
        "IG nhận: Hôm nay · 09:42"
      ]
    },
    {
      id: "N-203",
      name: "Minh Trần",
      personId: "L-2841",
      initials: "MT",
      avatarBg: "bg-[#0b5499] text-white",
      badgeType: "pending",
      badgeLabel: "Chờ ghi nhận",
      badgeCls: "bg-orange-50 text-orange-600 border-orange-200",
      dotColor: "bg-amber-500",
      textBlock: (
        <span>
          SM <strong className="text-slate-900 font-extrabold">Lê Khánh</strong> đã co-sign Job Track: <strong className="text-[#002868] font-black font-mono">PD × BIS × SWE × BE</strong>
        </span>
      ),
      pills: [
        { label: "CT • PD — Product Design", cls: "bg-blue-50 text-[#0062ff] border-blue-100" },
        { label: "FD • SWE — Software Engineering", cls: "bg-orange-50 text-orange-600 border-orange-100" },
        { label: "FS • BE — Backend Engineer", cls: "bg-rose-50 text-rose-600 border-rose-100" }
      ],
      footerTimestamps: [
        "SM duyệt: Hôm nay · 08:30",
        "IG nhận: Hôm nay · 08:45"
      ]
    },
    {
      id: "N-204",
      name: "Phạm Linh",
      personId: "L-2790",
      initials: "PL",
      avatarBg: "bg-[#0bab87] text-white",
      badgeType: "acknowledged",
      badgeLabel: "Đã ghi nhận",
      badgeCls: "bg-emerald-50 text-emerald-600 border-emerald-200",
      textBlock: (
        <span>
          SM <strong className="text-slate-900 font-extrabold">Phạm Thị Hồng</strong> đã co-sign Job Track: <strong className="text-[#002868] font-black font-mono">DC × GTM × P&D × PM</strong>
        </span>
      ),
      pills: [
        { label: "CT • DC — Data Consultant", cls: "bg-blue-50 text-[#0062ff] border-blue-100" },
        { label: "FD • GTM — Go To Market", cls: "bg-orange-50 text-orange-600 border-orange-100" },
        { label: "FS • PM — Product Manager", cls: "bg-[#e2fbf1] text-emerald-700 border-emerald-100" }
      ],
      footerTimestamps: ["SM duyệt: 28/05/2026 · 17:33", "IG ghi nhận: 28/05/2026 · 18:10"]
    },
    {
      id: "N-205",
      name: "Nguyễn Hoàng Minh",
      personId: "L-2812",
      initials: "HM",
      avatarBg: "bg-slate-500 text-white",
      badgeType: "acknowledged",
      badgeLabel: "Đã ghi nhận",
      badgeCls: "bg-emerald-50 text-emerald-600 border-emerald-200",
      textBlock: (
        <span>
          SM <strong className="text-slate-900 font-extrabold">Lê Khánh</strong> đã co-sign Job Track: <strong className="text-[#002868] font-black font-mono">SE × BIS × P&D × PM</strong>
        </span>
      ),
      pills: [
        { label: "CT • SE — Solution Engineer", cls: "bg-blue-50 text-[#0062ff] border-blue-100" },
        { label: "FS • PM — Product Manager", cls: "bg-[#e2fbf1] text-emerald-700 border-emerald-100" }
      ],
      footerTimestamps: ["SM duyệt: 27/05/2026 · 09:12", "IG ghi nhận: 27/05/2026 · 10:05"]
    },
    {
      id: "N-206",
      name: "Ngô Hải",
      personId: "L-2815",
      initials: "NH",
      avatarBg: "bg-teal-700 text-white",
      badgeType: "acknowledged",
      badgeLabel: "Đã ghi nhận",
      badgeCls: "bg-emerald-50 text-emerald-600 border-emerald-200",
      textBlock: (
        <span>
          SM <strong className="text-slate-900 font-extrabold font-sans">Nguyễn Anh Minh</strong> đã co-sign Job Track: <strong className="text-[#002868] font-black font-mono">PS × BIS × D&AI × DE</strong>
        </span>
      ),
      pills: [
        { label: "CT • PS — Plat System", cls: "bg-blue-50 text-[#0062ff] border-blue-100" },
        { label: "FS • DE — DevOps Engineer", cls: "bg-rose-50 text-rose-600 border-rose-100" }
      ],
      footerTimestamps: ["SM duyệt: 26/05/2026 · 11:45", "IG ghi nhận: 26/05/2026 · 12:40"]
    }
  ];

  // 2. Compute dynamic live co-sign log if the current user models something live and sends it!
  const liveLogs: NotificationItem[] = [];
  if (state.submitted) {
    const ctAbbr = state.careerTrack === "Product Design" ? "PD" : state.careerTrack === "Solution Engineer" ? "SE" : "CT";
    const fdAbbr = state.functionalDomain ? (state.functionalDomain.includes("Phần mềm") ? "SWE" : "FD") : "FD";
    const fsAbbr = state.functionSpecialty ? state.functionSpecialty.split(" — ")[0] : "FS";
    const fullSpecName = state.functionSpecialty || "Chưa thiết lập";

    const isLiveCosigned = state.cosigned || false;
    const isLiveRejected = state.smStatus === 'rejected';

    const liveBadgeType = isLiveCosigned ? 'acknowledged' : (isLiveRejected ? 'review' : 'pending');
    const liveBadgeLabel = isLiveCosigned ? 'Đã ghi nhận' : (isLiveRejected ? 'Cần xem xét thêm' : 'Chờ ghi nhận');
    const liveBadgeCls = isLiveCosigned 
      ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
      : (isLiveRejected ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-orange-50 text-orange-600 border-orange-200 animate-pulse");

    liveLogs.push({
      id: "N-LIVE",
      name: "Minh Trần",
      personId: "L-2841",
      initials: "MT",
      avatarBg: "bg-[#0b5499] text-white",
      badgeType: liveBadgeType,
      badgeLabel: liveBadgeLabel,
      badgeCls: liveBadgeCls,
      dotColor: isLiveCosigned ? undefined : "bg-amber-500",
      textBlock: (
        <span>
          SM <strong className="text-slate-900 font-extrabold">{state.sm?.name || "Lê Khánh"}</strong> {isLiveCosigned ? 'đã đồng co-sign' : (isLiveRejected ? 'đề nghị rà soát' : 'đã co-sign')} Job Track: <strong className="text-[#002868] font-black font-mono">{ctAbbr} × BIS × {fdAbbr} × {fsAbbr}</strong>
        </span>
      ),
      pills: [
        { label: `CT • ${ctAbbr} — ${state.careerTrack}`, cls: "bg-blue-50 text-[#0062ff] border-blue-100" },
        { label: `FS • ${fsAbbr} — ${fullSpecName}`, cls: "bg-rose-50 text-rose-600 border-rose-100" }
      ],
      contentQuote: isLiveRejected || !isLiveCosigned ? {
        label: "Nội dung phản hồi / Lời phê của SM:",
        text: state.smFeedback || "Cần đồng bộ với kế hoạch phát triển 12 tháng dWORK trước khi co-sign hoàn tất.",
        borderColorCls: "border-amber-500 bg-amber-50/20"
      } : undefined,
      footerTimestamps: [
        `SM duyệt: ${state.submittedAt ? state.submittedAt.split(' - ')[0] : 'Hôm nay'} · ${state.submittedAt ? state.submittedAt.split(' - ')[1] || '09:12' : '09:12'}`,
        `IG nhận: Hôm nay · vừa xong`
      ]
    });
  }

  // Combine live draft and historical audit trails
  const allNotifications = [...liveLogs, ...baseNotifications];

  // Apply filters
  const filteredNotifications = allNotifications.filter(item => {
    // Search query matching
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.personId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;

    // Direct filter selection
    if (filter === 'pending') return item.badgeType === 'pending';
    if (filter === 'review') return item.badgeType === 'review';
    if (filter === 'acknowledged') return item.badgeType === 'acknowledged';
    return true;
  });

  // Calculate counters to match picture text
  const counts = {
    all: allNotifications.length,
    pending: allNotifications.filter(l => l.badgeType === 'pending').length,
    review: allNotifications.filter(l => l.badgeType === 'review').length,
    acknowledged: allNotifications.filter(l => l.badgeType === 'acknowledged').length,
  };

  return (
    <div className="space-y-4.5">
      
      {/* 4 KPI Cards Grid styled like the "đội ngũ trực thuộc" cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Mới hôm nay */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 stroke-[2.25]" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-sans">Mới hôm nay</span>
          </div>
          <div className="mt-2.5 text-left">
            <div className="text-[24px] font-black text-slate-900 leading-none font-sans">2</div>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Job Track sau SM duyệt</span>
          </div>
        </div>

        {/* Card 2: Tuần này */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 stroke-[2.25]" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-sans">Tuần này</span>
          </div>
          <div className="mt-2.5 text-left">
            <div className="text-[24px] font-black text-slate-900 leading-none font-sans">6</div>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Tổng notification</span>
          </div>
        </div>

        {/* Card 3: Chờ ghi nhận */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#d97706] flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 stroke-[2.25]" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-sans">Chờ ghi nhận</span>
          </div>
          <div className="mt-2.5 text-left">
            <div className="text-[24px] font-black text-slate-900 leading-none font-sans">2</div>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Chưa acknowledge</span>
          </div>
        </div>

        {/* Card 4: Đã ghi nhận */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#0062ff] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.25]" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-sans">Đã ghi nhận</span>
          </div>
          <div className="mt-2.5 text-left">
            <div className="text-[24px] font-black text-slate-900 leading-none font-sans">4</div>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Đã cross-check</span>
          </div>
        </div>
      </div>

      {/* Audit Logs Filter Component - Styled perfectly from image 2 */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-3xs p-3 flex flex-col md:flex-row items-center justify-between gap-3 font-sans select-none">
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {[
            { id: 'all' as const, label: 'Tất cả', count: counts.all },
            { id: 'pending' as const, label: 'Chờ ghi nhận', count: counts.pending },
            { id: 'review' as const, label: 'Cần xem xét thêm', count: counts.review },
            { id: 'acknowledged' as const, label: 'Đã ghi nhận', count: counts.acknowledged },
          ].map(btn => {
            const isAct = filter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilter(btn.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-2.5 font-sans ${
                  isAct 
                    ? "bg-[#0077ed] text-white border-[#0077ed]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {btn.label}
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${isAct ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'}`}>{btn.count}</span>
              </button>
            );
          })}
        </div>

        {/* Right Info Indicator */}
        <div className="flex items-center gap-1.5 text-slate-450 max-w-sm text-right self-start md:self-center">
          <Info className="w-4 h-4 text-slate-400 shrink-0 stroke-[2.25]" />
          <span className="text-[11px] text-slate-500 font-medium text-left leading-tight">
            IG chỉ nhận & ghi nhận – không can thiệp biểu quyết SM.
          </span>
        </div>
      </div>

      {/* Notification stream layout exactly matching Image 2 */}
      <div className="space-y-4">
        
        {/* Stream Header */}
        <div className="flex items-center gap-2 px-1 select-none">
          <Bell className="w-4.5 h-4.5 text-blue-600 fill-blue-100 stroke-[2]" />
          <h3 className="text-sm font-extrabold text-[#324157] font-sans">
            Stream thông báo ({filteredNotifications.length})
          </h3>
        </div>

        {/* Steam Feed List */}
        <div className="space-y-4 font-sans text-left">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => {
              return (
                <div key={item.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-3xs flex text-left relative overflow-hidden transition-all hover:bg-slate-50/15 group">
                  
                  {/* Left Column Accent Line & Avatar with indicator dot */}
                  <div className="flex flex-col items-center pl-1 pr-4 shrink-0 relative">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full font-black text-xs ${item.avatarBg} flex items-center justify-center shadow-3xs`}>
                        {item.initials}
                      </div>
                      
                      {/* Orange online/status dot on the right corner of avatar as pictured */}
                      {item.dotColor && (
                        <span className={`absolute -top-0.5 -right-0.5 w-3 h-3 ${item.dotColor} border-2 border-white rounded-full`}></span>
                      )}
                    </div>
                    {/* Vertical guideline */}
                    <div className="w-0.5 flex-1 bg-slate-100/60 group-hover:bg-slate-200/50 my-2 transition" />
                  </div>

                  {/* Main Content Info Block */}
                  <div className="flex-1 space-y-3 min-w-0">
                    
                    {/* Header: Name, MS, & Action Status badge aligned */}
                    <div className="flex items-center justify-between gap-4 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#0d2f5c] text-[15px] hover:text-[#0062ff] transition-colors">
                          {item.name}
                        </span>
                        <span className="bg-slate-100 text-slate-500 text-[9.5px] px-1.5 py-0.5 font-bold rounded-md font-mono">
                          {item.personId}
                        </span>
                      </div>
                      
                      {/* Custom Badge Pill from screen 2 */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${item.badgeCls}`}>
                        {item.badgeLabel}
                      </span>
                    </div>

                    {/* Announcement Sentence text body */}
                    {item.textBlock && (
                      <p className="text-[13px] text-[#324157] font-semibold tracking-tight leading-normal font-sans">
                        {item.textBlock}
                      </p>
                    )}

                    {/* Optional Section 1: Content quote styled with warm orange left border */}
                    {item.contentQuote && (
                      <div className={`p-3.5 border-l-4 rounded-r-xl text-left shadow-4xs ${item.contentQuote.borderColorCls}`}>
                        <strong className="text-[11px] font-black text-orange-600 block uppercase tracking-widest mb-1">
                          {item.contentQuote.label}
                        </strong>
                        <p className="text-[12px] text-slate-600 font-semibold italic leading-relaxed">
                          "{item.contentQuote.text}"
                        </p>
                      </div>
                    )}

                    {/* Optional Section 3: Capsule pills for Job Tracks */}
                    {item.pills && item.pills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.pills.map((p, idx) => (
                          <span key={idx} className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-normal border font-mono ${p.cls}`}>
                            {p.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Time footer segment */}
                    <div className="flex flex-wrap items-center gap-4 pt-1 text-[10.5px] text-slate-400 font-semibold font-sans">
                      {item.footerTimestamps.map((time, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-350" />
                          <span>{time}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="bg-white border border-slate-200/80 p-12 text-center rounded-2xl italic space-y-2 select-none">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto stroke-[1.5]" />
              <div className="font-extrabold text-xs text-slate-600 uppercase tracking-wider pt-2">Không tìm thấy thông báo</div>
              <p className="text-[11px] text-slate-400 not-italic font-medium max-w-sm mx-auto leading-relaxed">
                Hãy thử kiểm tra lại liên đới bộ lọc tìm kiếm của bạn.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Ledger Context Guarantee Info Banner */}
      <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex gap-3 text-xs text-slate-500 leading-normal select-none">
        <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
        <div className="text-left font-sans">
          Mục an ninh IG - GOVERNANCE tuân thủ nghiêm ngặt chuẩn ISO 27001. Hệ thống ghi nhật ký bất biến (Immutable), không một thực thể hệ thống nào được can thiệp sửa đổi hoặc xóa bỏ lịch sử đồng thuận của Quản lý trực tiếp (SM).
        </div>
      </div>
      
    </div>
  );
}
