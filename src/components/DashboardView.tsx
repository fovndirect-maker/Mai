import React, { useState } from 'react';
import { 
  Compass, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Circle, 
  ArrowRight, 
  Info,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  X,
  Target,
  ClipboardList,
  Puzzle,
  Gem
} from 'lucide-react';

interface DashboardViewProps {
  onNavigateToTab: (tabId: string, subTabId?: string) => void;
  jobTrackState?: any;
}

export default function DashboardView({ onNavigateToTab, jobTrackState }: DashboardViewProps) {
  // Modal state for task reviews
  const [activeReviewTask, setActiveReviewTask] = useState<{
    title: string;
    description: string;
    timeline: string;
    status: string;
  } | null>(null);

  // Active hover state for interactive central compass dial
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const compassCards = [
    {
      id: 'ilead',
      tag: 'iLEAD',
      tagBadge: 'D',
      title: 'La bàn Hiểu biết',
      subtitle: 'DEPTH · H · HEALTH',
      btnLabel: 'I · INTEGRATION',
      btnAction: 'Thấy đúng',
      desc1: 'Sự nghiệp • Thực tập',
      desc2: 'Trục đo: M/BMI - C/ICM',
      footerQuestion: 'Tôi đang trở thành ai?',
      headerBg: 'bg-[#506f86]', // Slate Blue matching Image 2
      brandColor: 'text-[#506f86]',
      color: '#506f86',
      bullets: ['Job Track', 'DEPTH Track'],
      iconType: 'target',
      subTab: 'jobtrack'
    },
    {
      id: 'dlink',
      tag: 'dLINK',
      tagBadge: 'C',
      title: 'La bàn Kết nối',
      subtitle: 'IPAX · W · WEALTH',
      btnLabel: 'P · PARTNERSHIP',
      btnAction: 'Thông đúng',
      desc1: 'Kết nối • Inner-Outer',
      desc2: 'Trục đo: Inner - Outer',
      footerQuestion: 'Tôi cần lực gì từ ai?',
      headerBg: 'bg-[#f18b1b]', // Vibrant Orange matching Image 2
      brandColor: 'text-[#f18b1b]',
      color: '#f18b1b',
      bullets: ['SOS: SM, FCM, OCM', 'Buddy', 'EPIC Partner (IC)'],
      iconType: 'puzzle',
      subTab: 'discussion'
    },
    {
      id: 'dwork',
      tag: 'dWORK',
      tagBadge: 'S',
      title: 'La bàn Hành động',
      subtitle: 'SPAN · W · WEALTH',
      btnLabel: 'A · ACCOUNTABILITY',
      btnAction: 'Cộng đúng',
      desc1: 'Công việc • Thực hành',
      desc2: 'Trục đo: JD (Responsible) - JDOT (Accountable)',
      footerQuestion: 'Tôi đang làm gì, scope nào?',
      headerBg: 'bg-[#16c79a]', // Emerald Green matching Image 2
      brandColor: 'text-[#16c79a]',
      color: '#16c79a',
      bullets: ['FC (TAC·KPI)', 'OC (CAT·OKR)'],
      iconType: 'checklist',
      subTab: 'depthtrack'
    },
    {
      id: 'daccount',
      tag: 'dAccount',
      tagBadge: 'P',
      title: 'La bàn Giá trị',
      subtitle: 'IDP · G · GROW',
      btnLabel: 'G · GREATNESS',
      btnAction: 'Kết quả đúng',
      desc1: 'Giá trị • 3P phát triển',
      desc2: 'Trục đo: 3P by HWG (H - W - G)',
      footerQuestion: 'Giá trị tôi tạo ra thế nào?',
      headerBg: 'bg-[#c39f68]', // Gold/Bronze matching Image 2
      brandColor: 'text-[#c39f68]',
      color: '#c39f68',
      bullets: ['Person', 'Performance', 'Position'],
      iconType: 'gem',
      subTab: 'idptrack'
    }
  ];

  const handleTaskClick = (taskKey: string) => {
    switch (taskKey) {
      case 'jobtrack':
        onNavigateToTab('ilead', 'jobtrack');
        break;
      case 'mentor':
        setActiveReviewTask({
          title: 'Mentor 1-1 tuần 6 chưa diễn ra',
          status: 'Quá hạn 2 ngày',
          timeline: 'Cần hoàn tất trước Chủ Nhật tuần này',
          description: 'Lịch trao đổi thông tin nghề nghiệp và rà soát định hướng phát triển bản thân trực tiếp (one-on-one) với Quản lý của bạn chưa được ghi nhận trên hệ thống.'
        });
        break;
      case 'ipax':
        setActiveReviewTask({
          title: 'Hoàn thành IPAX Round 2',
          status: 'Còn 3 ngày',
          timeline: 'Bắt đầu từ ngày 15/05',
          description: 'Học phần nâng cao kết nối thực tế doanh nghiệp giúp làm rõ bản phác thảo định vị năng lực & giá trị tích hợp.'
        });
        break;
      case 'bmi':
        setActiveReviewTask({
          title: 'Submit BMI self-assessment Q2',
          status: 'Còn 5 ngày',
          timeline: 'Thời hạn: 05/06/2026',
          description: 'Bản tự đánh giá chỉ số năng lực quản lý (Behavioral Match Index) tích hợp chu kỳ quý II năm 2026.'
        });
        break;
      case 'clinic':
        setActiveReviewTask({
          title: 'Book Clinic: Sales Mastery',
          status: 'Còn 7 ngày',
          timeline: 'Tháng 6/2026',
          description: 'Chuyên đề đào tạo thực hành thúc đẩy năng lực và tháo gỡ điểm nghẽn nghiệp vụ trực tiếp cùng Ban điều hành.'
        });
        break;
      default:
        break;
    }
  };

  return (
    <div id="dashboard-view" className="space-y-6 text-left font-sans">
      
      {/* HEADER BAR */}
      {/* ── 4 LA BAN COMPASS CONTAINER ── */}
      <div className="space-y-5 font-sans">
        
        {/* Banner header */}
        <div className="flex flex-col gap-2 md:gap-1.5 text-left">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-sans flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              HỆ THỐNG ĐỊNH VỊ SỰ NGHIỆP TOÀN DIỆN
            </span>
          </div>

          <div className="flex items-center gap-2 text-left">
            <Compass className="w-6 h-6 text-[#0062ff] stroke-[2.25] animate-spin-slow shrink-0" />
            <h2 className="text-[18px] md:text-[20px] font-black text-[#0d2f5c] tracking-tight font-sans leading-snug">
              Hệ thống 4 La Bàn Sự Nghiệp • EPIC Compass SBU
            </h2>
          </div>

          <p className="text-[13px] text-[#334155] leading-relaxed font-normal text-left">
            Bốn trụ cột chiến lược giúp VNDSers làm chủ năng lực chuyên môn, định hình lộ trình phát triển thông suốt, gắn kết lực lượng đồng hành, và vững vàng ghi nhận giá trị đóng góp tích hợp.
          </p>
        </div>

        {/* Dynamic Interactive Layout with central EPIC circular compass dial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
          
          {/* LEFT COLUMN: iLEAD & dLINK (4/12 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {compassCards.filter(c => c.id === 'ilead' || c.id === 'dlink').map((card) => {
              const IconComponent = card.iconType === 'target' ? Target : Puzzle;
              const isHovered = hoveredCard === card.id;
              
              return (
                <div 
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => {
                    if (card.id === 'ilead') {
                      onNavigateToTab('ilead', card.subTab);
                    } else {
                      onNavigateToTab(card.id);
                    }
                  }}
                  style={{ borderColor: isHovered ? card.color : '#e2e8f0' }}
                  className="group relative bg-white border rounded-2xl shadow-4xs hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-start min-h-[305px] text-left p-0 overflow-hidden select-none"
                >
                  {/* Full-width Header Tag Bar (sát box, flush top-left-right) */}
                  <div 
                    className="px-5 py-3 text-white flex items-center justify-between relative shadow-4xs font-sans shrink-0"
                    style={{ backgroundColor: card.color }}
                  >
                    <div className="flex items-center gap-2.5 font-sans overflow-hidden">
                      {/* Integrated white backdrop badge */}
                      <span className="w-6.5 h-6.5 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <IconComponent className="w-3.5 h-3.5 text-white" />
                      </span>
                      <span className="font-sans font-black text-[13.5px] uppercase tracking-wide shrink-0">
                        {card.tag}
                      </span>
                      <span className="opacity-40 text-[11px] font-sans">|</span>
                      <span className="text-[12.5px] font-extrabold text-slate-50 font-sans tracking-wide truncate">
                        {card.title}
                      </span>
                    </div>
                    <span className="text-amber-300 hover:text-amber-200 font-sans font-black text-[11px] tracking-wider shrink-0 bg-black/15 px-2 py-0.5 rounded-md">
                      {card.tagBadge}
                    </span>
                  </div>

                  {/* Card Main Body Grid with restored internal padding */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Centered Large Quotation Quote */}
                    <div className="text-center py-0.5">
                      <span className="text-[14px] font-extrabold text-[#0d2f5c] tracking-tight leading-snug font-sans italic block">
                        "{card.footerQuestion}"
                      </span>
                    </div>

                    {/* Bullets List inside dotted separator borders */}
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 border-t border-b border-dashed border-slate-100 font-sans text-[11.5px] font-bold text-slate-500 w-full">
                      {card.bullets.map((bullet, idx) => (
                        <span key={idx} className="flex items-center gap-1 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ backgroundColor: card.color }}></span>
                          <span>{bullet}</span>
                        </span>
                      ))}
                    </div>

                    {/* Action Tag Button Container */}
                    <div className="w-full bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center space-y-0.5 group-hover:bg-slate-100/50 transition-colors">
                      <strong className="text-[9.5px] font-black text-slate-400 tracking-wider block font-sans uppercase">
                        {card.btnLabel}
                      </strong>
                      <span className="text-[13px] font-black text-[#0d2f5c] block font-sans italic">
                        {card.btnAction}
                      </span>
                    </div>

                    {/* Footer Descs */}
                    <div className="text-center font-sans space-y-0.5 shrink-0">
                      <span className="text-[11.5px] text-[#4d5d76] font-extrabold tracking-tight block">
                        {card.desc1}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tight block font-mono">
                        {card.desc2}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MIDDLE COLUMN: EPIC COMPASS GRAPHIC DIAL (4/12 cols) - Hidden on Mobile, Premium Interaction on Large Screens */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center relative w-full h-[410px] select-none">
            
            {/* Visual labels on top of compass */}
            <div className="absolute top-1 text-center space-y-0.5 z-10">
              <span className="text-[11px] font-extrabold text-[#c39f68] uppercase tracking-[0.16em] font-sans block">
                4 La Bàn Định Hướng
              </span>
              <h3 className="text-[24px] font-black text-[#002868] tracking-widest uppercase font-sans leading-none block">
                EPIC Compass
              </h3>
            </div>

            {/* Central circular dial frame */}
            <div className="relative w-[300px] h-[300px] flex items-center justify-center rounded-full bg-slate-50/50 border border-slate-100 shadow-4xs mt-4">
              
              {/* Outer decorative gold scaling ring */}
              <div className="absolute inset-2 rounded-full border border-slate-100/80"></div>
              
              {/* Dashed circular ticks */}
              <div className="absolute inset-5 rounded-full border border-dashed border-slate-200/95 animate-spin-slow"></div>

              {/* Ultra polished SVG Compass Engine */}
              <svg className="w-[280px] h-[280px] relative z-10" viewBox="0 0 280 280">
                <defs>
                  {/* Premium soft drop-shadow for central elements */}
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodOpacity="0.14" />
                  </filter>
                  {/* Glossy radial sphere gradient for central knob cap */}
                  <radialGradient id="glossyCap" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="55%" stopColor="#f3f4f6" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </radialGradient>
                </defs>

                {/* Multiple Concentric background ticks & circles */}
                <circle cx="140" cy="140" r="128" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="140" cy="140" r="121" fill="none" stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.6" />
                <circle cx="140" cy="140" r="112" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                <circle cx="140" cy="140" r="95" fill="none" stroke="#ebdcb9" strokeWidth="0.8" strokeOpacity="0.45" />

                {/* Radial Fine Tick Scale (dots ring) */}
                <circle cx="140" cy="140" r="104" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="1 3.5" strokeOpacity="0.25" />

                {/* Subtle outer cross axes */}
                <line x1="140" y1="20" x2="140" y2="260" stroke="#ebdcb9" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="20" y1="140" x2="260" y2="140" stroke="#ebdcb9" strokeWidth="0.5" strokeOpacity="0.5" />

                {/* Outer colored quadrant arcs with hover thickness changes */}
                {/* 1. Top-Right (dWORK - Emerald Green) */}
                <path 
                  d="M 140 28 A 112 112 0 0 1 252 140" 
                  fill="none" 
                  stroke="#16c79a" 
                  strokeWidth={hoveredCard === 'dwork' ? '5.5' : '3'}
                  className="transition-all duration-300 opacity-90"
                />
                {/* 2. Bottom-Right (dAccount - Gold/Bronze) */}
                <path 
                  d="M 252 140 A 112 112 0 0 1 140 252" 
                  fill="none" 
                  stroke="#c39f68" 
                  strokeWidth={hoveredCard === 'daccount' ? '5.5' : '3'}
                  className="transition-all duration-300 opacity-90"
                />
                {/* 3. Bottom-Left (dLINK - Orange) */}
                <path 
                  d="M 140 252 A 112 112 0 0 1 28 140" 
                  fill="none" 
                  stroke="#f18b1b" 
                  strokeWidth={hoveredCard === 'dlink' ? '5.5' : '3'}
                  className="transition-all duration-300 opacity-90"
                />
                {/* 4. Top-Left (iLEAD - Slate Blue) */}
                <path 
                  d="M 28 140 A 112 112 0 0 1 140 28" 
                  fill="none" 
                  stroke="#506f86" 
                  strokeWidth={hoveredCard === 'ilead' ? '5.5' : '3'}
                  className="transition-all duration-300 opacity-90"
                />

                {/* Outer diagonal triangle arrowheads pointing OUTWARDS */}
                {/* Northeast Arrow (45 deg) */}
                <g transform="rotate(45 140 140)" className="transition-all duration-300">
                  <polygon 
                    points="140,11 133,23 147,23" 
                    fill="#16c79a" 
                    className={`transition-all duration-300 ${hoveredCard === 'dwork' ? 'scale-115 origin-center' : ''}`}
                  />
                </g>
                {/* Southeast Arrow (135 deg) */}
                <g transform="rotate(135 140 140)" className="transition-all duration-300">
                  <polygon 
                    points="140,11 133,23 147,23" 
                    fill="#c39f68" 
                    className={`transition-all duration-300 ${hoveredCard === 'daccount' ? 'scale-115 origin-center' : ''}`}
                  />
                </g>
                {/* Southwest Arrow (225 deg) */}
                <g transform="rotate(225 140 140)" className="transition-all duration-300">
                  <polygon 
                    points="140,11 133,23 147,23" 
                    fill="#f18b1b" 
                    className={`transition-all duration-300 ${hoveredCard === 'dlink' ? 'scale-115 origin-center' : ''}`}
                  />
                </g>
                {/* Northwest Arrow (315 deg) */}
                <g transform="rotate(315 140 140)" className="transition-all duration-300">
                  <polygon 
                    points="140,11 133,23 147,23" 
                    fill="#506f86" 
                    className={`transition-all duration-300 ${hoveredCard === 'ilead' ? 'scale-115 origin-center' : ''}`}
                  />
                </g>

                {/* Cardinal Directions letters indicator (N, S, W, E) */}
                <text x="140" y="44" textAnchor="middle" className="text-[10px] font-black font-mono fill-slate-400">N</text>
                <text x="140" y="244" textAnchor="middle" className="text-[10px] font-black font-mono fill-slate-400">S</text>
                <text x="44" y="143" textAnchor="middle" className="text-[10px] font-black font-mono fill-slate-400">W</text>
                <text x="238" y="143" textAnchor="middle" className="text-[10px] font-black font-mono fill-slate-400">E</text>

                {/* INNER LAYER 1: Light Silver Cardinal background helper needles (N, E, S, W) */}
                {/* North background needle */}
                <polygon points="140,140 134,140 140,72" fill="#f8fafc" />
                <polygon points="140,140 146,140 140,72" fill="#e2e8f0" />
                {/* East background needle */}
                <polygon points="140,140 140,134 208,140" fill="#f8fafc" />
                <polygon points="140,140 140,146 208,140" fill="#e2e8f0" />
                {/* South background needle */}
                <polygon points="140,140 134,140 140,208" fill="#e2e8f0" />
                <polygon points="140,140 146,140 140,208" fill="#f8fafc" />
                {/* West background needle */}
                <polygon points="140,140 140,134 72,140" fill="#e2e8f0" />
                <polygon points="140,140 140,146 72,140" fill="#f8fafc" />

                {/* INNER LAYER 2: Main primary colored diagonal needles pointing NE, SE, SW, NW */}
                {/* 1. Northwest Needle: iLEAD (Slate Blue) */}
                <g 
                  className="transition-all duration-300 cursor-pointer"
                  style={{ 
                    transform: hoveredCard === 'ilead' ? 'scale(1.08)' : 'scale(1)', 
                    transformOrigin: '140px 140px' 
                  }}
                >
                  <polygon points="140,140 135,145 80,80" fill="#506f86" />
                  <polygon points="140,140 145,135 80,80" fill="#3c5264" />
                </g>

                {/* 2. Northeast Needle: dWORK (Emerald Green) */}
                <g 
                  className="transition-all duration-300 cursor-pointer"
                  style={{ 
                    transform: hoveredCard === 'dwork' ? 'scale(1.08)' : 'scale(1)', 
                    transformOrigin: '140px 140px' 
                  }}
                >
                  <polygon points="140,140 135,135 200,80" fill="#16c79a" />
                  <polygon points="140,140 145,145 200,80" fill="#0f9a76" />
                </g>

                {/* 3. Southeast Needle: dAccount (Gold/Bronze) */}
                <g 
                  className="transition-all duration-300 cursor-pointer"
                  style={{ 
                    transform: hoveredCard === 'daccount' ? 'scale(1.08)' : 'scale(1)', 
                    transformOrigin: '140px 140px' 
                  }}
                >
                  <polygon points="140,140 145,135 200,200" fill="#c39f68" />
                  <polygon points="140,140 135,145 200,200" fill="#9e7f50" />
                </g>

                {/* 4. Southwest Needle: dLINK (Orange) */}
                <g 
                  className="transition-all duration-300 cursor-pointer"
                  style={{ 
                    transform: hoveredCard === 'dlink' ? 'scale(1.08)' : 'scale(1)', 
                    transformOrigin: '140px 140px' 
                  }}
                >
                  <polygon points="140,140 135,135 80,200" fill="#f18b1b" />
                  <polygon points="140,140 145,145 80,200" fill="#c86f0e" />
                </g>

                {/* Central highly glossy 3D sphere cap cap with shadow */}
                <circle cx="140" cy="140" r="11" fill="url(#glossyCap)" filter="url(#softShadow)" />
                <circle cx="137" cy="137" r="4.2" fill="#ffffff" opacity="0.65" />
              </svg>
            </div>

            {/* Central compass label underneath */}
            <div className="text-center mt-3 select-none">
              <span className="text-[12px] font-black text-slate-450 uppercase tracking-wider block">
                Bản đồ hằng ngày
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: dWORK & dAccount (4/12 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {compassCards.filter(c => c.id === 'dwork' || c.id === 'daccount').map((card) => {
              const IconComponent = card.iconType === 'checklist' ? ClipboardList : Gem;
              const isHovered = hoveredCard === card.id;
              
              return (
                <div 
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => {
                    if (card.id === 'dwork') {
                      onNavigateToTab('ilead', 'depthtrack');
                    } else if (card.id === 'daccount') {
                      onNavigateToTab('ilead', 'idptrack');
                    } else {
                      onNavigateToTab(card.id);
                    }
                  }}
                  style={{ borderColor: isHovered ? card.color : '#e2e8f0' }}
                  className="group relative bg-white border rounded-2xl shadow-4xs hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-start min-h-[305px] text-left p-0 overflow-hidden select-none"
                >
                  {/* Full-width Header Tag Bar (sát box, flush top-left-right) */}
                  <div 
                    className="px-5 py-3 text-white flex items-center justify-between relative shadow-4xs font-sans shrink-0"
                    style={{ backgroundColor: card.color }}
                  >
                    <div className="flex items-center gap-2.5 font-sans overflow-hidden">
                      {/* Integrated white backdrop badge */}
                      <span className="w-6.5 h-6.5 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <IconComponent className="w-3.5 h-3.5 text-white" />
                      </span>
                      <span className="font-sans font-black text-[13.5px] uppercase tracking-wide shrink-0">
                        {card.tag}
                      </span>
                      <span className="opacity-40 text-[11px] font-sans">|</span>
                      <span className="text-[12.5px] font-extrabold text-slate-50 font-sans tracking-wide truncate">
                        {card.title}
                      </span>
                    </div>
                    <span className="text-amber-300 hover:text-amber-200 font-sans font-black text-[11px] tracking-wider shrink-0 bg-black/15 px-2 py-0.5 rounded-md">
                      {card.tagBadge}
                    </span>
                  </div>

                  {/* Card Main Body Grid with restored internal padding */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Centered Large Quotation Quote */}
                    <div className="text-center py-0.5">
                      <span className="text-[14px] font-extrabold text-[#0d2f5c] tracking-tight leading-snug font-sans italic block">
                        "{card.footerQuestion}"
                      </span>
                    </div>

                    {/* Bullets List inside dotted separator borders */}
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 border-t border-b border-dashed border-slate-100 font-sans text-[11.5px] font-bold text-slate-500 w-full">
                      {card.bullets.map((bullet, idx) => {
                        const isdAccount = card.id === 'daccount';
                        return (
                          <span key={idx} className="flex items-center gap-1 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ backgroundColor: card.color }}></span>
                            <span>
                              {isdAccount ? (
                                <>
                                  <strong className="text-[#0d2f5c] font-black">P</strong>
                                  {bullet.substring(1)}
                                </>
                              ) : bullet}
                            </span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Action Tag Button Container */}
                    <div className="w-full bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center space-y-0.5 group-hover:bg-slate-100/50 transition-colors">
                      <strong className="text-[9.5px] font-black text-slate-400 tracking-wider block font-sans uppercase">
                        {card.btnLabel}
                      </strong>
                      <span className="text-[13px] font-black text-[#0d2f5c] block font-sans italic">
                        {card.btnAction}
                      </span>
                    </div>

                    {/* Footer Descs */}
                    <div className="text-center font-sans space-y-0.5 shrink-0">
                      <span className="text-[11.5px] text-[#4d5d76] font-extrabold tracking-tight block">
                        {card.desc1}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tight block font-mono">
                        {card.desc2}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ── LOWER GRID: NAC AND TO-DO TASKS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
        
        {/* LEFT COLUMN: NAC — Need-Attention-Care (6 cols) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-4xs space-y-5 lg:col-span-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              <span className="w-8.5 h-8.5 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                <Bell className="w-4.5 h-4.5 fill-orange-500 stroke-orange-600" />
              </span>
              <h3 className="font-black text-slate-850 text-[16px] tracking-tight font-sans">
                NAC — Need-Attention-Care
              </h3>
            </div>

            <div className="space-y-5 pt-3.5">
              {/* NEED Item */}
              <div className="flex items-start gap-3.5 text-left bg-rose-50/20 border border-rose-100/40 p-3 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-rose-50 text-rose-550 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 fill-rose-500 text-white" />
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider block font-sans">NEED</span>
                  <p className="text-[13px] text-slate-800 font-bold leading-snug">
                    Chốt 1 KH trước ngày 50
                  </p>
                </div>
              </div>

              {/* ATTENTION Item 1 */}
              <div className="flex items-start gap-3.5 text-left bg-amber-50/20 border border-amber-100/40 p-3 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5 fill-amber-500 text-white" />
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider block font-sans">ATTENTION</span>
                  <p className="text-[13px] text-slate-800 font-semibold leading-snug">
                    BMI self-assessment sắp đến hạn (5 ngày)
                  </p>
                </div>
              </div>

              {/* ATTENTION Item 2 */}
              <div className="flex items-start gap-3.5 text-left bg-amber-50/20 border border-amber-100/40 p-3 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5 fill-amber-500 text-white" />
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider block font-sans">ATTENTION</span>
                  <p className="text-[13px] text-slate-800 font-semibold leading-snug">
                    IPAX Round 2 cần hoàn thành
                  </p>
                </div>
              </div>

              {/* CARE Item */}
              <div className="flex items-start gap-3.5 text-left bg-emerald-50/20 border border-emerald-100/40 p-3 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block font-sans">CARE</span>
                  <p className="text-[13px] text-slate-800 font-semibold leading-snug">
                    IDP completion đạt 65% — on track
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: To-Do Tasks (6 cols) */}
        <div className="bg-white border border-slate-100/80 rounded-2xl p-5 md:p-6 shadow-4xs space-y-5 lg:col-span-6 flex flex-col justify-between h-full text-left font-sans">
          <div>
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100/70">
              <span className="w-8.5 h-8.5 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <CheckCircle2 className="w-4.5 h-4.5 fill-emerald-500 text-white" />
              </span>
              <h3 className="font-black text-slate-850 text-[16px] tracking-tight font-sans">
                To-Do Tasks
              </h3>
            </div>

            <div className="divide-y divide-slate-100/60 pt-1">
              
              {/* Task 1: Khai báo Job Track */}
              <div className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-start gap-3 text-left">
                  <span className="w-5 h-5 rounded-full border border-orange-300 flex items-center justify-center shrink-0 mt-0.5 text-orange-500 font-extrabold text-[10px]">
                    !
                  </span>
                  <div className="leading-tight">
                    <h4 className="text-[13.5px] font-black text-[#0d2f5c] tracking-tight">Khai báo Job Track</h4>
                    <p className="text-[11.5px] text-orange-600 italic font-medium mt-0.5">Cần hoàn thành khẩn cấp</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTaskClick('jobtrack')}
                  className="bg-[#f08535] hover:bg-[#df7423] text-white font-extrabold text-[11.5px] px-4 py-2 rounded-xl transition cursor-pointer shadow-3xs hover:shadow-2xs leading-none"
                >
                  Thực hiện
                </button>
              </div>

              {/* Task 2: Mentor 1-1 */}
              <div className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-start gap-3 text-left">
                  <span className="w-5 h-5 rounded-full border border-rose-300 flex items-center justify-center shrink-0 mt-0.5 text-rose-500 font-bold text-xs">
                    !
                  </span>
                  <div className="leading-tight">
                    <h4 className="text-[13.5px] font-black text-[#0d2f5c] tracking-tight">Mentor 1-1 tuần 6 chưa diễn ra</h4>
                    <p className="text-[11.5px] text-rose-500 font-medium mt-0.5">Quá hạn 2 ngày</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTaskClick('mentor')}
                  className="border border-slate-200 text-slate-600 hover:bg-slate-55 font-bold text-[11.5px] px-3.5 py-1.5 rounded-xl transition cursor-pointer bg-white leading-none"
                >
                  Review
                </button>
              </div>

              {/* Task 3: IPAX Round 2 */}
              <div className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-start gap-3 text-left">
                  <span className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <h4 className="text-[13.5px] font-black text-[#0d2f5c] tracking-tight">Hoàn thành IPAX Round 2</h4>
                    <p className="text-[11.5px] text-slate-400 font-medium mt-0.5">Còn 3 ngày</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTaskClick('ipax')}
                  className="border border-slate-200 text-slate-600 hover:bg-slate-55 font-bold text-[11.5px] px-3.5 py-1.5 rounded-xl transition cursor-pointer bg-white leading-none"
                >
                  Review
                </button>
              </div>

              {/* Task 4: Submit BMI Assessment */}
              <div className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-start gap-3 text-left">
                  <span className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <h4 className="text-[13.5px] font-black text-[#0d2f5c] tracking-tight">Submit BMI self-assessment Q2</h4>
                    <p className="text-[11.5px] text-slate-400 font-medium mt-0.5">Còn 5 ngày</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTaskClick('bmi')}
                  className="border border-slate-200 text-slate-600 hover:bg-slate-55 font-bold text-[11.5px] px-3.5 py-1.5 rounded-xl transition cursor-pointer bg-white leading-none"
                >
                  Review
                </button>
              </div>

              {/* Task 5: Book Clinic */}
              <div className="flex items-center justify-between py-3 gap-3 justify-self-stretch">
                <div className="flex items-start gap-3 text-left">
                  <span className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <h4 className="text-[13.5px] font-black text-[#0d2f5c] tracking-tight">Book Clinic: Sales Mastery</h4>
                    <p className="text-[11.5px] text-slate-400 font-medium mt-0.5">Còn 7 ngày</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTaskClick('clinic')}
                  className="border border-slate-200 text-slate-600 hover:bg-slate-55 font-bold text-[11.5px] px-3.5 py-1.5 rounded-xl transition cursor-pointer bg-white leading-none"
                >
                  Review
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ── MODAL POPUP FOR DETAILS ── */}
      {activeReviewTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setActiveReviewTask(null)}
          />
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 relative z-10 shadow-xl space-y-4.5 animate-scale-up font-sans text-left">
            
            <button
              onClick={() => setActiveReviewTask(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-black uppercase tracking-wider font-sans">
                {activeReviewTask.status}
              </div>
              <h3 className="text-lg font-black text-[#0d2f5c] leading-snug font-sans pt-1">
                {activeReviewTask.title}
              </h3>
            </div>

            <hr className="border-t border-slate-100" />

            <div className="space-y-3">
              <strong className="text-[11px] font-black text-slate-450 uppercase tracking-widest block font-sans">MÔ TẢ CHI TIẾT NGHIỆP VỤ</strong>
              <p className="text-[13px] text-slate-600 leading-relaxed font-sans">
                {activeReviewTask.description}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100/80 rounded-xl flex items-center gap-2.5 text-xs text-slate-550 font-medium">
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{activeReviewTask.timeline}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex gap-3 text-xs justify-end">
              <button
                onClick={() => setActiveReviewTask(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold font-sans cursor-pointer transition text-xs"
              >
                Đóng lại
              </button>
              <button
                onClick={() => {
                  setActiveReviewTask(null);
                  if (activeReviewTask.title.includes('Job Track')) {
                    onNavigateToTab('ilead', 'jobtrack');
                  } else {
                    alert('Nghiệp vụ liên đới đã được kích hoạt, vui lòng kiểm tra sau!');
                  }
                }}
                className="bg-[#0077ed] hover:bg-[#0064c7] text-white px-4.5 py-2.5 rounded-xl font-black font-sans cursor-pointer transition text-xs"
              >
                Thực hiện ngay
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
