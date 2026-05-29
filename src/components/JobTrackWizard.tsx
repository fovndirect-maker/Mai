import React, { useState } from 'react';
import { 
  ChevronDown, CheckCircle2, Circle, 
  Hourglass, Lightbulb, Send, Home, Info, Search, 
  TrendingUp, Users, Briefcase, Layers, Check, Edit2, Play, Calendar, UserCheck,
  Network, Award, Lock
} from 'lucide-react';
import { SupervisorManager, JobTrackData } from '../types';
import { SUPERVISOR_MANAGERS, CAREER_TRACK_HIERARCHY, FUNCTIONAL_DOMAINS } from '../data';

interface JobTrackWizardProps {
  state: JobTrackData;
  onChange: (newState: JobTrackData) => void;
  onGoToDashboard: () => void;
}

export default function JobTrackWizard({ state, onChange, onGoToDashboard }: JobTrackWizardProps) {
  // Local state for UI dropdowns
  const [isSmOpen, setIsSmOpen] = useState(false);
  const [isCtOpen, setIsCtOpen] = useState(false);
  const [isFdOpen, setIsFdOpen] = useState(false);
  const [isFsOpen, setIsFsOpen] = useState(false);

  // Filter only Non-IT SMs
  const availableSMs = SUPERVISOR_MANAGERS.filter(sm => sm.sbu === 'Non-IT');

  // Change handlers
  const handleSelectSM = (sm: SupervisorManager) => {
    onChange({ ...state, sm });
    setIsSmOpen(false);
  };

  const handleSelectCT = (ct: string) => {
    onChange({
      ...state,
      careerTrack: ct,
      functionalDomain: null,
      functionSpecialty: null,
      span: null
    });
    setIsCtOpen(false);
  };

  const handleSelectFD = (fd: string) => {
    onChange({
      ...state,
      functionalDomain: fd,
      functionSpecialty: null,
      span: null
    });
    setIsFdOpen(false);
  };

  const handleSelectFS = (fs: string) => {
    onChange({
      ...state,
      functionSpecialty: fs,
      span: 'S2' // Auto assign standard Developing track experience
    });
    setIsFsOpen(false);
  };

  const handleSelectSpan = (span: string) => {
    onChange({ ...state, span });
  };

  const handleReflectionChange = (field: 'reason' | 'currentView' | 'goal12Months', value: string) => {
    onChange({
      ...state,
      selfReflection: {
        ...state.selfReflection,
        [field]: value
      }
    });
  };

  const handleSubmit = () => {
    onChange({
      ...state,
      submitted: true,
      submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('vi-VN')
    });
  };

  const handleResetSubmit = () => {
    onChange({
      ...state,
      submitted: false
    });
  };

  const isFormValid = state.sm && state.careerTrack && state.functionalDomain && state.functionSpecialty;

  // Render Submitted / Pending Approval view
  if (state.submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs text-center space-y-6">
        <div className="max-w-md mx-auto space-y-4">
          
          <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-500 animate-pulse">
            <Hourglass className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Khai báo Job Track thành công!</h2>
            <p className="text-sm text-slate-500">
              Hồ sơ đã tự động được gửi và ghim trên dLink của Quản lý <strong className="text-slate-800 font-bold">{state.sm?.name || 'SM'}</strong>.
            </p>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed bg-slate-50 p-3.5 rounded-xl">
            SM của bạn có thời hạn tối đa <strong className="text-slate-800 font-semibold">48 giờ làm việc</strong> để nhấn "Co-Sign" ghi nhận. Đây là hành động ghi nhận Supervisor đã nắm được kế hoạch và sẵn sàng hỗ trợ, hoàn toàn không mang tính đánh giá chấm điểm thử việc khắt khe.
          </div>

        </div>

        {/* Realistic interactive flow timeline inside iLEAD */}
        <div className="max-w-md mx-auto border-t border-slate-100 pt-6 space-y-4 text-left">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tiến trình xét duyệt liên hoàn</h4>
          
          <div className="relative pl-6 space-y-5 before:absolute before:left-1.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-slate-200">
            
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-[23px] w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">IC đã nộp phiếu xác nhận Job Track</h5>
                <p className="text-[11px] text-slate-400">Thời gian: {state.submittedAt || 'Hôm nay'}</p>
              </div>
            </div>

            <div className="relative flex items-start gap-3">
              <div className="absolute -left-[23px] w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-ping"></div>
              <div className="absolute -left-[23px] w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white"></div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">Chờ SM co-sign (Kí ghi nhận)</h5>
                <p className="text-[11px] text-slate-400">Thông báo đã gửi qua email nội bộ & hệ thống dLink Chat</p>
              </div>
            </div>

            <div className="relative flex items-start gap-3 opacity-55">
              <div className="absolute -left-[23px] w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white"></div>
              <div>
                <h5 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                  Mở khóa Depth Track <span className="text-[9px] font-bold bg-slate-200 text-slate-500 px-1 py-0.2 rounded-sm uppercase tracking-wide">Khóa</span>
                </h5>
                <p className="text-[11px] text-slate-400">Kiểm tra khung năng lực chi tiết của {state.functionSpecialty || 'chuyên môn'}</p>
              </div>
            </div>

            <div className="relative flex items-start gap-3 opacity-55">
              <div className="absolute -left-[23px] w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white"></div>
              <div>
                <h5 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                  Mở khóa Thiết lập IDP quý <span className="text-[9px] font-bold bg-slate-200 text-slate-500 px-1 py-0.2 rounded-sm uppercase tracking-wide">Khóa</span>
                </h5>
                <p className="text-[11px] text-slate-400">Hoàn thiện lộ trình học tập, đào tạo thực chiến hàng tháng</p>
              </div>
            </div>

          </div>
        </div>

        {/* Quick links */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
          <button
            onClick={handleResetSubmit}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 text-xs font-bold transition"
          >
            <Edit2 className="w-3.5 h-3.5" /> Xem & Chỉnh sửa lại
          </button>
          <button
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Home className="w-3.5 h-3.5" /> Về trang chủ Dashboard
          </button>
        </div>

      </div>
    );
  }

  // Render unified setup form
  const selectedFdObj = FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain);

  return (
    <div className="space-y-6">
      
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-8">
        
        {/* Dynamic Warning Alert */}
        <div className="bg-indigo-50 border border-indigo-200/60 rounded-xl p-4 flex gap-3 text-sm text-indigo-800 leading-relaxed">
          <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            Chào Minh Trần, hệ thống xác nhận bạn thuộc SBU: <strong className="text-indigo-900 font-bold">Non-IT (DMS Sync)</strong>. Hãy hoàn tất khai báo 3 cấu phần quan trọng bên dưới để hệ thống khởi sinh tệp IDP phát triển chuyên môn phù hợp nhất.
          </div>
        </div>

        {/* Supervisor/Manager Selector block (Step 0) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Người duyệt đồng hành trực tiếp (SM)</h3>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-0.5">Lựa chọn Supervisor / Manager nhận báo cáo học tập</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSmOpen(!isSmOpen);
                  setIsCtOpen(false);
                  setIsFdOpen(false);
                  setIsFsOpen(false);
                }}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-left flex items-center justify-between text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100 ${
                  state.sm ? 'border-indigo-600 text-slate-900 font-semibold bg-indigo-50/10' : 'border-slate-200 text-slate-400'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {state.sm ? (
                    <>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-[10px] ${state.sm.avatarBg}`}>
                        {state.sm.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <span className="font-bold text-slate-800">{state.sm.name}</span>
                      <span className="text-xs text-[#525d7e] font-normal">• {state.sm.role} ({state.sm.branch})</span>
                    </>
                  ) : (
                    'Chọn Quản lý (SM) tiếp nhận lộ trình của bạn...'
                  )}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {isSmOpen && (
                <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto py-1">
                  {availableSMs.map((sm) => (
                    <button
                      key={sm.id}
                      type="button"
                      onClick={() => handleSelectSM(sm)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-sm border-b border-slate-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs ${sm.avatarBg}`}>
                          {sm.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{sm.name}</div>
                          <div className="text-xs text-[#626d9c] font-medium">{sm.role} · {sm.branch}</div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                        {sm.sbu}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PHẦN 1: CAREER TRACK (CT) */}
        <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              {state.careerTrack ? (
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-black flex items-center justify-center font-mono">
                  1
                </div>
              )}
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">PHẦN 1: CAREER TRACK (CT)</h3>
            </div>
            {state.careerTrack && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> Đã hoàn tất
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-0.5 block">Lộ trình Career Track ban đầu</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCtOpen(!isCtOpen);
                  setIsSmOpen(false);
                  setIsFdOpen(false);
                  setIsFsOpen(false);
                }}
                className={`w-full px-4 py-3.5 bg-white border rounded-xl text-left flex items-center justify-between text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-150 ${
                  state.careerTrack 
                    ? 'border-indigo-600 border-l-[5px] text-slate-900 font-semibold shadow-xs' 
                    : 'border-slate-200 text-slate-400 hover:border-slate-350'
                }`}
              >
                <div className="flex items-center gap-3">
                  {state.careerTrack ? (
                    <>
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {CAREER_TRACK_HIERARCHY[state.careerTrack]?.abbr || 'CT'}
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-slate-800 text-sm block leading-none mb-1">{state.careerTrack}</span>
                        <span className="text-slate-400 font-semibold text-[11px] block truncate max-w-[280px] sm:max-w-[450px] lg:max-w-[600px]">
                          {CAREER_TRACK_HIERARCHY[state.careerTrack]?.description}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-slate-400 font-medium">Chọn định hướng Career Track ban đầu của bạn...</span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isCtOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>

              {isCtOpen && (
                <div className="absolute z-30 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-72 overflow-y-auto py-1.5 divide-y divide-slate-100">
                  {Object.keys(CAREER_TRACK_HIERARCHY).map((ctName) => {
                    const item = CAREER_TRACK_HIERARCHY[ctName];
                    const isSelected = state.careerTrack === ctName;
                    
                    // Specific helper labels matching background
                    const labelStyle = 
                      ctName === 'Product Design' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                      ctName === 'Solution Engineer' ? 'bg-sky-50 text-sky-700 border-sky-100' :
                      ctName === 'Technology Enablement' ? 'bg-teal-50 text-teal-750 border-teal-100' :
                      ctName === 'Direct Client' ? 'bg-amber-50 text-amber-800 border-amber-100' :
                      ctName === 'Professional Specialist' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      ctName === 'Capability Guardian' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      'bg-slate-100 text-slate-800 border-slate-200';

                    return (
                      <button
                        key={ctName}
                        type="button"
                        onClick={() => handleSelectCT(ctName)}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-sm ${
                          isSelected ? 'bg-indigo-50/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0 pr-4">
                          <div className={`w-9 h-9 rounded-lg border font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${labelStyle}`}>
                            {item.abbr}
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-900 truncate">{ctName}</div>
                            <div className="text-[11px] text-slate-450 font-medium leading-normal mt-0.5">{item.description}</div>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] shadow-xs shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PHẦN 2: FUNCTIONAL DOMAIN (FD) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              {!state.careerTrack ? (
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-350 text-xs font-semibold flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
              ) : state.functionalDomain ? (
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-black flex items-center justify-center font-mono">
                  2
                </div>
              )}
              <Network className={`w-5 h-5 ${state.careerTrack ? 'text-orange-500' : 'text-slate-300'}`} />
              <h3 className={`font-extrabold text-sm uppercase tracking-wide ${state.careerTrack ? 'text-slate-900' : 'text-slate-400'}`}>
                PHẦN 2: FUNCTIONAL DOMAIN (FD)
              </h3>
            </div>
            {state.functionalDomain && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> Đã hoàn tất
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-widest pl-0.5 block ${state.careerTrack ? 'text-slate-500' : 'text-slate-350'}`}>
              Lĩnh vực hoạt động chuyên môn (FD)
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={!state.careerTrack}
                onClick={() => {
                  setIsFdOpen(!isFdOpen);
                  setIsSmOpen(false);
                  setIsCtOpen(false);
                  setIsFsOpen(false);
                }}
                className={`w-full px-4 py-3.5 border rounded-xl text-left flex items-center justify-between text-sm transition-all focus:outline-none ${
                  !state.careerTrack 
                    ? 'bg-slate-100/50 border-slate-105 text-slate-400 cursor-not-allowed opacity-75' 
                    : state.functionalDomain 
                    ? 'border-orange-550 border-l-[5px] bg-white text-slate-900 font-semibold shadow-xs' 
                    : 'border-slate-200 hover:border-slate-350 text-slate-400 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {state.functionalDomain ? (
                    <>
                      <div className="w-8 h-8 rounded-lg bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain)?.abbr || 'FD'}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 text-sm block leading-none mb-1">{state.functionalDomain}</span>
                        <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded-sm">
                          {FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain)?.category} Segment
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-slate-405 font-medium">
                      {state.careerTrack 
                        ? 'Chọn Functional Domain chuyên môn...' 
                        : 'Mở khóa tự động sau khi hoàn tất chọn Career Track...'
                      }
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isFdOpen ? 'rotate-180 text-orange-550' : ''}`} />
              </button>

              {isFdOpen && state.careerTrack && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-72 overflow-y-auto py-1.5 divide-y divide-slate-100">
                  {FUNCTIONAL_DOMAINS.map((fd) => {
                    const isSelected = state.functionalDomain === fd.name;
                    return (
                      <button
                        key={fd.abbr}
                        type="button"
                        onClick={() => handleSelectFD(fd.name)}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-sm post-selected ${
                          isSelected ? 'bg-orange-50/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <span className="w-8 h-8 rounded-lg bg-slate-55 border border-slate-200 text-slate-700 font-black text-xs flex items-center justify-center shrink-0 font-mono">
                            {fd.abbr}
                          </span>
                          <div className="min-w-0">
                            <p className="font-extrabold text-slate-900 truncate leading-tight">{fd.name}</p>
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase mt-1 inline-block bg-slate-50 border px-1.5 py-0.2 rounded-sm tracking-wider">
                              {fd.category} Group
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] shadow-xs shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PHẦN 3: FUNCTION SPECIALTY (FS) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              {!state.functionalDomain ? (
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-350 text-xs font-semibold flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
              ) : state.functionSpecialty ? (
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-5 border border-emerald-250 text-emerald-600 text-xs font-black flex items-center justify-center font-mono">
                  3
                </div>
              )}
              <Award className={`w-5 h-5 ${state.functionalDomain ? 'text-emerald-500' : 'text-slate-300'}`} />
              <h3 className={`font-extrabold text-sm uppercase tracking-wide ${state.functionalDomain ? 'text-slate-900' : 'text-slate-400'}`}>
                PHẦN 3: FUNCTION SPECIALTY (FS)
              </h3>
            </div>
            {state.functionSpecialty && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> Đã hoàn tất
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-widest pl-0.5 block ${state.functionalDomain ? 'text-slate-500' : 'text-slate-350'}`}>
              Phân khúc / Nghiệp vụ Chuyên môn (Specialty)
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={!state.functionalDomain}
                onClick={() => {
                  setIsFsOpen(!isFsOpen);
                  setIsSmOpen(false);
                  setIsCtOpen(false);
                  setIsFdOpen(false);
                }}
                className={`w-full px-4 py-3.5 border rounded-xl text-left flex items-center justify-between text-sm transition-all focus:outline-none ${
                  !state.functionalDomain 
                    ? 'bg-slate-100/50 border-slate-105 text-slate-400 cursor-not-allowed opacity-75' 
                    : state.functionSpecialty 
                    ? 'border-emerald-600 border-l-[5px] bg-white text-slate-900 font-semibold shadow-xs' 
                    : 'border-slate-200 hover:border-slate-350 text-slate-400 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {state.functionSpecialty ? (
                    <>
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        FS
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 text-sm block leading-none mb-1">{state.functionSpecialty}</span>
                        <span className="text-slate-400 font-semibold text-[11px] block text-ellipsis overflow-hidden">
                          Chuyên môn sâu thuộc lĩnh vực {state.functionalDomain}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-slate-405 font-medium">
                      {state.functionalDomain 
                        ? 'Chọn Phân khúc Chuyên môn tương ứng...' 
                        : 'Mở khóa tự động sau khi hoàn tất chọn Functional Domain...'
                      }
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isFsOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {isFsOpen && state.careerTrack && state.functionalDomain && selectedFdObj && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-72 overflow-y-auto py-1.5 divide-y divide-slate-100">
                  {selectedFdObj.specialties.map((spec) => {
                    const isSelected = state.functionSpecialty === spec;
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => handleSelectFS(spec)}
                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-sm ${
                          isSelected ? 'bg-emerald-50/10' : ''
                        }`}
                      >
                        <span className="font-extrabold text-slate-800">{spec}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] shadow-xs shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PHẦN 4: SOI CHIẾU BẢN THÂN (Self-Reflection) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">PHẦN 4: SOI CHIẾU BẢN THÂN (SELF-REFLECTION)</h3>
          </div>

          <div className="space-y-5">
            {/* Question 1 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">1</span>
                Điều gì thúc đẩy lớn nhất khiến tôi quyết định chọn định hướng phân khúc này?
                <span className="text-xs font-normal text-slate-400">(Tùy chọn)</span>
              </label>
              <textarea
                value={state.selfReflection.reason}
                onChange={(e) => handleReflectionChange('reason', e.target.value)}
                rows={3}
                placeholder="Ví dụ: Tôi thấy hứng thú đặc biệt với lớp tài sản rủi ro và muốn thiết kế các bản kế hoạch tài chính toàn diện giúp khách hàng bảo vệ tài sản gia đình vững chãi..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium placeholder-slate-400 leading-relaxed"
              />
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">2</span>
                Hiện tại, tôi tự nhận định mình đang gặp khó khăn hay thiếu hụt kiến thức gì nhiều nhất?
                <span className="text-xs font-normal text-slate-400">(Tùy chọn)</span>
              </label>
              <textarea
                value={state.selfReflection.currentView}
                onChange={(e) => handleReflectionChange('currentView', e.target.value)}
                rows={3}
                placeholder="Ví dụ: Tôi nắm vững lý thuyết kinh tế vĩ mô nhưng còn yếu kinh nghiệm bơi thực tế trong các đợt phát hành hợp đồng bảo hiểm hoặc thiết kế giải pháp may đo cho nhóm siêu giàu..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium placeholder-slate-400 leading-relaxed"
              />
            </div>

            {/* Question 3 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">3</span>
                Đâu là hình mẫu chuyên môn tôi mong ước đạt tới trong 12 tháng tới đây?
                <span className="text-xs font-normal text-slate-400">(Tùy chọn)</span>
              </label>
              <textarea
                value={state.selfReflection.goal12Months}
                onChange={(e) => handleReflectionChange('goal12Months', e.target.value)}
                rows={3}
                placeholder="Ví dụ: Đạt chứng chỉ chuyên nghiệp CFA level 1 hoặc có khả năng tư vấn giải pháp quản lý tài sản độc lập, không cần quản lý đi kèm..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium placeholder-slate-400 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: XÁC NHẬN & SUBMIT ACTION CARD */}
        <div className="pt-6 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Gửi phiếu lộ trình nghề nghiệp</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                Vui lòng đảm bảo các thông số gán SM, CT, FD và Specialty đã hoàn tất điền đúng. Hệ thống sẽ ngay lập tức kích hoạt các tài nguyên học tương ứng của bạn.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-indigo-500/10 text-center flex-shrink-0"
            >
              <Send className="w-4 h-4" /> Gửi SM Kí xác nhận
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
