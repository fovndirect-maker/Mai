import React, { useState } from 'react';
import { 
  LayoutDashboard, GraduationCap, Rocket, GitBranch, TrendingUp, 
  Wrench, BookOpen, Bell, Settings, Search, Sparkles, MoreVertical, CheckCircle, Info, Calendar, ArrowUpRight
} from 'lucide-react';
import { ActiveSidebarItem, ActiveSubTab, JobTrackData } from './types';
import OnboardingView from './components/OnboardingView';
import JobTrackWizard from './components/JobTrackWizard';
import DepthTrackView from './components/DepthTrackView';
import IDPTrackView from './components/IDPTrackView';

const INITIAL_JOB_TRACK_STATE: JobTrackData = {
  careerTrack: null,
  functionalDomain: null,
  functionSpecialty: null,
  span: null,
  sm: null,
  selfReflection: {
    reason: '',
    currentView: '',
    goal12Months: ''
  },
  submitted: false,
  submittedAt: null
};

export default function App() {
  const [activeSidebar, setActiveSidebar] = useState<ActiveSidebarItem>('ilead');
  const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>('jobtrack');
  const [jobTrackState, setJobTrackState] = useState<JobTrackData>(INITIAL_JOB_TRACK_STATE);
  const [notifications, setNotifications] = useState(3);

  // Trigger from Onboarding straight into Job Track tab
  const handleStartJobTrack = () => {
    setActiveSubTab('jobtrack');
  };

  // Trigger from Step 5 finish back to dashboard
  const handleGoToDashboard = () => {
    setActiveSidebar('dashboard');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      
      {/* ──────────────── SIDEBAR ──────────────── */}
      <aside className="w-60 bg-[#1e2330] text-slate-300 flex flex-col justify-between flex-shrink-0 border-r border-[#2d3345] shadow-lg">
        <div>
          {/* ESB Header (Replaces DSB logo) */}
          <div className="px-6 py-5 border-b border-[#2d3345] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20 tracking-wider">
              E
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-wide leading-none">ESB</div>
              <div className="text-[10px] text-slate-400 font-semibold mt-1">Dynamic Service Blueprint</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6">
            
            {/* Section 1: LA BÀN */}
            <div className="space-y-1.5 animate-fade-in">
              <div className="px-2.5 text-[9px] uppercase font-bold tracking-widest text-[#525a70]">
                La Bàn
              </div>
              
              <button
                onClick={() => {
                  setActiveSidebar('dashboard');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'hover:bg-[#252b3b] hover:text-white text-slate-400'
                }`}
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setActiveSidebar('ilead');
                  // Triggering "iLead" will reveal the 4 horizontal tabs as requested
                  setActiveSubTab('jobtrack');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSidebar === 'ilead'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'hover:bg-[#252b3b] hover:text-white text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4.5 h-4.5" />
                  <span>iLead</span>
                </div>
              </button>

              <button
                onClick={() => setActiveSidebar('dwork')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'dwork'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'hover:bg-[#252b3b] hover:text-white text-slate-400'
                }`}
              >
                <Rocket className="w-4.5 h-4.5" />
                <span>dWork</span>
              </button>

              <button
                onClick={() => setActiveSidebar('dlink')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'dlink'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'hover:bg-[#252b3b] hover:text-white text-slate-400'
                }`}
              >
                <GitBranch className="w-4.5 h-4.5" />
                <span>dLink</span>
              </button>

              <button
                onClick={() => setActiveSidebar('daccount')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'daccount'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'hover:bg-[#252b3b] hover:text-white text-slate-400'
                }`}
              >
                <TrendingUp className="w-4.5 h-4.5" />
                <span>dAccount</span>
              </button>
            </div>

            {/* Section 2: CÔNG CỤ */}
            <div className="space-y-1.5">
              <div className="px-2.5 text-[9px] uppercase font-bold tracking-widest text-[#525a70]">
                Công cụ
              </div>

              <button
                onClick={() => setActiveSidebar('toolbox')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'toolbox'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'hover:bg-[#252b3b] hover:text-white text-slate-400'
                }`}
              >
                <Wrench className="w-4.5 h-4.5" />
                <span>Toolbox</span>
              </button>

              <button
                onClick={() => setActiveSidebar('library')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'library'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'hover:bg-[#252b3b] hover:text-white text-slate-400'
                }`}
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>Library</span>
              </button>
            </div>

          </nav>
        </div>

        {/* Footer Profile Segment (Matches screenshot context) */}
        <div className="p-4 border-t border-[#2d3345] bg-[#191d29]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center shadow-inner flex-shrink-0">
                MT
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Minh Trần</div>
                <div className="text-[10px] text-slate-400 font-medium truncate">IC · Squad 04</div>
              </div>
            </div>
            
            <button className="p-1.5 hover:bg-[#252b3b] rounded-lg text-slate-400 hover:text-white transition cursor-pointer">
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ──────────────── MAIN WORKSPACE CONTAINER ──────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOPBAR (Custom styled with searchable lead client bar as in image) */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 gap-6">
          
          {/* Centered robust Search field matching image layout */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng, lead, sản phẩm..."
              className="w-full bg-slate-100 border border-transparent rounded-full py-2 pl-9 pr-12 text-xs text-slate-600 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-colors"
            />
            <div className="absolute right-3 top-2 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[9px] text-[#868da5] font-bold tracking-wider font-mono">
              ⌘K
            </div>
          </div>

          {/* Action icon buttons right */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative" title="AI Assistant Suggestions">
              <Sparkles className="w-4 h-4" />
            </button>

            <button 
              onClick={() => {
                setNotifications(0);
              }}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative" 
              title="Thông báo"
            >
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </button>

            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Cấu hình hệ thống">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 4 HORIZONTAL NAVIGATION TABS (Visible when 'iLead' on sidebar is active) */}
        {activeSidebar === 'ilead' && (
          <div className="bg-white border-b border-slate-200 px-6 flex items-center flex-shrink-0 overflow-x-auto">
            {[
              { id: 'onboarding', label: 'Onboarding' },
              { id: 'jobtrack', label: 'Job Track' },
              { id: 'depthtrack', label: 'Depth Track' },
              { id: 'idptrack', label: 'IDP Track' }
            ].map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as ActiveSubTab)}
                  className={`px-5 py-4 text-xs font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer -mb-px ${
                    isActive 
                      ? 'text-blue-600 border-blue-600 font-extrabold' 
                      : 'text-slate-400 hover:text-slate-700 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* MAIN BODY AREA SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* 1. MAIN CO-SIGNABLE ILEAD TEMPLATES */}
          {activeSidebar === 'ilead' && (
            <div className="space-y-6">
              
              {/* Domain Caption & Title section (Matches image layout) */}
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-widest text-blue-600 flex items-center gap-1.5">
                  <span>iLead</span>
                  <span>·</span>
                  <span className="text-slate-400">{activeSubTab === 'onboarding' ? 'Onboarding' : activeSubTab === 'jobtrack' ? 'Job Track' : activeSubTab === 'depthtrack' ? 'Depth Track' : 'IDP Track'}</span>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {activeSubTab === 'onboarding' && 'Thông tin Nhập môn (Onboarding)'}
                  {activeSubTab === 'jobtrack' && 'Job Track'}
                  {activeSubTab === 'depthtrack' && 'Chiều sâu Chuyên môn'}
                  {activeSubTab === 'idptrack' && 'Kế hoạch IDP'}
                </h1>
              </div>

              {/* Sub components conditional block */}
              <div className="animate-fade-in">
                {activeSubTab === 'onboarding' && (
                  <OnboardingView onStartJobTrack={handleStartJobTrack} />
                )}

                {activeSubTab === 'jobtrack' && (
                  <JobTrackWizard 
                    state={jobTrackState} 
                    onChange={(newState) => setJobTrackState(newState)}
                    onGoToDashboard={handleGoToDashboard} 
                  />
                )}

                {activeSubTab === 'depthtrack' && (
                  <DepthTrackView 
                    selectedSpecialty={jobTrackState.functionSpecialty} 
                    selectedSpan={jobTrackState.span}
                    onGoToJobTrack={handleStartJobTrack} 
                  />
                )}

                {activeSubTab === 'idptrack' && (
                  <IDPTrackView />
                )}
              </div>

            </div>
          )}

          {/* 2. OTHER SIDEBAR ITEMS FALLBACKS */}
          {activeSidebar !== 'ilead' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  {activeSidebar === 'dashboard' && <LayoutDashboard className="w-8 h-8" />}
                  {activeSidebar === 'dwork' && <Rocket className="w-8 h-8" />}
                  {activeSidebar === 'dlink' && <GitBranch className="w-8 h-8" />}
                  {activeSidebar === 'daccount' && <TrendingUp className="w-8 h-8" />}
                  {activeSidebar === 'toolbox' && <Wrench className="w-8 h-8" />}
                  {activeSidebar === 'library' && <BookOpen className="w-8 h-8" />}
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-800 capitalize">
                    Phần {activeSidebar} (ESB Live Portal)
                  </h2>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Đây là cổng tóm tắt nghiệp vụ liên đới của hệ thống quản lý Blueprint trực quan mới của tập đoàn.
                  </p>
                </div>

                {activeSidebar === 'dashboard' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                    <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Lớp Đã Đăng ký</span>
                      <div className="text-xl font-black text-slate-800">4 Khóa</div>
                    </div>
                    <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tiến độ Thử việc</span>
                      <div className="text-xl font-black text-emerald-600">40% Hoàn thành</div>
                    </div>
                    <div className="p-4 bg-slate-50 border rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Supervisor Gán</span>
                      <div className="text-xs font-bold text-slate-800 truncate">{jobTrackState.sm?.name || 'Chưa gán'}</div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="text-slate-400 flex items-center gap-1">
                    <Info className="w-4 h-4 text-blue-500" /> Click vào "iLead" bên thanh Menu để thực hiện tiếp tiến trình Job Track của bạn.
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveSidebar('ilead');
                      setActiveSubTab('jobtrack');
                    }}
                    className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Vào iLead <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* SBU Context Note */}
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex gap-3 text-xs text-slate-500 leading-normal">
                <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  Hệ thống <strong>ESB Dynamic Service Blueprint</strong> luôn bảo mật thông tin các SBU phân rã. Bạn đang đăng nhập dưới tệp tài khoản <strong>Đại diện Thử việc Non-IT (Minh Trần)</strong>.
                </div>
              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}
