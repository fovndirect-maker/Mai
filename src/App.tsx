import React, { useState } from 'react';
import { 
  LayoutGrid, GraduationCap, Rocket, Network, TrendingUp, 
  Wrench, BookOpen, Bell, Settings, Search, Sparkles, MoreVertical, Info, ArrowUpRight,
  PanelLeftClose, PanelLeftOpen, LogOut, ShieldCheck, Users, Menu
} from 'lucide-react';
import { ActiveSidebarItem, ActiveSubTab, JobTrackData } from './types';
import OnboardingView from './components/OnboardingView';
import JobTrackWizard from './components/JobTrackWizard';
import DepthTrackView from './components/DepthTrackView';
import IDPTrackView from './components/IDPTrackView';
import IGGovernanceView from './components/IGGovernanceView';
import DashboardView from './components/DashboardView';
import UserProfileView from './components/UserProfileView';

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
  const [managerSubTab, setManagerSubTab] = useState<'inbox' | 'team' | 'discussion'>('inbox');
  const [jobTrackState, setJobTrackState] = useState<JobTrackData>(INITIAL_JOB_TRACK_STATE);
  const [notifications, setNotifications] = useState(3);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Trigger from Onboarding straight into Job Track tab
  const handleStartJobTrack = () => {
    setActiveSubTab('jobtrack');
  };

  // Trigger from Step 5 finish back to dashboard
  const handleGoToDashboard = () => {
    setActiveSidebar('dashboard');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f4f6fa] font-sans text-slate-800 antialiased">
      
      {/* ──────────────── SIDEBAR (Precise Match to User Request & Reference Photo) ──────────────── */}
      <aside className={`hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'} bg-[#f4f6fa] text-slate-700 flex-col justify-between flex-shrink-0 border-r border-[#dee2e6]/70 shadow-2xs transition-all duration-300`}>
        <div>
          {/* Logo Brand Header Frame */}
          <div className="px-6 py-5.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0062ff] flex items-center justify-center text-white font-black text-[18px] shadow-3xs tracking-wider flex-shrink-0">
              E
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <span className="font-extrabold text-slate-900 text-[14.5px] tracking-tight block font-sans">
                  Employee Blueprint
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links Flat Hierarchy exactly like the reference screenshot */}
          <nav className="p-4 space-y-1.5 font-sans">
               <button
              onClick={() => setActiveSidebar('dashboard')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-4 px-4'} py-3 rounded-2xl text-[16px] font-bold transition-all duration-200 cursor-pointer ${
                activeSidebar === 'dashboard'
                  ? 'bg-[#e3f2fd] text-[#0062ff]'
                  : 'text-[#4b5563] hover:bg-slate-200/40 hover:text-slate-900'
              }`}
              title={isCollapsed ? 'Dashboard' : ''}
            >
              <LayoutGrid className={`w-5 h-5 transition-colors ${activeSidebar === 'dashboard' ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
              {!isCollapsed && <span className={activeSidebar === 'dashboard' ? 'text-[#0062ff] font-extrabold' : 'text-slate-700 font-semibold'}>Dashboard</span>}
            </button>

            <button
              onClick={() => {
                setActiveSidebar('ilead');
                setActiveSubTab('jobtrack');
              }}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-4 px-4'} py-3 rounded-2xl text-[16px] font-bold transition-all duration-200 cursor-pointer ${
                activeSidebar === 'ilead'
                  ? 'bg-[#e3f2fd] text-[#0062ff]'
                  : 'text-[#4b5563] hover:bg-slate-200/40 hover:text-slate-900'
              }`}
              title={isCollapsed ? 'iLead' : ''}
            >
              <GraduationCap className={`w-5 h-5 transition-colors ${activeSidebar === 'ilead' ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
              {!isCollapsed && <span className={activeSidebar === 'ilead' ? 'text-[#0062ff] font-extrabold' : 'text-slate-700 font-semibold'}>iLead</span>}
            </button>

            <button
              onClick={() => setActiveSidebar('dwork')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-4 px-4'} py-3 rounded-2xl text-[16px] font-bold transition-all duration-200 cursor-pointer ${
                activeSidebar === 'dwork'
                  ? 'bg-[#e3f2fd] text-[#0062ff]'
                  : 'text-[#4b5563] hover:bg-slate-200/40 hover:text-slate-900'
              }`}
              title={isCollapsed ? 'dWork' : ''}
            >
              <Rocket className={`w-5 h-5 transition-colors ${activeSidebar === 'dwork' ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
              {!isCollapsed && <span className={activeSidebar === 'dwork' ? 'text-[#0062ff] font-extrabold' : 'text-slate-700 font-semibold'}>dWork</span>}
            </button>

            <button
              onClick={() => setActiveSidebar('dlink')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-4 px-4'} py-3 rounded-2xl text-[16px] font-bold transition-all duration-200 cursor-pointer ${
                activeSidebar === 'dlink'
                  ? 'bg-[#e3f2fd] text-[#0062ff]'
                  : 'text-[#4b5563] hover:bg-slate-200/40 hover:text-slate-900'
              }`}
              title={isCollapsed ? 'dLink' : ''}
            >
              <Network className={`w-5 h-5 transition-colors ${activeSidebar === 'dlink' ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
              {!isCollapsed && <span className={activeSidebar === 'dlink' ? 'text-[#0062ff] font-extrabold' : 'text-slate-700 font-semibold'}>dLink</span>}
            </button>

            <button
              onClick={() => setActiveSidebar('daccount')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-4 px-4'} py-3 rounded-2xl text-[16px] font-bold transition-all duration-200 cursor-pointer ${
                activeSidebar === 'daccount'
                  ? 'bg-[#e3f2fd] text-[#0062ff]'
                  : 'text-[#4b5563] hover:bg-slate-200/40 hover:text-slate-900'
              }`}
              title={isCollapsed ? 'dAccount' : ''}
            >
              <TrendingUp className={`w-5 h-5 transition-colors ${activeSidebar === 'daccount' ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
              {!isCollapsed && <span className={activeSidebar === 'daccount' ? 'text-[#0062ff] font-extrabold' : 'text-slate-700 font-semibold'}>dAccount</span>}
            </button>

            {/* Flat Divider line */}
            <div className={`my-4 border-t border-[#dee2ec]/65 ${isCollapsed ? 'mx-1' : 'mx-2'}`}></div>

            <button
              onClick={() => setActiveSidebar('toolbox')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-4 px-4'} py-3 rounded-2xl text-[16px] font-bold transition-all duration-200 cursor-pointer ${
                activeSidebar === 'toolbox'
                  ? 'bg-[#e3f2fd] text-[#0062ff]'
                  : 'text-[#4b5563] hover:bg-slate-200/40 hover:text-slate-900'
              }`}
              title={isCollapsed ? 'Toolbox' : ''}
            >
              <Wrench className={`w-5 h-5 transition-colors ${activeSidebar === 'toolbox' ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
              {!isCollapsed && <span className={activeSidebar === 'toolbox' ? 'text-[#0062ff] font-extrabold' : 'text-slate-700 font-semibold'}>Toolbox</span>}
            </button>

            <button
              onClick={() => setActiveSidebar('library')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-4 px-4'} py-3 rounded-2xl text-[16px] font-bold transition-all duration-200 cursor-pointer ${
                activeSidebar === 'library'
                  ? 'bg-[#e3f2fd] text-[#0062ff]'
                  : 'text-[#4b5563] hover:bg-slate-200/40 hover:text-slate-900'
              }`}
              title={isCollapsed ? 'Library' : ''}
            >
              <BookOpen className={`w-5 h-5 transition-colors ${activeSidebar === 'library' ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
              {!isCollapsed && <span className={activeSidebar === 'library' ? 'text-[#0062ff] font-extrabold' : 'text-slate-700 font-semibold'}>Library</span>}
            </button>



          </nav>
        </div>

        {/* Footer Collapse and Log out Block (Matches User Request) */}
        <div className="p-3 border-t border-[#dee2e6]/50 space-y-1 bg-slate-55 select-none">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-3 px-3'} py-2.5 rounded-xl text-[16px] font-bold text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 transition-all duration-200 cursor-pointer`}
            title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-slate-500" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-slate-500" />
            )}
            {!isCollapsed && <span className="font-semibold text-slate-600 font-sans">Thu gọn</span>}
          </button>

          <button
            type="button"
            onClick={() => alert("Đăng xuất thành công")}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'gap-3 px-3'} py-2.5 rounded-xl text-[16px] font-bold text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 transition-all duration-200 cursor-pointer`}
            title={isCollapsed ? 'Đăng xuất' : 'Đăng xuất'}
          >
            <LogOut className="w-5 h-5 text-slate-500" />
            {!isCollapsed && <span className="font-semibold text-slate-600 font-sans">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* ──────────────── MOBILE DRAWER OVERLAY ──────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in select-none">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
          />
          
          {/* Sidebar Drawer */}
          <aside className="relative flex flex-col w-64 h-full bg-[#f4f6fa] border-r border-[#dee2e6] z-50 p-4 shadow-xl">
            <div className="flex items-center justify-between pb-5 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0062ff] flex items-center justify-center text-white font-black text-[16px] flex-shrink-0">
                  E
                </div>
                <div className="leading-tight">
                  <span className="font-extrabold text-slate-900 text-[14px] tracking-tight block font-sans">
                    Employee Blueprint
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <nav className="py-4 space-y-1.5 overflow-y-auto flex-1 font-sans">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
                { id: 'ilead', label: 'iLead', icon: GraduationCap, subTab: 'jobtrack' },
                { id: 'dwork', label: 'dWork', icon: Rocket },
                { id: 'dlink', label: 'dLink', icon: Network },
                { id: 'daccount', label: 'dAccount', icon: TrendingUp },
                { id: 'toolbox', label: 'Toolbox', icon: Wrench },
                { id: 'library', label: 'Library', icon: BookOpen }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSidebar === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSidebar(item.id as any);
                      if (item.subTab) {
                        setActiveSubTab(item.subTab as any);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[15px] font-bold transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#e3f2fd] text-[#0062ff]' 
                        : 'text-slate-600 hover:bg-slate-200/40 hover:text-slate-950'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#0062ff] stroke-[2.25]' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ──────────────── MAIN WORKSPACE CONTAINER ──────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f4f6fa]">
        
        {/* TOPBAR (Custom styled with searchable lead client bar as in image) */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 gap-6">
          
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="block md:hidden p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer text-slate-600 bg-white"
              title="Mở menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Centered robust Search field matching image layout */}
            <div className="relative w-full max-w-sm hidden sm:block">
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
          </div>

          {/* Right Group: Roles Next to Notifications and Settings Aligned Left-next */}
          <div className="flex items-center gap-4">
            {/* Pivoted Quick-Access Roles matching exact design request & image layout */}
            <div className="hidden md:flex items-center gap-2 font-sans select-none">
              <button
                onClick={() => setActiveSidebar('manager')}
                className={`px-4 py-2 rounded-full text-xs font-black leading-none flex items-center gap-1.5 transition-all cursor-pointer border ${
                  activeSidebar === 'manager'
                    ? 'bg-[#e3f2fd] text-[#0062ff] border-blue-200 shadow-4xs font-extrabold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#0062ff] stroke-[2.25]" />
                Quản lý Đội ngũ
              </button>

              <button
                onClick={() => setActiveSidebar('ig')}
                className={`px-4 py-2 rounded-full text-xs font-black leading-none flex items-center gap-1.5 transition-all cursor-pointer border ${
                  activeSidebar === 'ig'
                    ? 'bg-[#e3f2fd] text-[#0062ff] border-blue-200 shadow-4xs font-extrabold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0062ff] stroke-[2.25]" />
                IG • Governance
              </button>
            </div>

            {/* Vertical Separator */}
            <div className="hidden md:block h-6 w-px bg-slate-200"></div>

            {/* Action icon buttons right */}
            <div className="flex items-center gap-2">
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

              {/* Divider */}
              <div className="h-6 w-px bg-slate-200 mx-1"></div>

              {/* Inline User Profile Avatar & Detail next to notifications & settings */}
              <button 
                type="button" 
                onClick={() => setActiveSidebar('profile')}
                className="flex items-center gap-2.5 pl-1 select-none font-sans mt-0.5 hover:opacity-85 active:scale-95 transition-all cursor-pointer"
                title="Xem hồ sơ nhân sự"
              >
                <div className="w-8.5 h-8.5 rounded-full bg-[#0062ff] text-white font-extrabold text-[12px] flex items-center justify-center shadow-inner flex-shrink-0 border border-blue-100">
                  MT
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* 4 HORIZONTAL NAVIGATION TABS on TOP (Visible when 'iLead' on sidebar is active) */}
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
                  className={`px-5 py-4 text-[14px] font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer -mb-px ${
                    isActive 
                      ? 'border-primary font-extrabold text-[#0077ed]' 
                      : 'border-transparent text-[#324157] hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* PAGE HEADER BANNER (Solid White Background) */}
        <div className="bg-white border-b border-slate-200/80 py-5 px-6 md:px-8 text-left flex-shrink-0 select-none">
          <div className="max-w-6xl mx-auto">
              {activeSidebar === 'ilead' && (
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-black text-[#0077ed] uppercase tracking-[0.1em] font-sans">
                    {activeSubTab === 'onboarding' && 'ILEAD · ONBOARDING'}
                    {activeSubTab === 'jobtrack' && 'ILEAD · JOB TRACK'}
                    {activeSubTab === 'depthtrack' && 'ILEAD · DEPTH TRACK'}
                    {activeSubTab === 'idptrack' && 'ILEAD · IDP TRACK'}
                  </span>
                  <h1 className="text-[26px] font-black text-[#002868] tracking-tight font-sans">
                    {activeSubTab === 'onboarding' && 'Onboarding'}
                    {activeSubTab === 'jobtrack' && 'Job Track'}
                    {activeSubTab === 'depthtrack' && 'Depth Track'}
                    {activeSubTab === 'idptrack' && 'IDP Track'}
                  </h1>
                </div>
              )}

              {activeSidebar === 'ig' && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-black text-[#0077ed] uppercase tracking-[0.1em] font-sans text-left">
                      IG · Governance
                    </span>
                    <h1 className="text-[26px] font-black text-[#002868] tracking-tight font-sans block text-left">
                      Bảng thông báo Quản trị
                    </h1>
                  </div>
                  
                  {/* IG Reviewer Login Badge from image 2 */}
                  <div className="flex items-center gap-3 bg-[#f0f4ff]/70 border border-blue-200 py-2.5 px-4 rounded-xl shrink-0 self-start md:self-center font-sans">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                      <ShieldCheck className="w-4 h-4 stroke-[2.25]" />
                    </div>
                    <div className="text-left leading-tight">
                      <span className="text-[9.5px] text-slate-450 font-black block uppercase tracking-wider">Đăng nhập với vai trò</span>
                      <strong className="text-[12px] font-black text-[#002868] block mt-0.5">IG Reviewer • Read-only</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeSidebar === 'manager' && (
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 font-sans select-none">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-black text-[#0077ed] uppercase tracking-[0.1em] font-sans">
                      SM Workspace
                    </span>
                    <h1 className="text-[26px] font-black text-[#002868] tracking-tight font-sans text-left">
                      Quản lý Đội ngũ
                    </h1>
                  </div>
                  
                  {/* Horizontal navigation inline with page header block */}
                  <div className="flex border-b border-transparent md:-mb-5 overflow-x-auto scrollbar-none items-center gap-1">
                    {[
                      { id: 'inbox', label: 'Hộp việc cần xử lý' },
                      { id: 'team', label: 'Đội ngũ trực thuộc' },
                      { id: 'discussion', label: 'Thảo luận Dlink' },
                    ].map((tab) => {
                      const isActive = managerSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setManagerSubTab(tab.id as any)}
                          className={`px-3 md:px-4 pb-2 md:pb-4 pt-1 text-[13.5px] font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer -mb-px flex items-center gap-1.5 ${
                            isActive 
                              ? 'text-[#0077ed] border-[#0077ed] font-extrabold' 
                              : 'text-[#324157] hover:text-slate-900 border-transparent'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeSidebar !== 'ilead' && activeSidebar !== 'ig' && activeSidebar !== 'manager' && (
                <div className="flex flex-col gap-1 text-left w-full">
                  <span className="text-[12px] font-black text-[#0077ed] uppercase tracking-[0.1em] font-sans">
                    {activeSidebar === 'profile' ? 'IPAG DMS • Hồ sơ nhân sự' : 'ESB PORTAL'}
                  </span>
                  {activeSidebar === 'dashboard' ? (
                    <>
                      <h1 className="text-[26px] font-black text-[#002868] tracking-tight font-sans text-left">
                        Dashboard
                      </h1>
                      <p className="text-[14px] text-slate-500 font-medium">
                        Tổng quan hành trình phát triển và vận hành
                      </p>
                    </>
                  ) : activeSidebar === 'profile' ? (
                    <>
                      <h1 className="text-[26px] font-black text-[#002868] tracking-tight font-sans text-left">
                        Thông tin cá nhân
                      </h1>
                      <p className="text-[12px] text-slate-500 font-medium flex items-center gap-1.5 pt-0.5 font-sans">
                        <span className="inline-block animate-pulse w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                        Dữ liệu đồng bộ từ IPAG Identity Platform & HRIS · Chỉ đọc
                      </p>
                    </>
                  ) : (
                    <h1 className="text-[24px] font-black text-[#002868] tracking-tight font-sans text-left capitalize">
                      {activeSidebar} Workspace
                    </h1>
                  )}
                </div>
              )}
            </div>
          </div>

        {/* MAIN BODY AREA SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-4.5 md:p-5.5">
          
          {/* 1. MAIN CO-SIGNABLE ILEAD TEMPLATES */}
          {activeSidebar === 'ilead' && (
            <div className="max-w-6xl mx-auto space-y-4.5">
              
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
                    forceRole="employee"
                  />
                )}

                {activeSubTab === 'depthtrack' && (
                  <DepthTrackView 
                    selectedSpecialty={jobTrackState.functionSpecialty} 
                    selectedSpan={jobTrackState.span}
                    onGoToJobTrack={handleStartJobTrack} 
                    // @ts-ignore
                    onGoToJobTrack={handleStartJobTrack} 
                  />
                )}

                {activeSubTab === 'idptrack' && (
                  <IDPTrackView />
                )}
              </div>

            </div>
          )}

          {/* 2. IG GOVERNANCE MAIN TAB */}
          {activeSidebar === 'ig' && (
            <div className="max-w-6xl mx-auto space-y-4.5 animate-fade-in">
              <IGGovernanceView state={jobTrackState} />
            </div>
          )}

          {/* 3. MANAGER ROLE DIRECT REPORTS TAB */}
          {activeSidebar === 'manager' && (
            <div className="max-w-6xl mx-auto space-y-4.5 animate-fade-in text-left">
              <JobTrackWizard 
                state={jobTrackState} 
                onChange={(newState) => setJobTrackState(newState)}
                onGoToDashboard={handleGoToDashboard} 
                forceRole="sm"
                smSubTab={managerSubTab}
                setSmSubTab={setManagerSubTab}
              />
            </div>
          )}

          {/* 4. DASHBOARD VIEW */}
          {activeSidebar === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in text-left">
              <DashboardView 
                onNavigateToTab={(tabId, subTabId) => {
                  setActiveSidebar(tabId as any);
                  if (subTabId) {
                    setActiveSubTab(subTabId as any);
                  }
                }}
                jobTrackState={jobTrackState}
              />
            </div>
          )}

          {/* 5. USER PROFILE FULL-PAGE VIEW */}
          {activeSidebar === 'profile' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in text-left">
              <UserProfileView 
                jobTrackState={jobTrackState} 
                onNavigateToTab={(tabId, subTabId) => {
                  setActiveSidebar(tabId as any);
                  if (subTabId) {
                    setActiveSubTab(subTabId as any);
                  }
                }}
              />
            </div>
          )}

          {/* 6. OTHER SIDEBAR ITEMS FALLBACKS */}
          {activeSidebar !== 'ilead' && activeSidebar !== 'ig' && activeSidebar !== 'manager' && activeSidebar !== 'dashboard' && activeSidebar !== 'profile' && (
            <div className="max-w-6xl mx-auto space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  {activeSidebar === 'dashboard' && <LayoutGrid className="w-8 h-8" />}
                  {activeSidebar === 'dwork' && <Rocket className="w-8 h-8" />}
                  {activeSidebar === 'dlink' && <Network className="w-8 h-8" />}
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
