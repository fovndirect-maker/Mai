import React, { useState } from 'react';
import { 
  ChevronDown, CheckCircle2, Circle, 
  Hourglass, Lightbulb, Send, Home, Info, Search, 
  TrendingUp, Users, Briefcase, Layers, Check, Edit2, Play, Calendar, UserCheck,
  Network, Award, Lock, Unlock, AlertTriangle, BadgeCheck, Bell, Eye, Clock, Zap, FileText, Sliders, Star,
  Activity, Flag, BellRing, CalendarClock, HelpCircle
} from 'lucide-react';
import { SupervisorManager, JobTrackData } from '../types';
import { SUPERVISOR_MANAGERS, CAREER_TRACK_HIERARCHY, FUNCTIONAL_DOMAINS } from '../data';

interface JobTrackWizardProps {
  state: JobTrackData;
  onChange: (newState: JobTrackData) => void;
  onGoToDashboard: () => void;
  forceRole?: 'employee' | 'sm';
  smSubTab?: 'inbox' | 'team' | 'discussion';
  setSmSubTab?: (tab: 'inbox' | 'team' | 'discussion') => void;
}

export default function JobTrackWizard({ 
  state, 
  onChange, 
  onGoToDashboard, 
  forceRole,
  smSubTab: propsSmSubTab,
  setSmSubTab: propsSetSmSubTab
}: JobTrackWizardProps) {
  // Local state for UI dropdowns
  const [isSmOpen, setIsSmOpen] = useState(false);
  const [isCtOpen, setIsCtOpen] = useState(false);
  const [isFdOpen, setIsFdOpen] = useState(false);
  const [isFsOpen, setIsFsOpen] = useState(false);
  
  // Simulated Role state (Employee / SM)
  const [simulatedRole, setSimulatedRole] = useState<'employee' | 'sm'>('employee');
  const currentRole = forceRole || simulatedRole;
  const [smFeedbackInput, setSmFeedbackInput] = useState(state.smFeedback || '');
  const [isCommitChecked, setIsCommitChecked] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const [localSmSubTab, setLocalSmSubTab] = useState<'inbox' | 'team' | 'discussion'>('inbox');
  const smSubTab = propsSmSubTab || localSmSubTab;
  const setSmSubTab = propsSetSmSubTab || setLocalSmSubTab;
  const [chatMessages, setChatMessages] = useState(() => [
    { id: 1, sender: 'Lê Hoàng Nam', role: 'SRE Specialist', text: 'Chào anh Minh, em vừa cập nhật lại lộ trình SRE và kế hoạch 12 tháng kế tiếp ạ.', time: '09:02 Hôm nay' },
    { id: 2, sender: 'Đức Minh Trần', role: 'Supervisor Manager', text: 'Chào Nam, anh đã thấy yêu cầu của em. Nội dung học Kubernetes lớn rất thực tiễn cho dự án dLink.', time: '09:15 Hôm nay' },
    { id: 3, sender: 'Lê Trang', role: 'Systems Engineer', text: 'Em cũng vừa nhấn gửi yêu cầu co-sign dLINK Job Track, anh rà soát giúp em nhé.', time: '11:25 Hôm nay' },
  ]);
  const [newMessageText, setNewMessageText] = useState('');
  const [activeChannel, setActiveChannel] = useState<'co-sign' | 'idp' | 'general'>('co-sign');
  const [selectedChatUserId, setSelectedChatUserId] = useState<string>('L-2813');
  const [messagesMap, setMessagesMap] = useState<Record<string, Array<{ id: number; sender: string; text: string; time: string }>>>(() => ({
    'L-2811': [
      { id: 1, sender: 'Nguyễn Anh Tuấn', text: 'Chào anh Minh, em đang hoàn thiện nốt phần phản hồi tự đánh giá theo Job Track Backend Engineer ạ.', time: '10:30, 21/05' }
    ],
    'L-2812': [
      { id: 1, sender: 'Phạm Minh Hoa', text: 'Chào anh Minh, em đã gửi kết quả benchmark và cập nhật thông tin thiết kế rồi ạ.', time: '14:15, 21/05' }
    ],
    'L-2813': [
      { id: 1, sender: 'Lê Hoàng Nam', text: 'Anh Minh ơi, em vừa gửi đề xuất đổi Job Track để đổi lên Span S2 do được lead phân công dự án mới. Nhờ anh xem xét co-sign giúp em nhé.', time: '09:00, 22/05' }
    ],
    'L-2814': [
      { id: 1, sender: 'Trần Thu Hà', text: 'Chào anh Minh, em đang hoàn thiện bộ test và kịch bản automation test cho dự án dLINK.', time: '11:00, 22/05' }
    ],
    'L-2815': [
      { id: 1, sender: 'Vũ Hoàng Lâm', text: 'Chào anh Minh, em đã đạt đủ BMI và hoàn thành hồ sơ thử việc theo blueprint rồi nhé.', time: '13:30, 22/05' }
    ],
    'L-2816': [
      { id: 1, sender: 'Lê Trang', text: 'Anh Minh ơi, em vừa submit khai báo thông tin Job Track mới, nhờ anh calibrate giúp em.', time: '10:15, 23/05' }
    ]
  }));

  // Interactive Inbox & Review Reason workflow states
  const [isDepthApproved, setIsDepthApproved] = useState(false);
  const [isIcmApproved, setIsIcmApproved] = useState(false);
  const [inboxFilter, setInboxFilter] = useState<'all' | 'cosign' | 'depth' | 'icm' | 'history'>('all');
  const [isReviewReasonOpen, setIsReviewReasonOpen] = useState(false);
  const [reviewReasonInput, setReviewReasonInput] = useState('');

  // Stateful list of simulated IC direct reports under 1 SM
  const [teamMembers, setTeamMembers] = useState(() => [
    {
      id: 'L-2811',
      name: 'Nguyễn Anh Tuấn',
      role: 'IC · Software Engineer',
      cosigned: false,
      smStatus: 'pending' as const,
      careerTrack: 'Solution Engineer',
      functionalDomain: 'Phát triển Phần mềm',
      functionSpecialty: 'Backend Engineer',
      span: 'S2',
      selfReflection: {
        reason: 'Đam mê phát triển Web & Backend nghiệp vụ lớn.',
        currentView: 'Cần nâng cao kỹ năng tối ưu câu lệnh SQL phức tạp.',
        goal12Months: 'Trở thành một Senior Backend Engineer dẫn dắt module.'
      },
      submittedAt: '09:30 - Hôm nay',
      smFeedback: '',
      isCommitChecked: false
    },
    {
      id: 'L-2812',
      name: 'Phạm Minh Hoa',
      role: 'IC · Product Designer',
      cosigned: true,
      smStatus: 'approved' as const,
      careerTrack: 'Product Design',
      functionalDomain: 'Kiến tạo Sản phẩm & Trải nghiệm Số',
      functionSpecialty: 'PM — Product Management',
      span: 'S2',
      selfReflection: {
        reason: 'Tôi muốn làm ra những sản phẩm có trải nghiệm người dùng tuyệt vời nhất.',
        currentView: 'Cơ hội thực chiến cọ xát với tệp người dùng thực tế còn ít.',
        goal12Months: 'Chứng nhận Product Management chuyên nghiệp của tập đoàn.'
      },
      submittedAt: '14:15 - Hôm qua',
      smFeedback: 'Đồng ý phê duyệt định vị lộ trình Job Track.',
      isCommitChecked: true
    },
    {
      id: 'L-2813',
      name: 'Lê Hoàng Nam',
      role: 'IC · Site Reliability Engineer',
      cosigned: true,
      smStatus: 'approved' as const,
      careerTrack: 'Solution Engineer',
      functionalDomain: 'Nền tảng & Hạ tầng Công nghệ Số',
      functionSpecialty: 'SRE — Site Reliability Engineer',
      span: 'S2',
      selfReflection: {
        reason: 'Đại diện tinh thần bảo vệ sự an định, liên tục hoạt động của hệ thống.',
        currentView: 'Muốn học sâu thêm cách nâng cấp Kubernetes clusters lớn.',
        goal12Months: 'Đảm bảo SLA thời gian hoạt động hệ thống đạt 99.99%.'
      },
      submittedAt: '08:45 - Hôm nay',
      smFeedback: 'Đã co-sign. Chúc đồng chí Nam tiếp tục phát huy năng lực SRE tại dự án dLINK.',
      isCommitChecked: true
    },
    {
      id: 'L-2814',
      name: 'Trần Thu Hà',
      role: 'IC · QA Analyst',
      cosigned: true,
      smStatus: 'approved' as const,
      careerTrack: 'Solution Engineer',
      functionalDomain: 'Phát triển Phần mềm',
      functionSpecialty: 'FE — Frontend Engineer',
      span: 'S2',
      selfReflection: {
        reason: 'Tôi muốn xây dựng lộ trình nâng hạng chất lượng kiểm thử chuyên nghiệp.',
        currentView: 'Mong muốn được thử sức với kiểm thử hiệu năng cao dLink.',
        goal12Months: 'Tích hợp script test tự động vào pipeline CI/CD chính thức.'
      },
      submittedAt: '16:45 - Hôm qua',
      smFeedback: 'Lộ trình phát triển năng lực rõ ràng.',
      isCommitChecked: true
    },
    {
      id: 'L-2815',
      name: 'Vũ Hoàng Lâm',
      role: 'IC · Systems Specialist',
      cosigned: true,
      smStatus: 'approved' as const,
      careerTrack: 'Architecture & System Specialist',
      functionalDomain: 'Phát triển Phần mềm',
      functionSpecialty: 'SA — System Analyst',
      span: 'S2',
      selfReflection: {
        reason: 'Khởi tạo các sơ đồ kiến trúc chuẩn hóa định vị giải pháp.',
        currentView: 'Mong muốn học sâu về Cloud-Native Architecture.',
        goal12Months: 'Hoàn thành thiết kế kiến trúc chuẩn hóa cho dWork.'
      },
      submittedAt: '10:00 - 3 ngày trước',
      smFeedback: 'Đã hoàn tất calibrate & co-sign. Chúc đồng chí Lâm bền chí hướng tới mốc thành công tiếp theo.',
      isCommitChecked: true
    },
    {
      id: 'L-2816',
      name: 'Lê Trang',
      role: 'IC · Systems Engineer',
      cosigned: false,
      smStatus: 'pending' as const,
      careerTrack: 'Solution Engineer',
      functionalDomain: 'Nền tảng & Hạ tầng Công nghệ Số',
      functionSpecialty: 'SRE — Site Reliability Engineer',
      span: 'S2',
      selfReflection: {
        reason: 'Khao khát làm quy trình kỹ thuật hệ thống đạt tải tối ưu.',
        currentView: 'Dự án dLink có tần suất truyền tải dữ liệu rất cao.',
        goal12Months: 'Tối ưu hóa hạ tầng đám mây giúp tiết kiệm 20% chi phí.'
      },
      submittedAt: '11:20 - Hôm nay',
      smFeedback: '',
      isCommitChecked: false
    },
    {
      id: 'L-2817',
      name: 'Đoàn Quốc Bảo',
      role: 'IC · DevOps Specialist',
      cosigned: true,
      smStatus: 'approved' as const,
      careerTrack: 'Solution Engineer',
      functionalDomain: 'Nền tảng & Hạ tầng Công nghệ Số',
      functionSpecialty: 'SRE — Site Reliability Engineer',
      span: 'S3',
      selfReflection: {
        reason: 'Xây dựng dây chuyền phân phối liên tục hiệu năng đáp ứng tải cao.',
        currentView: 'Cơ sở hạ tầng Kubernetes dLink cần ổn định cấu hình mạng tốt hơn.',
        goal12Months: 'Rút ngắn thời gian triển khai CI/CD tối ưu xuống dưới 5 phút.'
      },
      submittedAt: '09:12 - Hôm nay',
      smFeedback: 'Đồng ý phê duyệt.',
      isCommitChecked: true
    },
    {
      id: 'L-2818',
      name: 'Phạm Thắng Lợi',
      role: 'IC · Product Owner',
      cosigned: true,
      smStatus: 'approved' as const,
      careerTrack: 'Product Design',
      functionalDomain: 'Kiến tạo Sản phẩm & Trải nghiệm Số',
      functionSpecialty: 'PM — Product Management',
      span: 'S1',
      selfReflection: {
        reason: 'Đóng góp phát triển trực quan các tính năng cốt lõi cho iLead portal.',
        currentView: 'Kinh nghiệm định vị dòng tiền sản phẩm cần cải thiện đột phá.',
        goal12Months: 'Nghiên cứu thành công 3 mảng thị trường ngách mới cho dLink.'
      },
      submittedAt: '14:30 - Hôm qua',
      smFeedback: 'Đã nhất trí thông qua.',
      isCommitChecked: true
    },
    {
      id: 'L-2819',
      name: 'Đặng Thùy Dương',
      role: 'IC · Fullstack Developer',
      cosigned: true,
      smStatus: 'approved' as const,
      careerTrack: 'Solution Engineer',
      functionalDomain: 'Phát triển Phần mềm',
      functionSpecialty: 'FE — Frontend Engineer',
      span: 'S2',
      selfReflection: {
        reason: 'Tối ưu hóa và tái cấu trúc giao diện tương thích đa nền tảng tuyệt mỹ.',
        currentView: 'Muốn học sâu thêm các thuật toán rendering tối ưu hiệu suất runtime.',
        goal12Months: 'Phát triển hoàn chỉnh dashboard lõi dWork mới thân thiện mượt mà.'
      },
      submittedAt: '16:10 - Hôm qua',
      smFeedback: 'Ý kiến định biên tốt, nhất trí với lộ trình.',
      isCommitChecked: true
    }
  ]);

  const [selectedMemberId, setSelectedMemberId] = useState<string>('L-2841');

  // Helper helper to format track and specialty string precisely like the image (e.g. PD • PM or SE • Backend Engineer)
  const formatSub = (member: any) => {
    const ctAbbr = member.careerTrack ? (CAREER_TRACK_HIERARCHY[member.careerTrack]?.abbr || 'IC') : 'PD';
    let specName = member.functionSpecialty || 'PM';
    if (specName.includes(' — ')) {
      specName = specName.split(' — ')[0];
    } else if (specName.includes(' - ')) {
      specName = specName.split(' - ')[0];
    }
    return `${ctAbbr} • ${specName}`;
  };

  // Compute all unified corporate members direct reports list (current IC + other ICs)
  const allMembers = [
    {
      id: 'L-2841',
      name: 'Minh Trần',
      role: 'IC · Client Engineer (Mới nhận việc)',
      cosigned: state.cosigned || false,
      smStatus: state.smStatus || 'pending',
      careerTrack: state.careerTrack || 'Product Design',
      functionalDomain: state.functionalDomain || 'Kiến tạo Sản phẩm & Trải nghiệm Số',
      functionSpecialty: state.functionSpecialty || 'PM — Product Management',
      span: state.span || 'S2',
      selfReflection: {
        reason: state.selfReflection?.reason || 'Tôi muốn đóng góp định hướng phát triển tối ưu sản phẩm.',
        currentView: state.selfReflection?.currentView || 'Cần nâng cao trình quản trị và thiết kế lộ trình thực tế.',
        goal12Months: state.selfReflection?.goal12Months || 'Chứng nhận PD/PM chuyên nghiệp của tập đoàn.'
      },
      submittedAt: state.submittedAt || '10:15 - Hôm nay',
      smFeedback: state.smFeedback || '',
      isCommitChecked: isCommitChecked,
      isSecondSubmission: state.isSecondSubmission || false,
      changeReason: state.changeReason || ''
    },
    ...teamMembers
  ];

  const handleSelectMember = (id: string, memberObj: any) => {
    setSelectedMemberId(id);
    setIsCommitChecked(memberObj.isCommitChecked || false);
    setSmFeedbackInput(memberObj.smFeedback || '');
  };

  const handleCosignMember = (id: string, customFeedback?: string) => {
    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('vi-VN');
    const feedbackText = customFeedback !== undefined ? customFeedback : smFeedbackInput;
    
    if (id === 'L-2841') {
      onChange({
        ...state,
        cosigned: true,
        cosignedAt: timestamp,
        smFeedback: feedbackText,
        smStatus: 'approved'
      });
    } else {
      setTeamMembers(prev => prev.map(m => {
        if (m.id === id) {
          return {
            ...m,
            cosigned: true,
            cosignedAt: timestamp,
            smStatus: 'approved',
            smFeedback: feedbackText,
            isCommitChecked: true
          };
        }
        return m;
      }));
    }
    setIsCommitChecked(false);
    setSmFeedbackInput('');
  };

  const handleRejectMember = (id: string, reason?: string) => {
    const feedbackText = reason || smFeedbackInput || 'SM yêu cầu xem xét lại định vị, vui lòng bổ sung đầy đủ 3 câu hỏi soi chiếu bản thân.';
    
    if (id === 'L-2841') {
      onChange({
        ...state,
        submitted: true, // Keep submitted as true so they are on the status screen and can see the comment/edit request box
        cosigned: false,
        smStatus: 'rejected',
        smFeedback: feedbackText
      });
    } else {
      setTeamMembers(prev => prev.map(m => {
        if (m.id === id) {
          return {
            ...m,
            cosigned: false,
            smStatus: 'rejected',
            smFeedback: feedbackText,
            isCommitChecked: false
          };
        }
        return m;
      }));
    }
    setIsCommitChecked(false);
    setSmFeedbackInput('');
  };

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
      submitted: false,
      cosigned: false, // Reset co-sign if user edits again
      smStatus: 'pending'
    });
  };

  const handleCosign = () => {
    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('vi-VN');
    onChange({
      ...state,
      cosigned: true,
      cosignedAt: timestamp,
      smFeedback: smFeedbackInput,
      smStatus: 'approved'
    });
  };

  const handleRejectBySM = () => {
    onChange({
      ...state,
      submitted: true,
      cosigned: false,
      smStatus: 'rejected',
      smFeedback: smFeedbackInput || 'SM yêu cầu rà soát điều chỉnh lại lựa chọn.'
    });
    setSimulatedRole('employee');
  };

  const isFormValid = state.sm && 
                      state.careerTrack && 
                      state.functionalDomain && 
                      state.functionSpecialty && 
                      (state.smStatus !== 'pending' || (
                        (state.selfReflection?.reason || '').trim().length > 0 &&
                        (state.selfReflection?.currentView || '').trim().length > 0 &&
                        (state.selfReflection?.goal12Months || '').trim().length > 0
                      ));

  // Render Submitted / Pending Approval view OR if explicitly forced to SM view
  if (state.submitted || forceRole === 'sm') {
    if (currentRole === 'sm') {
      const selectedMember = allMembers.find(m => m.id === selectedMemberId) || allMembers[0];
      const pendingCount = allMembers.filter(m => !m.cosigned).length + (isDepthApproved ? 0 : 1) + (isIcmApproved ? 0 : 1);
      const approvedCount = allMembers.filter(m => m.cosigned).length;

      return (
        <div className="space-y-6 max-w-6xl mx-auto font-sans text-slate-800 animate-fade-in text-left">
          
          {/* ────────── DYNAMIC SIMULATION BAR (SM View) ────────── */}
          {!forceRole && (
            <div className="bg-slate-100 border border-slate-200 p-2 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans shadow-3xs">
              <div className="flex items-center gap-2 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Giả lập kiểm thử:</span>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded ml-2">
                  Quản lý trực tiếp (SM) Workspace
                </span>
              </div>
              <div className="flex rounded-xl bg-slate-200/60 p-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSimulatedRole('employee')}
                  className="px-4 py-2 rounded-lg text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-all duration-200 cursor-pointer"
                >
                  🙋‍♂️ Nhân viên / HRBP
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedRole('sm')}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-extrabold shadow-xs transition-all duration-200 cursor-pointer"
                >
                  👔 Quản lý trực tiếp (SM)
                </button>
              </div>
            </div>
          )}

          {/* 3 Metrics Cards (Redesigned like Image 2, with soft border gradients and gold theme for pending status) */}
          {smSubTab === 'inbox' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Tổng nhân sự */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-start justify-between relative overflow-hidden transition hover:shadow-2xs">
                <div className="space-y-1 text-left z-10">
                  <span className="text-[11px] font-bold text-[#324157] uppercase tracking-wider block font-sans">
                    Tổng nhân sự SBU
                  </span>
                  <div className="text-[34px] font-black text-[#0d2f5c] tracking-tight leading-none font-sans mt-0.5">
                    {allMembers.length} <span className="text-xs font-bold text-slate-400">nhân viên</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#324157]/90 block leading-tight mt-1.5">
                    Đang hoạt động trong squad dLINK dWork
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50/50 text-blue-600 flex items-center justify-center shrink-0 shadow-inner z-10 border border-blue-50">
                  <Users className="w-5.5 h-5.5 stroke-[2]" />
                </div>
              </div>

              {/* Card 2: Việc đang chờ duyệt (Cam Vàng / Gold theme, NO red) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-start justify-between relative overflow-hidden transition hover:shadow-2xs">
                <div className="space-y-1 text-left z-10">
                  <span className="text-[11px] font-bold text-[#324157] uppercase tracking-wider block font-sans">
                    Việc đang chờ duyệt
                  </span>
                  <div className="text-[34px] font-black text-[#eaaa08] tracking-tight leading-none font-sans mt-0.5">
                    {pendingCount} <span className="text-xs font-bold text-slate-400">hồ sơ</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#324157]/90 block leading-tight mt-1.5">
                    Cần calibrate & co-sign khẩn cấp
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50/50 text-[#eaaa08] flex items-center justify-center shrink-0 shadow-inner z-10 border border-amber-50">
                  <Zap className="w-5.5 h-5.5 fill-current stroke-transparent" />
                </div>
              </div>

              {/* Card 3: Nhân sự đã duyệt */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-start justify-between relative overflow-hidden transition hover:shadow-2xs">
                <div className="space-y-1 text-left z-10">
                  <span className="text-[11px] font-bold text-[#324157] uppercase tracking-wider block font-sans">
                    Nhân sự đã duyệt co-sign
                  </span>
                  <div className="text-[34px] font-black text-emerald-500 tracking-tight leading-none font-sans mt-0.5">
                    {approvedCount} <span className="text-xs font-bold text-slate-400">hoàn tất</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#324157]/90 block leading-tight mt-1.5">
                    Đã hoàn tất lưu vết định danh sự nghiệp
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50/30 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner z-10 border border-emerald-50">
                  <CheckCircle2 className="w-5.5 h-5.5 stroke-[2]" />
                </div>
              </div>
            </div>
          )}

          {/* SM Split Dashboard Container (NO steps shown) */}
          {smSubTab === 'inbox' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT PANEL: Urgent Task Inbox & Recent Reports (6 cols to make it horizontally wider and spacious) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Inbox component (Hộp việc cần xử lý khẩn cấp) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
                <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-[14px] font-black text-[#0d2f5c] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <Zap className="w-4 h-4 text-[#0077ed]" /> Hộp việc cần xử lý khẩn cấp
                  </h3>
                </div>

                {/* Subtabs filters */}
                {(() => {
                  const cosignCount = allMembers.filter(m => !m.cosigned).length;
                  const depthCount = isDepthApproved ? 0 : 1;
                  const icmCount = isIcmApproved ? 0 : 1;
                  const allCount = cosignCount + depthCount + icmCount;
                  const historyCount = (isDepthApproved ? 1 : 0) + (isIcmApproved ? 1 : 0) + allMembers.filter(m => m.cosigned).length;

                  return (
                    <div className="flex flex-wrap gap-1.5 select-none pt-0.5">
                      <button
                        type="button"
                        onClick={() => setInboxFilter('all')}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none ${
                          inboxFilter === 'all'
                            ? 'bg-[#0077ed] text-white shadow-3xs'
                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        Tất cả ({allCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInboxFilter('cosign')}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none ${
                          inboxFilter === 'cosign'
                            ? 'bg-[#d97706] text-white shadow-3xs'
                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        Co-sign Job Track ({cosignCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInboxFilter('depth')}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none ${
                          inboxFilter === 'depth'
                            ? 'bg-[#0077ed] text-white shadow-3xs'
                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        DEPTH & BMI ({depthCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInboxFilter('icm')}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none ${
                          inboxFilter === 'icm'
                            ? 'bg-[#0077ed] text-white shadow-3xs'
                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        Đánh giá ICM ({icmCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInboxFilter('history')}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none ${
                          inboxFilter === 'history'
                            ? 'bg-[#0077ed] text-white shadow-3xs'
                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        Lịch sử xử lý ({historyCount})
                      </button>
                    </div>
                  );
                })()}
                 <div className="space-y-2 pt-1">
                   
                   {/* Item 1: Đánh giá DEPTH S1 từ Phạm Minh Hoa */}
                   {!isDepthApproved && (inboxFilter === 'all' || inboxFilter === 'depth') && (
                     <div className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-3 text-left">
                       <div className="flex items-center gap-2.5 min-w-0">
                         <div className="w-7 h-7 rounded-md bg-blue-50/50 text-[#0077ed] border border-blue-50 flex items-center justify-center shrink-0">
                           <Sliders className="w-3.5 h-3.5 stroke-[2]" />
                         </div>
                         <div className="min-w-0">
                           <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight">
                             Đánh giá DEPTH S1 từ Phạm Minh Hoa
                           </h4>
                           <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 leading-none">
                             Chờ calibrate S1. PoA tự chấm: 1.8 · EB: 1.7
                           </p>
                         </div>
                       </div>
                       <button
                         type="button"
                         onClick={() => {
                           setIsDepthApproved(true);
                         }}
                         className="bg-[#0077ed] hover:bg-[#006bd6] text-white font-extrabold text-[9.5px] px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 shrink-0 transition"
                       >
                         <Check className="w-3 h-3 stroke-[3]" /> Calibrate
                       </button>
                     </div>
                   )}
 
                   {/* Item 2: Đánh giá ICM cho Trần Thu Hà */}
                   {!isIcmApproved && (inboxFilter === 'all' || inboxFilter === 'icm') && (
                     <div className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-3 text-left">
                       <div className="flex items-center gap-2.5 min-w-0">
                         <div className="w-7 h-7 rounded-md bg-pink-50/50 text-pink-500 border border-pink-50 flex items-center justify-center shrink-0">
                           <Star className="w-3.5 h-3.5 stroke-[2] fill-pink-50" />
                         </div>
                         <div className="min-w-0">
                           <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight">
                             Đánh giá ICM cho Trần Thu Hà
                           </h4>
                           <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 leading-none">
                             Kỹ năng: System Design · Hiện tại: L1 · Đánh giá năng lực
                           </p>
                         </div>
                       </div>
                       <button
                         type="button"
                         onClick={() => {
                           setIsIcmApproved(true);
                         }}
                         className="bg-[#db2777] hover:bg-[#be185d] text-white font-extrabold text-[9.5px] px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 shrink-0 transition"
                       >
                         <Award className="w-3 h-3" /> Đánh giá ICM
                       </button>
                     </div>
                   )}
 
                   {/* Dynamic Pending Co-sign requests from all direct reports */}
                   {(() => {
                     if (inboxFilter !== 'all' && inboxFilter !== 'cosign') {
                       return null;
                     }
 
                     const pendingCosigns = allMembers.filter(m => !m.cosigned);
                     if (pendingCosigns.length === 0) {
                       return (
                         <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs font-sans">
                           🎉 Đã hoàn tất co-sign toàn bộ danh sách!
                         </div>
                       );
                     }
 
                     return pendingCosigns.map((member) => {
                       const isSelected = selectedMemberId === member.id;
                       
                       return (
                         <div
                           key={member.id}
                           onClick={() => handleSelectMember(member.id, member)}
                           className={`p-2 rounded-xl bg-white transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-left ${
                             isSelected
                               ? 'border-2 border-[#0077ed] bg-blue-50/5 shadow-2xs'
                               : 'border border-slate-200 hover:border-slate-350'
                           }`}
                         >
                           <div className="flex items-center gap-2.5 min-w-0">
                             {/* Smaller rounded icon block */}
                             <div className="w-7 h-7 rounded-md bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0">
                               <FileText className="w-3.5 h-3.5 stroke-[2]" />
                             </div>
                             <div className="min-w-0">
                               <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight truncate">
                                 Yêu cầu Co-sign Job Track từ {member.name}
                               </h4>
                               <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 truncate leading-none">
                                 Đề xuất lộ trình: {member.functionSpecialty || 'Chuyên viên kỹ thuật'}
                               </p>
                             </div>
                           </div>
                           
                           <button
                             type="button"
                             onClick={(e) => {
                               e.stopPropagation();
                               handleSelectMember(member.id, member);
                             }}
                             className={`font-black text-[9px] px-2.5 py-1.5 rounded-lg shrink-0 tracking-wider transition uppercase cursor-pointer ${
                               isSelected
                                 ? 'bg-[#fff7ed] text-[#e06c00] hover:bg-[#ffebd1] border border-orange-200/20 shadow-3xs'
                                 : 'bg-[#fff7ed] text-[#e06c00] hover:bg-[#ffebd1] border border-orange-200/20'
                             }`}
                           >
                             Co-Sign
                           </button>
                         </div>
                       );
                     });
                   })()}

                  {/* History View Items */}
                  {inboxFilter === 'history' && (
                    <div className="space-y-2">
                      {isDepthApproved && (
                        <div className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-350 transition-all flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight">Đã Calibrate DEPTH S1</h4>
                              <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 leading-none">Nhân viên: Phạm Minh Hoa</p>
                            </div>
                          </div>
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0">Hoàn tất</span>
                        </div>
                      )}
                      
                      {isIcmApproved && (
                        <div className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-350 transition-all flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight">Đã Đánh giá ICM</h4>
                              <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 leading-none">Nhân viên: Trần Thu Hà</p>
                            </div>
                          </div>
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0">Hoàn tất</span>
                        </div>
                      )}

                      {allMembers.filter(m => m.cosigned).map((member) => (
                        <div key={member.id} className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-350 transition-all flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight">Đã duyệt Co-sign Job Track cho {member.name}</h4>
                              <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 leading-none">MS: {member.id} • Lộ trình: {member.functionSpecialty || 'Chưa thiết lập'}</p>
                            </div>
                          </div>
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0">Đã duyệt</span>
                        </div>
                      ))}

                      {!isDepthApproved && !isIcmApproved && !allMembers.some(m => m.cosigned) && (
                        <div className="text-center py-6 text-slate-400 font-medium text-xs">
                          Chưa có lịch sử xử lý nào được lưu trong phiên hiện tại.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Reports block (Exactly 3 items - not clickable - border Slate-100 avoiding dark borders) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
                <div className="pb-2 border-b border-[#e7edfc] flex items-center justify-between">
                  <h3 className="text-[14px] font-black text-[#0d2f5c] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <Users className="w-4 h-4 text-[#0077ed]" /> Đội ngũ trực thuộc gần đây
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSmSubTab('team')}
                    className="text-[10px] font-black text-[#0077ed] hover:underline uppercase cursor-pointer"
                  >
                    Xem tất cả
                  </button>
                </div>

                <div className="space-y-2.5">
                  {allMembers.slice(0, 3).map((member) => {
                    const nameParts = member.name.trim().split(' ');
                    const lastName = nameParts[nameParts.length - 1];
                    const initials = lastName ? lastName[0].toUpperCase() : 'U';
                    
                    const avatarStyle = member.cosigned 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/60' 
                      : 'bg-amber-50 text-amber-600 border border-amber-100/60';

                    return (
                      <div
                        key={member.id}
                        className="p-2.5 rounded-xl border border-[#ebf2f7] bg-slate-50/45 flex items-center justify-between gap-3 text-left select-none cursor-default"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Small round avatar bubble */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-[11px] shrink-0 border ${avatarStyle}`}>
                            {initials}
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-extrabold text-[#0d2f5c] text-[13px] leading-tight truncate">
                              {member.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold mt-0.5 truncate leading-none">
                              {formatSub(member)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT PANEL: Focused IC Detail & Co-sign Section (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs space-y-5 text-left">
                
                {/* ID Header */}
                <div className="pb-3 border-b border-[#e2ebff] flex items-center justify-between gap-3 w-full animate-fade-in">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#ebf3fe] text-[#0062ff] flex items-center justify-center font-extrabold text-xs shrink-0 font-sans">
                      👤
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-[14px] text-[#0d2f5c] leading-tight truncate">Yêu cầu co-sign từ {selectedMember.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1 truncate">Mã nhân sự: {selectedMember.id} • Đăng ký ngày: {selectedMember.submittedAt}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {selectedMember.cosigned ? (
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wide uppercase">
                        ĐÃ PHÊ DUYỆT
                      </span>
                    ) : selectedMember.smStatus === 'rejected' ? (
                      <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[9.5px] font-black px-2.5 py-1 rounded-full tracking-wide uppercase font-sans">
                        PENDING
                      </span>
                    ) : (
                      <span className="bg-[#fff7ed] text-[#e06c00] border border-orange-200 text-[9px] font-black px-2.5 py-1 rounded-full tracking-wide uppercase font-sans">
                        CHỜ CO-SIGN
                      </span>
                    )}
                  </div>
                </div>

                {/* Dynamically Styled Job Track Comparison Block requested by User */}
                {selectedMember.isSecondSubmission && (() => {
                  const ctAbbr = selectedMember.careerTrack ? (CAREER_TRACK_HIERARCHY[selectedMember.careerTrack]?.abbr || 'CT') : 'CT';
                  const specPart = selectedMember.functionSpecialty ? selectedMember.functionSpecialty.split('—')[0].trim() : 'FS';
                  const specAbbr = specPart.split(' ').map(w => w[0]).join('').toUpperCase() || 'SPEC';
                  const squadCode = 'DWORK';
                  
                  const currentLevel = selectedMember.span === 'S3' ? 'FD2' : (selectedMember.span === 'S2' ? 'FD1' : 'FD0');
                  const proposedLevel = `FD${selectedMember.span || '1'}`;
                  
                  const currentCode = `${ctAbbr}-${specAbbr}-${squadCode}-${currentLevel}`;
                  const proposedCode = `${ctAbbr}-${specAbbr}-${squadCode}-${proposedLevel}`;

                  return (
                    <div className="space-y-3">
                      <div className="bg-amber-50/20 border border-amber-200/50 p-4 rounded-xl font-sans relative overflow-hidden">
                        <div className="grid grid-cols-5 items-center gap-2">
                          
                          {/* Current Job Track */}
                          <div className="col-span-2 text-center">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-sans">
                              JOB TRACK HIỆN TẠI
                            </span>
                            <span className="mt-1.5 block text-[13px] md:text-[14px] font-black font-mono text-slate-500 tracking-tight text-center truncate">
                              {currentCode}
                            </span>
                          </div>

                          {/* Arrows Divider */}
                          <div className="col-span-1 flex flex-col items-center justify-center select-none">
                            <span className="text-amber-500 text-sm font-black tracking-widest leading-none">
                              »»»
                            </span>
                            <span className="text-[8.5px] bg-amber-150 text-[#d97706] font-extrabold px-1.5 py-0.5 rounded uppercase leading-none mt-1">
                              THAY ĐỔI
                            </span>
                          </div>

                          {/* Proposed Job Track */}
                          <div className="col-span-2 text-center">
                            <span className="text-[10px] text-[#d97706] font-extrabold uppercase tracking-wider block font-sans">
                              JOB TRACK ĐỀ XUẤT
                            </span>
                            <span className="mt-1.5 block text-[13px] md:text-[14px] font-black font-mono text-[#d97706] tracking-tight text-center truncate">
                              {proposedCode}
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* Lý do thay đổi Job Track */}
                      <div className="bg-amber-50/30 border border-amber-200/40 p-3.5 rounded-xl space-y-1 font-sans text-left">
                        <span className="text-[9px] font-black uppercase text-[#9f5700] tracking-wider block font-sans">Lý do thay đổi Job Track</span>
                        <p className="text-slate-650 text-xs font-semibold pl-2.5 border-l-2 border-amber-500 leading-relaxed italic">
                          "{selectedMember.changeReason || 'Chưa cung cấp lý do thay đổi.'}"
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Grid Choices */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 font-sans">
                  <div className="space-y-1">
                    <span className="text-[9px] text-[#6b7280] font-bold uppercase tracking-widest block font-sans">Career Track</span>
                    <div className="text-[13px] font-extrabold text-slate-800 flex items-center gap-2 leading-none mt-1.5 font-sans">
                      <div className="w-5 h-5 rounded bg-[#0077ed] text-white font-extrabold text-[8.5px] flex items-center justify-center shrink-0">
                        {selectedMember.careerTrack ? (CAREER_TRACK_HIERARCHY[selectedMember.careerTrack]?.abbr || 'CT') : '—'}
                      </div>
                      <span className="truncate">{selectedMember.careerTrack || 'Chưa thiết lập'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-[#6b7280] font-bold uppercase tracking-widest block font-sans">Functional Domain</span>
                    <div className="text-[13px] font-extrabold text-slate-800 flex items-center gap-2 leading-none mt-1.5 font-sans">
                      <div className="w-5 h-5 rounded bg-[#0077ed] text-white font-extrabold text-[8.5px] flex items-center justify-center shrink-0">
                        {selectedMember.functionalDomain ? (FUNCTIONAL_DOMAINS.find(fd => fd.name === selectedMember.functionalDomain)?.abbr || 'FD') : '—'}
                      </div>
                      <span className="truncate leading-tight block">{selectedMember.functionalDomain || 'Chưa thiết lập'}</span>
                    </div>
                  </div>
                  <div className="space-y-1 border-t border-slate-200/60 pt-3.5 col-span-2">
                    <span className="text-[9px] text-[#6b7280] font-bold uppercase tracking-widest block font-sans">Specialty</span>
                    <div className="text-[13px] font-extrabold text-slate-800 flex items-center gap-2 leading-none mt-1.5 font-sans">
                      <div className="w-5 h-5 rounded bg-[#1d9e75] text-white font-extrabold text-[8.5px] flex items-center justify-center shrink-0">FS</div>
                      <span className="truncate">{selectedMember.functionSpecialty || 'Chưa thiết lập'}</span>
                    </div>
                  </div>
                </div>

                {/* Essay reflections */}
                <div className="bg-amber-50/20 border border-amber-200/50 p-4 rounded-xl space-y-3 font-sans">
                  <span className="text-[12px] font-black uppercase text-[#9f5700] tracking-wider block font-sans">Định vị vai trò & Bản phác thảo nghề nghiệp</span>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <p className="font-extrabold text-[#0d2f5c]">1. Lý do định vị bản thân theo Job Track này:</p>
                      <p className="text-slate-500 font-semibold pl-2.5 leading-relaxed border-l-2 border-amber-400 italic">
                        "{selectedMember.selfReflection.reason || 'Trống'}"
                      </p>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#0d2f5c]">2. Thử thách / Mong muốn vượt bậc:</p>
                      <p className="text-slate-500 font-semibold pl-2.5 leading-relaxed border-l-2 border-amber-400 italic">
                        "{selectedMember.selfReflection.currentView || 'Trống'}"
                      </p>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#0d2f5c]">3. Kế hoạch phát triển 12 tháng tới:</p>
                      <p className="text-slate-500 font-semibold pl-2.5 leading-relaxed border-l-2 border-amber-400 italic">
                        "{selectedMember.selfReflection.goal12Months || 'Trống'}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Co-sign form if pending */}
                {!selectedMember.cosigned ? (
                  <div className="bg-[#fcfdfe] border border-slate-200/95 rounded-xl p-5 space-y-4 font-sans text-left">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                      <span className="text-xs">🔑</span>
                      <h4 className="text-[11.5px] font-black text-[#0d2f5c] uppercase tracking-wider font-sans">Định biên & Co-sign</h4>
                    </div>

                    <div className="space-y-3.5 text-xs font-sans">
                      {isReviewReasonOpen ? (
                        /* When in review/feedback mode */
                        <div className="space-y-3.5">
                          {/* Box comment lý do yêu cầu - pushed on top of buttons */}
                          <textarea
                            value={reviewReasonInput}
                            onChange={(e) => setReviewReasonInput(e.target.value)}
                            rows={3}
                            placeholder="Nhập lý do hoặc ý kiến đóng góp ý kiến bổ sung tại đây để rà soát..."
                            className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold text-[11.5px] placeholder-slate-400 leading-normal"
                          />

                          {/* Action buttons kept clean, not enclosed in any sub-box */}
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setIsReviewReasonOpen(false);
                                setReviewReasonInput('');
                              }}
                              className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-extrabold text-[10px] uppercase tracking-wider px-4 py-3 rounded-lg transition cursor-pointer bg-white"
                            >
                              Đóng xem xét
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleRejectMember(selectedMember.id, reviewReasonInput || undefined);
                                setIsReviewReasonOpen(false);
                                setReviewReasonInput('');
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-[10px] uppercase tracking-wider py-3 rounded-lg shadow-3xs hover:shadow-2xs transition cursor-pointer"
                            >
                              Xác nhận và thông báo IG
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Standard mode when isReviewReasonOpen is false */
                        <div className="flex gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsReviewReasonOpen(true)}
                            disabled={selectedMember.smStatus === 'rejected'}
                            className="border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed font-extrabold text-[10px] uppercase tracking-wider px-4 py-3 rounded-lg transition cursor-pointer bg-white"
                          >
                            Xem xét thêm
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleCosignMember(selectedMember.id, smFeedbackInput || 'Đồng ý phê duyệt định vị lộ trình Job Track này.');
                            }}
                            disabled={selectedMember.smStatus === 'rejected'}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0077ed] hover:bg-[#0064c7] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-[10px] uppercase tracking-wider py-3 rounded-lg shadow-3xs hover:shadow-2xs transition cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" /> KÝ XÁC NHẬN CO-SIGN
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50/55 border border-emerald-200 rounded-xl p-5 space-y-3 relative overflow-hidden font-sans">
                    {/* Stamper */}
                    <div className="absolute right-5 top-2.5 w-16 h-14 rounded-full border-2 border-emerald-600/30 flex items-center justify-center rotate-12 select-none pointer-events-none">
                      <span className="text-[7.5px] font-black text-emerald-600/30 uppercase tracking-widest text-center leading-tight">
                        APPROVED<br/>ILEAD SM
                      </span>
                    </div>

                    <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span className="font-extrabold text-[10px] text-emerald-800 uppercase tracking-wider">
                        Ý kiến phê duyệt hành trình sự nghiệp chính thức
                      </span>
                      {selectedMember.cosignedAt && (
                        <span className="text-[9px] text-slate-400 font-bold ml-auto font-mono">{selectedMember.cosignedAt}</span>
                      )}
                    </div>
                    <div className="text-slate-700 text-xs italic font-semibold leading-relaxed">
                      "{selectedMember.smFeedback || 'Đồng ý phê duyệt định vị lộ trình Job Track này. Chúc đồng chí bền bỉ hoàn thành rực rỡ các chặng kế tiếp dWork & Depth Track.'}"
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
          )}

          {/* SUBTAB 2: Members Directory Dashboard */}
          {smSubTab === 'team' && (() => {
            const teamDetails = [
              {
                id: 'L-2841',
                name: 'Minh Trần',
                grade: 'B3',
                jobTrack: 'PD×BIS×SWE×BE',
                span: 'S1',
                bmi: '3.2',
                bmiStatus: 'self_done',
                icm: 'L2',
                idp: 65,
                sbi: 5,
                qualify: false,
                status: 'Onboarding',
                initials: 'MT',
                avatarBg: 'bg-[#00a8cc] text-white',
                buddy: 'green',
                coe: 'green',
                facilitator: 'green',
                sosOk: true
              },
              {
                id: 'L-2790',
                name: 'Phạm Linh',
                grade: 'B4',
                jobTrack: 'DC×GTM×P&D×PM',
                span: 'S2',
                bmi: '3.8',
                bmiStatus: 'calibrated',
                icm: 'L3',
                idp: 82,
                sbi: 8,
                qualify: true,
                status: 'Active',
                initials: 'PL',
                avatarBg: 'bg-[#00b074] text-white',
                buddy: 'green',
                coe: 'green',
                facilitator: 'green',
                sosOk: true
              },
              {
                id: 'L-2815',
                name: 'Ngô Hải',
                grade: 'B2',
                jobTrack: 'PS×BIS×D&AI×DE',
                span: 'S1',
                bmi: '2.1',
                bmiStatus: 'pending',
                icm: 'L1',
                idp: 40,
                sbi: 2,
                qualify: false,
                status: 'Active',
                initials: 'NH',
                avatarBg: 'bg-[#008f8f] text-white',
                buddy: 'green',
                coe: 'red',
                facilitator: 'green',
                sosOk: false
              },
              {
                id: 'L-2856',
                name: 'Lê Trang',
                grade: 'B1',
                jobTrack: 'Chưa có',
                span: 'S1',
                bmi: '—',
                bmiStatus: 'pending',
                icm: 'L1',
                idp: 0,
                sbi: 0,
                qualify: false,
                status: 'Onboarding',
                initials: 'LT',
                avatarBg: 'bg-[#00a2c3] text-white',
                buddy: 'red',
                coe: 'red',
                facilitator: 'red',
                sosOk: false
              },
              {
                id: 'L-2798',
                name: 'Vũ Đức',
                grade: 'B4',
                jobTrack: 'CG×IPAG×CS×SOC',
                span: 'S2',
                bmi: '3.5',
                bmiStatus: 'calibrated',
                icm: 'L3',
                idp: 78,
                sbi: 7,
                qualify: true,
                status: 'Active',
                initials: 'VĐ',
                avatarBg: 'bg-[#02a0a0] text-white',
                buddy: 'green',
                coe: 'green',
                facilitator: 'green',
                sosOk: true
              }
            ];

            return (
              <div className="space-y-4.5 w-full animate-fade-in text-left">
                
                {/* 0. Dashboard Overview Stats & Graphs from Image 1 */}
                <div className="flex items-center justify-between pb-0.5 select-none">
                  <h3 className="text-xs font-bold text-[#324157] font-sans">
                    Tổng quan sức khỏe phát triển đội ngũ • 5 thành viên
                  </h3>
                </div>

                {/* 5 KPI Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {/* Card 1: Thành viên */}
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0062ff] flex items-center justify-center shrink-0">
                        <Users className="w-3.5 h-3.5 stroke-[2.25]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-sans">Thành viên</span>
                    </div>
                    <div className="mt-2.5 text-left">
                      <div className="text-[24px] font-black text-slate-900 leading-none font-sans">5</div>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">2 onboarding</span>
                    </div>
                  </div>

                  {/* Card 2: BMI Trung bình */}
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                        <Activity className="w-3.5 h-3.5 stroke-[2.25]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-sans">BMI Trung bình</span>
                    </div>
                    <div className="mt-2.5 text-left">
                      <div className="text-[24px] font-black text-slate-900 leading-none font-sans">3.1</div>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">1 dưới ngưỡng</span>
                    </div>
                  </div>

                  {/* Card 3: Qualify Flag */}
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Award className="w-3.5 h-3.5 stroke-[2.25]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-sans">Qualify Flag</span>
                    </div>
                    <div className="mt-2.5 text-left">
                      <div className="text-[24px] font-black text-slate-900 leading-none font-sans">2/5</div>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block font-sans">đủ điều kiện</span>
                    </div>
                  </div>

                  {/* Card 4: Chờ duyệt */}
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                        <CalendarClock className="w-3.5 h-3.5 stroke-[2.25]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-sans">Chờ duyệt</span>
                    </div>
                    <div className="mt-2.5 text-left">
                      <div className="text-[24px] font-black text-slate-900 leading-none font-sans">0</div>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block truncate">Span · Job Track · IDP</span>
                    </div>
                  </div>

                  {/* Card 5: NAC Active */}
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <BellRing className="w-3.5 h-3.5 stroke-[2.25]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 font-sans">NAC Active</span>
                    </div>
                    <div className="mt-2.5 text-left">
                      <div className="text-[24px] font-black text-slate-900 leading-none font-sans">4</div>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">2 coverage gap</span>
                    </div>
                  </div>
                </div>

                {/* Grid for BMI Calibration & IDP Band Gate */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4.5 select-none font-sans">
                  
                  {/* Left: BMI Calibration Q2 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex flex-col justify-between lg:col-span-5">
                    <div>
                      {/* Header */}
                      <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 bg-white">
                        <Activity className="w-4.5 h-4.5 text-orange-500 stroke-[2.25]" />
                        <h4 className="font-extrabold text-[13.5px] text-slate-800 uppercase tracking-wider">
                          BMI Calibration Q2
                        </h4>
                      </div>

                      {/* 3 mini items layout */}
                      <div className="grid grid-cols-3 gap-2.5">
                        {/* Subcard 1: Pending */}
                        <div className="bg-[#fcfdfe] border border-slate-100 hover:bg-slate-50/50 transition-colors py-3 px-1.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1 shadow-4xs">
                          <Hourglass className="w-3.5 h-3.5 text-slate-400" />
                          <div className="text-[22px] font-black text-slate-800 leading-none font-sans">2</div>
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase leading-none">Pending</span>
                        </div>

                        {/* Subcard 2: Self Done */}
                        <div className="bg-[#fffcf7] border border-orange-100/70 hover:bg-[#fffcf7] transition-colors py-3 px-1.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1 shadow-4xs">
                          <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                          <div className="text-[22px] font-black text-slate-800 leading-none font-sans">1</div>
                          <span className="text-[9px] text-orange-600 font-extrabold uppercase leading-none">Self Done</span>
                        </div>

                        {/* Subcard 3: Calibrated */}
                        <div className="bg-[#f5fffb] border border-emerald-100/70 hover:bg-[#ebfff7] transition-colors py-3 px-1.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1 shadow-4xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <div className="text-[22px] font-black text-slate-800 leading-none font-sans">2</div>
                          <span className="text-[9px] text-emerald-600 font-extrabold uppercase leading-none">Calibrated</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: IDP & Band Gate 4 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 bg-white">
                        <Flag className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500 stroke-[2.25]" />
                        <h4 className="font-extrabold text-[13.5px] text-slate-800 uppercase tracking-wider">
                          IDP & Band Gate 4
                        </h4>
                      </div>

                      {/* Members Progress Stack */}
                      <div className="space-y-2 font-sans">
                        {[
                          { name: "Minh Trần", initials: "MT", value: 65, color: "bg-blue-500", locked: true },
                          { name: "Phạm Linh", initials: "PL", value: 82, color: "bg-emerald-500", locked: false },
                          { name: "Ngô Hải", initials: "NH", value: 40, color: "bg-orange-500", locked: true },
                          { name: "Lê Trang", initials: "LT", value: 0, color: "bg-slate-350", locked: true },
                          { name: "Vũ Đức", initials: "VĐ", value: 78, color: "bg-blue-500", locked: true }
                        ].map((m, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4 py-1 border-b border-slate-50 last:border-b-0">
                            {/* Avatar & Name */}
                            <div className="flex items-center gap-2.5 w-32 shrink-0">
                              <div className={`w-6.5 h-6.5 rounded-full bg-teal-600 text-white font-extrabold text-[9px] flex items-center justify-center shrink-0`}>
                                {m.initials}
                              </div>
                              <span className="text-xs font-bold text-slate-700 truncate text-left">{m.name}</span>
                            </div>

                            {/* Progress bar */}
                            <div className="flex-1 flex items-center gap-2.5">
                              <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                                <div className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${m.color}`} style={{ width: `${m.value}%` }} />
                              </div>
                              <span className={`text-[11px] font-extrabold w-8 text-right font-sans ${m.value > 0 ? (m.value >= 80 ? 'text-emerald-600' : 'text-slate-700') : 'text-slate-400'}`}>
                                {m.value}%
                              </span>
                            </div>

                            {/* Lock/Unlock status flag */}
                            <div className="w-8 flex justify-end">
                              {m.locked ? (
                                <Lock className="w-3 h-3 text-slate-350 stroke-[2.25]" />
                              ) : (
                                <Unlock className="w-3 h-3 text-emerald-500 stroke-[2.25]" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1. Chi tiết thành viên Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-3xs overflow-hidden">
                  <div className="bg-gradient-to-r from-[#f0f4ff]/55 to-white border-b border-[#dee2e6]/80 px-5 py-4 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    <span className="font-extrabold text-[14px] text-slate-800 uppercase tracking-wider">Chi tiết thành viên</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-sans text-xs min-w-[900px]">
                      <thead>
                        <tr className="bg-slate-50/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                          <th className="py-3 px-5 text-left font-bold">THÀNH VIÊN</th>
                          <th className="py-3 px-4 text-left font-bold">JOB TRACK</th>
                          <th className="py-3 px-4 text-center font-bold">SPAN</th>
                          <th className="py-3 px-4 text-center font-bold">BMI</th>
                          <th className="py-3 px-4 text-center font-bold">BMI STATUS</th>
                          <th className="py-3 px-4 text-center font-bold">ICM</th>
                          <th className="py-3 px-4 text-left font-bold w-[120px]">IDP</th>
                          <th className="py-3 px-4 text-center font-bold">SBI</th>
                          <th className="py-3 px-4 text-center font-bold">QUALIFY</th>
                          <th className="py-3 px-4 text-center font-bold">TRẠNG THÁI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100/70 font-semibold text-slate-700">
                        {teamDetails.map((member) => {
                          // Find original matched report to enable interactivity
                          const matchingReport = allMembers.find(m => m.name === member.name) || allMembers[0];

                          return (
                            <tr 
                              key={member.id}
                              onClick={() => {
                                setSmSubTab('inbox');
                                handleSelectMember(matchingReport.id, matchingReport);
                              }}
                              className="hover:bg-slate-50/50 transition cursor-pointer group"
                            >
                              <td className="py-3.5 px-5 flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full ${member.avatarBg} flex items-center justify-center font-extrabold text-[11px] shrink-0 shadow-3xs`}>
                                  {member.initials}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-[13px] text-slate-900 group-hover:text-primary transition leading-none">
                                    {member.name}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 font-semibold mt-1">
                                    {member.id} · {member.grade}
                                  </p>
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                {member.jobTrack === 'Chưa có' ? (
                                  <span className="text-amber-500 font-bold italic text-xs">Chưa có</span>
                                ) : (
                                  <span className="font-mono text-xs font-bold text-slate-600 tracking-tight">
                                    {member.jobTrack}
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                <span className="bg-indigo-50/70 border border-indigo-150/65 text-indigo-600 text-[10px] font-black font-mono px-2 py-0.5 rounded-full">
                                  {member.span}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-center font-bold font-mono">
                                {member.bmi === '2.1' ? (
                                  <span className="text-amber-500">{member.bmi}</span>
                                ) : member.bmi}
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                {member.bmiStatus === 'self_done' && (
                                  <span className="bg-amber-50 text-amber-600 border border-amber-200/50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    self_done
                                  </span>
                                )}
                                {member.bmiStatus === 'calibrated' && (
                                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    calibrated
                                  </span>
                                )}
                                {member.bmiStatus === 'pending' && (
                                  <span className="bg-slate-50 text-slate-400 border border-slate-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    pending
                                  </span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-center font-mono font-bold">
                                {member.icm}
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-[60px] bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-500 ${member.idp > 80 ? 'bg-emerald-500' : 'bg-primary'}`} 
                                      style={{ width: `${member.idp}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-500 w-7 text-right">{member.idp}%</span>
                                </div>
                              </td>

                              <td className="py-3.5 px-4 text-center font-mono font-bold">
                                {member.sbi === 2 ? (
                                  <span className="text-amber-500">{member.sbi}</span>
                                ) : member.sbi}
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                <span className="inline-flex items-center justify-center">
                                  {member.qualify ? (
                                    <svg className="w-5 h-5 text-emerald-500 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                  ) : (
                                    <svg className="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                                  )}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-center font-sans font-bold">
                                {member.status === 'Onboarding' ? (
                                  <span className="bg-blue-50/50 text-[#0062ff] border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-md font-sans">
                                    Onboarding
                                  </span>
                                ) : (
                                  <span className="bg-emerald-50/50 text-[#10B981] border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md font-sans">
                                    Active
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Bottom Grid: NAC Signals & SOS Coverage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
                  
                  {/* NAC Signals Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-103 bg-white">
                        <Bell className="w-4 h-4 text-rose-500 fill-rose-500" />
                        <h4 className="font-extrabold text-[14px] text-slate-900 uppercase tracking-wide">
                          NAC Signals
                        </h4>
                      </div>

                      {/* Signal List */}
                      <div className="space-y-3 font-sans">
                        
                        {/* Row 1: Minh Trần */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50/45 transition">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-amber-500 text-sm">⚠️</span>
                            <p className="text-xs text-slate-600 font-semibold truncate leading-normal">
                              <span className="font-extrabold text-slate-800">Minh Trần</span> BMI self-assessment sắp đến hạn
                            </p>
                          </div>
                          <span className="bg-amber-50 text-[#d97706] border border-amber-200/50 text-[10px] font-black px-2.5 py-0.5 rounded-md shrink-0 font-sans">
                            attention
                          </span>
                        </div>

                        {/* Row 2: Ngô Hải */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50/45 transition">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-rose-505 text-sm">🛑</span>
                            <p className="text-xs text-slate-600 font-semibold truncate leading-normal">
                              <span className="font-extrabold text-slate-800">Ngô Hải</span> SBI count thấp (2/3 minimum)
                            </p>
                          </div>
                          <span className="bg-rose-50 text-rose-700 border border-rose-100/60 text-[10px] font-black px-2.5 py-0.5 rounded-md shrink-0 font-sans">
                            need
                          </span>
                        </div>

                        {/* Row 3: Ngô Hải IDP */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50/45 transition">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-amber-500 text-sm">⚠️</span>
                            <p className="text-xs text-slate-600 font-semibold truncate leading-normal">
                              <span className="font-extrabold text-slate-800">Ngô Hải</span> IDP completion 40% — rất thấp
                            </p>
                          </div>
                          <span className="bg-amber-50 text-[#d97706] border border-amber-200/50 text-[10px] font-black px-2.5 py-0.5 rounded-md shrink-0 font-sans">
                            attention
                          </span>
                        </div>

                        {/* Row 4: Lê Trang */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50/45 transition">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-rose-505 text-sm">🛑</span>
                            <p className="text-xs text-slate-600 font-semibold truncate leading-normal">
                              <span className="font-extrabold text-slate-800">Lê Trang</span> Chưa khai báo Job Track
                            </p>
                          </div>
                          <span className="bg-rose-50 text-rose-700 border border-rose-100/60 text-[10px] font-black px-2.5 py-0.5 rounded-md shrink-0 font-sans">
                            need
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* SOS Coverage Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 bg-white">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-500 text-sm">🛡️</span>
                          <h4 className="font-extrabold text-[14px] text-slate-900 uppercase tracking-wide">
                            SOS Coverage
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 font-sans">
                          Min: Buddy + COE + Facilitator
                        </span>
                      </div>

                      {/* Content Rows */}
                      <div className="space-y-3 font-sans">
                        {teamDetails.map((member) => (
                          <div 
                            key={member.id}
                            className="flex items-center justify-between p-2 rounded-xl border border-slate-100 hover:bg-slate-50/30 transition"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-7 h-7 rounded-full ${member.avatarBg} flex items-center justify-center font-black text-[10px] shrink-0`}>
                                {member.initials}
                              </div>
                              <span className="font-extrabold text-slate-800 text-xs truncate">
                                {member.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Option Checkboxes / Tabs B C F */}
                              <div className="flex gap-1">
                                <span 
                                  title="Buddy"
                                  className={`w-6 h-6 rounded flex items-center justify-center text-[10.5px] font-black tracking-wide border transition select-none ${
                                    member.buddy === 'green'
                                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 text-center font-sans'
                                      : 'bg-rose-50 text-rose-600 border-rose-100 text-center font-sans'
                                  }`}
                                >
                                  B
                                </span>
                                <span 
                                  title="COE"
                                  className={`w-6 h-6 rounded flex items-center justify-center text-[10.5px] font-black tracking-wide border transition select-none ${
                                    member.coe === 'green'
                                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 text-center font-sans'
                                      : 'bg-rose-50 text-rose-600 border-rose-100 text-center font-sans'
                                  }`}
                                >
                                  C
                                </span>
                                <span 
                                  title="Facilitator"
                                  className={`w-6 h-6 rounded flex items-center justify-center text-[10.5px] font-black tracking-wide border transition select-none ${
                                    member.facilitator === 'green'
                                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 text-center font-sans'
                                      : 'bg-rose-50 text-rose-600 border-rose-100 text-center font-sans'
                                  }`}
                                >
                                  F
                                </span>
                              </div>

                              {/* Alert Check state icon */}
                              {member.sosOk ? (
                                <svg className="w-5 h-5 text-emerald-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                              ) : (
                                <svg className="w-4.5 h-4.5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                              )}
                            </div>

                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            );
          })()}

          {/* SUBTAB 3: dLINK Discussion Board */}
          {smSubTab === 'discussion' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs text-left grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[500px] animate-fade-in w-full">
              {/* Channels Sidebar List (4 cols) */}
              <div className="md:col-span-4 flex flex-col border-r border-slate-100 pr-0 md:pr-4 text-left font-sans">
                {/* div:nth-of-type(1) */}
                <div className="pb-1">
                  <h4 className="font-extrabold text-[16px] text-[#0d2f5c] tracking-tight font-sans">
                    Phòng thảo luận dLINK
                  </h4>
                </div>
                
                {/* div:nth-of-type(2) */}
                <div className="pb-4">
                  <span className="text-[11px] text-slate-400 font-extrabold block">
                    Kết nối tức thời 5 nhân sự
                  </span>
                </div>

                {/* div:nth-of-type(3) */}
                <div className="space-y-1.5 font-sans text-left flex-1 overflow-y-auto pr-1">
                  {[
                    {
                      id: 'L-2811',
                      name: 'Nguyễn Anh Tuấn',
                      previewText: 'Chào anh Minh, em đang hoàn thi...',
                      time: '10:30, 21/05',
                      initials: 'T'
                    },
                    {
                      id: 'L-2812',
                      name: 'Phạm Minh Hoa',
                      previewText: 'Chào anh Minh, em đã gửi kết quả...',
                      time: '14:15, 21/05',
                      initials: 'H'
                    },
                    {
                      id: 'L-2813',
                      name: 'Lê Hoàng Nam',
                      previewText: 'Anh Minh ơi, em vừa gửi đề xuất đ...',
                      time: '09:00, 22/05',
                      initials: 'N'
                    },
                    {
                      id: 'L-2814',
                      name: 'Trần Thu Hà',
                      previewText: 'Chào anh Minh, em đang hoàn thi...',
                      time: '11:00, 22/05',
                      initials: 'H'
                    },
                    {
                      id: 'L-2815',
                      name: 'Vũ Hoàng Lâm',
                      previewText: 'Chào anh Minh, em đã đạt đủ BMI...',
                      time: '13:30, 22/05',
                      initials: 'L'
                    },
                    {
                      id: 'L-2816',
                      name: 'Lê Trang',
                      previewText: 'Anh Minh ơi, em vừa submit khai b...',
                      time: '10:15, 23/05',
                      initials: 'T'
                    }
                  ].map((user, idx) => {
                    const isSelected = selectedChatUserId === user.id;
                    const isTargetElement = idx === 1; // Phạm Minh Hoa user is the second element under div:nth-of-type(3)
                    
                    // Build inline style or conditional style to strictly match CSS metadata for selector target
                    const customStyle = isTargetElement ? {
                      fontSize: '12px',
                      marginBottom: '20px',
                      paddingBottom: '12px',
                      paddingTop: '12px'
                    } : undefined;

                    return (
                      <div 
                        key={user.id}
                        onClick={() => setSelectedChatUserId(user.id)}
                        style={customStyle}
                        className={`group p-3 rounded-2xl flex gap-3 transition cursor-pointer text-left leading-normal border ${
                          isSelected 
                            ? 'bg-white border-slate-200 shadow-sm' 
                            : 'bg-transparent border-transparent hover:bg-slate-50'
                        }`}
                      >
                        {/* Avatar */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-[12px] shrink-0 bg-[#ecfdf5] text-[#10b981] border border-emerald-100`}>
                          {user.initials}
                        </div>

                        {/* Content text: Name + Message preview */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-800 text-[13px] truncate">{user.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{user.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-450 font-medium truncate mt-1 text-slate-500">
                            {user.previewText}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chat View Area (8 cols) */}
              <div className="md:col-span-8 flex flex-col justify-between bg-slate-50/50 p-5 rounded-2xl border border-slate-200 min-h-[460px] text-left">
                {(() => {
                  const currentUserDetails = [
                    { id: 'L-2811', name: 'Nguyễn Anh Tuấn', role: 'Fullstack Developer · dLINK Online', initials: 'T' },
                    { id: 'L-2812', name: 'Phạm Minh Hoa', role: 'Fullstack Developer · dLINK Online', initials: 'H' },
                    { id: 'L-2813', name: 'Lê Hoàng Nam', role: 'Fullstack Developer · dLINK Online', initials: 'N' },
                    { id: 'L-2814', name: 'Frontend Developer · dLINK Online', initials: 'H' },
                    { id: 'L-2815', name: 'Systems Analyst · dLINK Online', initials: 'L' },
                    { id: 'L-2816', name: 'Systems Engineer · dLINK Online', initials: 'T' }
                  ].find(u => u.id === selectedChatUserId) || { id: 'L-2813', name: 'Lê Hoàng Nam', role: 'Fullstack Developer · dLINK Online', initials: 'N' };

                  const currentMessages = messagesMap[selectedChatUserId] || [];

                  return (
                    <div className="flex-1 flex flex-col h-full justify-between">
                      {/* Active Chat Header */}
                      <div className="pb-3 border-b border-slate-200 flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-9 h-9 rounded-full bg-[#ecfdf5] text-[#10b981] border border-emerald-100 flex items-center justify-center font-extrabold text-[12px] shrink-0">
                            {currentUserDetails.initials}
                          </div>
                          <div className="text-left">
                            <h4 className="font-extrabold text-slate-800 text-[13.5px] font-sans">
                              {currentUserDetails.name}
                            </h4>
                            <p className="text-[10px] text-slate-450 mt-0.5 font-sans">
                              {currentUserDetails.role}
                            </p>
                          </div>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                      </div>

                      {/* Messages history feed */}
                      <div className="flex-1 overflow-y-auto space-y-4 py-4 max-h-[300px] text-[12.5px] pr-1 text-left w-full">
                        {currentMessages.map((msg) => {
                          const isMe = msg.sender === 'Đức Minh Trần';
                          
                          return (
                            <div key={msg.id} className="flex gap-2.5 items-start text-left">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-[#2ebd85] bg-[#ecfdf5] text-[11px] shrink-0">
                                {currentUserDetails.initials}
                              </div>
                              <div className="space-y-1.5 max-w-[85%] text-left">
                                <div className="p-3 bg-white border border-slate-200 rounded-tr-xl rounded-b-xl leading-relaxed text-slate-700 text-left font-sans shadow-3xs max-w-xl">
                                  {msg.text}
                                </div>
                                <div className="text-[10px] text-slate-400 pl-1 font-sans">
                                  {msg.time}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Send chat action */}
                      <div className="pt-3 border-t border-slate-200 flex gap-2 w-full">
                        <input
                          type="text"
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (!newMessageText.trim()) return;
                              setMessagesMap(prev => ({
                                ...prev,
                                [selectedChatUserId]: [
                                  ...(prev[selectedChatUserId] || []),
                                  {
                                    id: Date.now(),
                                    sender: 'Đức Minh Trần',
                                    text: newMessageText.trim(),
                                    time: '09:00, 22/05'
                                  }
                                ]
                              }));
                              setNewMessageText('');
                            }
                          }}
                          placeholder={`Gửi phản hồi dLINK cho ${currentUserDetails.name.split(' ').slice(-1)[0]}...`}
                          className="flex-1 py-2 px-4 bg-[#f8fafc] border border-slate-200 rounded-full font-semibold text-xs leading-normal focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newMessageText.trim()) return;
                            setMessagesMap(prev => ({
                              ...prev,
                              [selectedChatUserId]: [
                                ...(prev[selectedChatUserId] || []),
                                {
                                  id: Date.now(),
                                  sender: 'Đức Minh Trần',
                                  text: newMessageText.trim(),
                                  time: '09:00, 22/05'
                                }
                              ]
                            }));
                            setNewMessageText('');
                          }}
                          className="w-8 h-8 bg-[#02c074] hover:bg-[#02a061] text-white rounded-full flex items-center justify-center shadow-4xs transition shrink-0 cursor-pointer"
                        >
                          <svg className="w-4 h-4 text-white stroke-2 fill-none" viewBox="0 0 24 24" stroke="currentColor">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

        </div>
      );
    }

    // Abbreviations for selected tracks
    const ctAbbr = CAREER_TRACK_HIERARCHY[state.careerTrack || 'Product Design']?.abbr || 'PD';
    const fdAbbr = FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain)?.abbr || 'D&A';
    
    const getSpecialtyAbbr = (specName: string | null) => {
      if (!specName) return 'ARCH';
      if (specName.includes(' — ')) return specName.split(' — ')[0].trim();
      if (specName.includes('Architecture & Frontier')) return 'ARCH';
      if (specName.includes('Backend Engineer')) return 'BE';
      if (specName.includes('Client Engineering')) return 'CE';
      if (specName.includes('Quality Engineering')) return 'QE';
      if (specName.includes('Infrastructure Engineer')) return 'INF';
      if (specName.includes('Systems Specialist')) return 'SYS';
      if (specName.includes('DevOps Specialist')) return 'DO';
      return specName.substring(0, 4).toUpperCase();
    };
    
    const fsAbbr = getSpecialtyAbbr(state.functionSpecialty || 'Architecture & Frontier');

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs text-left space-y-6 max-w-4xl mx-auto font-sans">
        
        {/* Title Header with icon (Flat, no surrounding box) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 font-sans gap-3">
          <div className="flex items-center gap-3 font-sans">
            <span className="w-10 h-10 rounded-full bg-[#f0f6ff] flex items-center justify-center text-primary border border-blue-100 flex-shrink-0">
              <UserCheck className="w-5 h-5 stroke-[2]" />
            </span>
            <div>
              <h2 className="text-[18px] font-black text-[#0d2f5c] font-sans leading-none">Trạng thái phê duyệt Job Track</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-1">Lộ trình định danh sự nghiệp cá nhân</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            {state.cosigned && (
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg tracking-wider font-sans">
                ĐÃ KÝ CO-SIGN
              </span>
            )}
          </div>
        </div>

        {/* ────────── DYNAMIC SIMULATION BAR ────────── */}
        {!forceRole && (
          <div className="bg-slate-100 border border-slate-200 p-2 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans shadow-3xs">
            <div className="flex items-center gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0062ff] animate-ping"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-550">Giả lập vai trò kiểm thử:</span>
            </div>
            <div className="flex rounded-xl bg-slate-200/60 p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSimulatedRole('employee')}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  currentRole === 'employee'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                🙋‍♂️ Nhân viên / HRBP
              </button>
              <button
                type="button"
                onClick={() => setSimulatedRole('sm')}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  currentRole === 'sm'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-850'
                }`}
              >
                👔 Quản lý trực tiếp (SM)
              </button>
            </div>
          </div>
        )}

        {/* Horizontal Progress Stepper */}
        <div className="relative font-sans select-none my-6">
          <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[3px] bg-slate-200 hidden sm:block">
            <div className={`h-full bg-gradient-to-r transition-all duration-500 ${state.cosigned ? 'from-emerald-500 to-emerald-500 w-full' : 'from-emerald-500 to-amber-500 w-1/2'}`}></div>
          </div>

          <div className="grid grid-cols-3 gap-2 relative">
            
            {/* Step 1: Đã gửi Job Track */}
            <div className="flex flex-col items-center text-center space-y-2.5 font-sans">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xs z-10 border-[3.5px] border-emerald-100">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="space-y-1 font-sans">
                <p className="text-[11px] sm:text-xs font-extrabold text-slate-800 leading-tight">Đã gửi Job Track</p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">{state.submittedAt ? state.submittedAt.split(' - ')[0] : 'Hôm nay'} • {state.submittedAt ? state.submittedAt.split(' - ')[1] || '09:12' : '09:12'}</p>
              </div>
            </div>

            {/* Step 2: Chờ SM co-sign */}
            <div className="flex flex-col items-center text-center space-y-2.5 font-sans">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white z-10 border-[3.5px] transition-all duration-300 ${
                state.cosigned 
                  ? 'bg-emerald-500 border-emerald-100 shadow-2xs' 
                  : 'bg-amber-500 border-amber-100 shadow-xs ring-4 ring-amber-150 animate-pulse'
              }`}>
                {state.cosigned ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </div>
              <div className="space-y-1 font-sans">
                <p className={`text-[11px] sm:text-xs font-extrabold leading-tight ${state.cosigned ? 'text-slate-800' : 'text-amber-600'}`}>
                  {state.cosigned ? 'Yêu cầu được duyệt' : 'Chờ SM co-sign'}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">
                  {state.cosigned ? state.cosignedAt?.split(' - ')[0] || 'Xác nhận' : 'Đang chờ • SLA 48h'}
                </p>
              </div>
            </div>

            {/* Step 3: SM ký xác nhận */}
            <div className="flex flex-col items-center text-center space-y-2.5 font-sans">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-[3.5px] transition-all duration-300 ${
                state.cosigned 
                  ? 'bg-emerald-500 border-emerald-150 shadow-2xs ring-4 ring-emerald-100 text-white animate-fade-in' 
                  : 'bg-slate-100 border-slate-200 text-slate-400 shadow-3xs'
              }`}>
                <BadgeCheck className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1 font-sans">
                <p className={`text-[11px] sm:text-xs leading-tight font-sans ${state.cosigned ? 'text-emerald-600 font-black' : 'text-slate-400 font-black'}`}>
                  {state.cosigned ? 'Đã ký xác nhận' : 'SM ký xác nhận'}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium font-sans">
                  {state.cosigned ? state.cosignedAt?.split(' - ')[1] || '09:12' : 'Chờ SM'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Instructional Alert */}
        <div className="bg-[#f0f6ff]/60 border border-[#0062ff]/12 rounded-xl p-4 flex items-start gap-2.5 text-xs text-[#0f2d5a] font-medium leading-relaxed font-sans">
          <div className="flex gap-2.5 font-sans">
            <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5 font-sans">
              <Info className="w-4 h-4 text-primary" />
              <span className="text-xs select-none">💡</span>
            </div>
            <div className="font-sans">
              {state.cosigned ? (
                <span> Đề xuất Job Track của bạn đã được <strong className="font-extrabold text-[#0062ff]">SM {state.sm?.name} phê duyệt thành công</strong>!</span>
              ) : state.smStatus === 'rejected' ? (
                <span> Đề xuất Job Track của bạn <strong className="font-extrabold text-amber-600">cần xem xét lại</strong> theo yêu cầu phản hồi từ SM.</span>
              ) : (
                <span> Đề xuất Job Track của bạn đang được liên kết gửi đến Quản lý trực tiếp (SM) phê duyệt và co-sign.</span>
              )}
            </div>
          </div>
        </div>

        {/* ── SM REVISION REQUEST BOX ── */}
        {state.smStatus === 'rejected' && (
          <div className="bg-[#fffbeb] border border-amber-200 rounded-xl p-4 space-y-2 font-sans animate-fade-in shadow-4xs text-left w-full">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span className="font-extrabold text-xs text-amber-850 uppercase tracking-wider">
                SM cần bạn xem xét lại
              </span>
            </div>
            <div className="text-slate-600 text-xs italic font-medium leading-relaxed pl-5.5">
              "{state.smFeedback || 'SM yêu cầu xem xét lại định vị, vui lòng bổ sung đầy đủ 3 câu hỏi soi chiếu bản thân.'}"
            </div>
          </div>
        )}

        {/* ── JOB TRACK PREVIEW & STATUS ── */}
        {state.cosigned ? (
          <div className="space-y-6 animate-fade-in font-sans">
            {/* Top Info Bar from Image 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-4 mt-2">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-extrabold shadow-4xs shrink-0 bg-white">
                  <Layers className="w-5.5 h-5.5 text-emerald-555" />
                </span>
                <div>
                  <h2 className="text-[17px] font-black text-[#0d2f5c] leading-none">Job Track</h2>
                  <p className="text-[11px] text-slate-400 font-bold mt-1.5">Đã định vị thành công lộ trình nghề nghiệp</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="h-10 px-3 bg-amber-50/50 hover:bg-amber-50 border border-amber-200/60 rounded-xl flex items-center gap-1.5 text-[11px] text-amber-700 font-semibold transition-all">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Thay đổi chỉ cần SM phê duyệt (và thông báo tới IG)</span>
                </div>

                <button
                  type="button"
                  onClick={handleResetSubmit}
                  className="h-10 px-4 bg-[#011f5d] hover:bg-[#00143d] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs uppercase tracking-wide shrink-0"
                >
                  <Sliders className="w-4 h-4 rotate-90" />
                  Thay đổi
                </button>
              </div>
            </div>

            {/* 3 custom Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1: Career Track */}
              <div className="bg-[#f2f6fc] border border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group hover:bg-[#ebf1f9] transition-all duration-300">
                <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-widest font-mono">
                  CAREER TRACK (CT)
                </span>
                <div className="text-[36px] font-black text-[#0062ff] leading-none tracking-tight font-sans py-1 selection:bg-transparent">
                  {ctAbbr}
                </div>
                <span className="text-[13px] font-black text-[#324157]">
                  {state.careerTrack || 'Product Design'}
                </span>
              </div>

              {/* Card 2: Functional Domain */}
              <div className="bg-[#f2f6fc] border border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group hover:bg-[#ebf1f9] transition-all duration-300">
                <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-widest font-mono">
                  FUNCTIONAL DOMAIN (FD)
                </span>
                <div className="text-[36px] font-black text-amber-500 leading-none tracking-tight font-sans py-1 selection:bg-transparent">
                  {fdAbbr}
                </div>
                <span className="text-[13.5px] font-black text-[#324157] line-clamp-1">
                  {state.functionalDomain || 'Kiến tạo Sản phẩm & Trải nghiệm Số'}
                </span>
              </div>

              {/* Card 3: Functional Specialty */}
              <div className="bg-[#f2f6fc] border border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group hover:bg-[#ebf1f9] transition-all duration-300">
                <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-widest font-mono">
                  FUNC. SPECIALTY (FS)
                </span>
                <div className="text-[36px] font-black text-pink-500 leading-none tracking-tight font-sans py-1 selection:bg-transparent">
                  {fsAbbr}
                </div>
                <span className="text-[13.5px] font-black text-[#324157] line-clamp-1">
                  {state.functionSpecialty || 'Product Management'}
                </span>
              </div>

            </div>

            {/* Lịch sử thay đổi Job Track Section - Show ONLY IF multiple versions exist (state.isSecondSubmission is true) */}
            {state.isSecondSubmission && (
              <div className="space-y-4 pt-4 text-left border-t border-dashed border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0d2f5c] stroke-[2.25]" />
                  <h3 className="font-extrabold text-[15px] text-[#0d2f5c] uppercase tracking-wider">
                    Lịch sử thay đổi Job Track
                  </h3>
                </div>

                {/* Green border ledger list block from the image */}
                <div className="space-y-3">
                  {/* Active Version */}
                  <div className="bg-[#f5fffb] border border-[#a7f3d0]/60 rounded-xl p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-4xs">
                    {/* Left Group */}
                    <div className="flex items-center gap-3.5">
                      {/* Circle Badge v2 */}
                      <div className="w-10 h-10 rounded-full bg-[#10b981] text-white flex items-center justify-center text-sm font-black tracking-tight shrink-0 shadow-sm">
                        v2
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 leading-none">
                          <span className="text-[14.5px] font-black text-slate-800 font-mono tracking-wide">
                            {ctAbbr} × {fdAbbr} × {fsAbbr}
                          </span>
                          <span className="text-[9px] font-extrabold bg-[#e6fffa] text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-widest leading-none">
                            ĐANG ÁP DỤNG
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-500 font-semibold leading-relaxed">
                          Lý do: {state.changeReason || 'Điều chỉnh định hướng phát triển cá nhân theo yêu cầu dự án mới.'}
                        </p>
                      </div>
                    </div>

                    {/* Right Group: Time Info aligned to right */}
                    <div className="md:text-right shrink-0 border-t md:border-t-0 border-slate-200 pt-2.5 md:pt-0">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block font-sans">
                        Thời gian áp dụng
                      </span>
                      <span className="text-[12px] font-black text-slate-700 mt-1 block">
                        {state.cosignedAt?.split(' - ')[0] || 'Hôm nay'} → Hiện tại
                      </span>
                    </div>
                  </div>

                  {/* Previous Version V1 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-75 shadow-4xs">
                    {/* Left Group */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center text-sm font-black tracking-tight shrink-0 shadow-sm">
                        v1
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 leading-none">
                          <span className="text-[14.5px] font-black text-slate-600 font-mono tracking-wide">
                            {ctAbbr} × {fdAbbr} × SYS
                          </span>
                          <span className="text-[9px] font-extrabold bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full uppercase tracking-widest leading-none">
                            LƯU TRỮ
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                          Lý do: Khởi tạo Job Track ban đầu · Onboarding
                        </p>
                      </div>
                    </div>

                    {/* Right Group: Time Info aligned to right */}
                    <div className="md:text-right shrink-0 border-t md:border-t-0 border-slate-200 pt-2.5 md:pt-0">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block font-sans">
                        Thời gian áp dụng
                      </span>
                      <span className="text-[12px] font-black text-slate-500 mt-1 block">
                        02/03/2026 → {state.cosignedAt?.split(' - ')[0] || 'Hôm nay'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 font-sans select-none">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-[16px] font-black text-[#0d2f5c] uppercase tracking-wider flex items-center gap-2 font-sans">
                <Layers className="w-4 h-4 text-primary" /> Job track preview
              </h3>
              <span className="text-[10px] font-extrabold bg-[#e3f2fd] text-primary px-3 py-0.5 rounded-full border border-blue-100 font-sans">
                Thông tin đã đăng ký
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
              
              <div className="space-y-4 font-sans">
                
                <div className="flex flex-col gap-1.5 font-sans">
                  <span style={{ fontSize: '12px' }} className="text-slate-400 font-bold uppercase tracking-widest block font-sans">MANAGER (SM)</span>
                  {state.sm ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[9px] text-white font-extrabold ${state.sm.avatarBg}`}>
                          {state.sm.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-slate-800 block leading-tight">{state.sm.name}</span>
                          <span className="text-[10.5px] text-slate-500 font-medium leading-none">{state.sm.role} ({state.sm.branch})</span>
                        </div>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px]">
                      <div className="flex items-center gap-2.5 font-sans">
                        <span className="w-5.5 h-5.5 rounded-full border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 bg-slate-100">?</span>
                        <span>Chưa chọn Quản lý</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <span style={{ fontSize: '12px' }} className="text-slate-400 font-bold uppercase tracking-widest block font-sans">CAREER TRACK</span>
                  {state.careerTrack ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className="w-5.5 h-5.5 rounded-lg bg-[#0077ed] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                          {CAREER_TRACK_HIERARCHY[state.careerTrack]?.abbr || 'CT'}
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{state.careerTrack}</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px]">
                      <div className="flex items-center gap-2.5 font-sans">
                        <span className="w-5.5 h-5.5 rounded-lg border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 bg-slate-100">CT</span>
                        <span>Chưa chọn Career Track</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <span style={{ fontSize: '12px' }} className="text-slate-400 font-bold uppercase tracking-widest block font-sans">FUNCTIONAL DOMAIN</span>
                  {state.functionalDomain ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs font-sans">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className="w-5.5 h-5.5 rounded-lg bg-[#0077ed] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                          {FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain)?.abbr || 'FD'}
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{state.functionalDomain}</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-55 border border-emerald-100 flex items-center justify-center shrink-0 font-sans">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px]">
                      <div className="flex items-center gap-2.5 font-sans">
                        <span className="w-5.5 h-5.5 rounded-lg border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 bg-slate-100 font-mono">FD</span>
                        <span>Đang khóa - Chọn CT để mở</span>
                      </div>
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <span style={{ fontSize: '12px' }} className="text-slate-400 font-bold uppercase tracking-widest block font-sans">SPECIALTY</span>
                  {state.functionSpecialty ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs font-sans">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className="w-5.5 h-5.5 rounded-lg bg-[#1d9e75] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0 font-sans">
                          FS
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 line-clamp-1 font-sans">{state.functionSpecialty}</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0 font-sans">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px] font-sans">
                      <div className="flex items-center gap-2.5 font-sans font-mono">
                        <span className="w-5.5 h-5.5 rounded-lg border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 font-mono">FS</span>
                        <span>Đang khóa - Chọn FD để mở</span>
                      </div>
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  )}
                </div>

              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-3xs space-y-4 flex flex-col justify-start font-sans">
                <div className="text-[12px] font-black uppercase text-slate-500 tracking-wider pb-3 border-b border-slate-150 font-sans">
                  BẢN PHÁC THẢO TỰ ĐỊNH VỊ VAI TRÒ
                </div>
                
                <div className="space-y-3.5 text-[13px] text-slate-800 leading-relaxed font-sans pt-1">
                  <div>
                    <span className="font-extrabold text-[#0d2f5c] font-sans">Điều gì khiến tôi chọn lĩnh vực này:</span>{' '}
                    {state.selfReflection.reason ? (
                      <span className="text-slate-600 font-medium font-sans">{state.selfReflection.reason}</span>
                    ) : (
                      <span className="text-slate-400 font-medium font-sans italic">Chưa nhập</span>
                    )}
                  </div>
                  
                  <div>
                    <span className="font-extrabold text-[#0d2f5c] font-sans">Tôi đang nhìn nhận vị trí hiện tại của mình thế nào:</span>{' '}
                    {state.selfReflection.currentView ? (
                      <span className="text-slate-600 font-medium font-sans">{state.selfReflection.currentView}</span>
                    ) : (
                      <span className="text-slate-400 font-medium font-sans italic">Chưa nhập</span>
                    )}
                  </div>

                  <div>
                    <span className="font-extrabold text-[#0d2f5c] font-sans">Tôi muốn trở thành gì trong 12 tháng tới:</span>{' '}
                    {state.selfReflection.goal12Months ? (
                      <span className="text-slate-600 font-medium font-sans">{state.selfReflection.goal12Months}</span>
                    ) : (
                      <span className="text-slate-400 font-medium font-sans italic">Chưa nhập</span>
                    )}
                  </div>

                  {state.isSecondSubmission && (
                    <div className="space-y-1 bg-amber-50/15 border border-amber-200/50 p-3 rounded-lg mt-2">
                      <p className="font-extrabold text-[#9f5700] font-sans">Lý do thay đổi Job Track (Lần 2):</p>
                      <p className="text-slate-600 font-medium pl-2.5 border-l-2 border-amber-500 italic font-sans">
                        "{state.changeReason || 'Chưa điền lý do thay đổi.'}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── SM OFFICIAL DIRECTIVE CARD ── */}
        {state.cosigned && (
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-5 md:p-6 space-y-3.5 font-sans relative overflow-hidden animate-fade-in shadow-2xs">
            <div className="absolute right-6 top-4 w-18 h-18 rounded-full border-[3px] border-emerald-600/20 flex items-center justify-center rotate-12 select-none pointer-events-none hidden sm:flex">
              <span className="text-[10px] font-black text-emerald-600/30 uppercase tracking-wider text-center leading-tight">
                APPROVED<br/>ILEAD
              </span>
            </div>

            <div className="flex items-center gap-2.5 border-b border-emerald-100 pb-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="font-extrabold text-xs text-emerald-805 uppercase tracking-widest">
                Định hướng & Quyết định từ SM ({state.sm?.name})
              </span>
              <span className="text-[9.5px] text-slate-400 font-bold ml-auto">{state.cosignedAt}</span>
            </div>

            <div className="space-y-1.5 font-sans">
              <p className="text-[12.5px] text-slate-700 italic font-medium leading-relaxed pl-1">
                "{state.smFeedback || 'Đồng ý phê duyệt định vị lộ trình Job Track này. Chúc Minh hoàn thành tốt mọi chặng chuyển đổi kế tiếp để thăng tiến rực rỡ.'}"
              </p>
              <div className="text-[10px] text-slate-450 font-bold pt-1.5 pl-1 flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 font-sans"></span>
                Đề xuất Job Track chính thức liên kết với Tài khoản IDP & Depth Track của bạn.
              </div>
            </div>
          </div>
        )}

        {/* Bottom Panel Actions */}
        <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans select-none">
          {state.smStatus === 'rejected' ? (
            <button
              type="button"
              onClick={handleResetSubmit}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0d2f5c] hover:bg-[#002868] text-white rounded-xl text-xs font-extrabold uppercase tracking-widest shadow-md active:scale-95 transition cursor-pointer font-sans"
            >
              <Edit2 className="w-4 h-4 text-white" /> Xem và chỉnh sửa
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetSubmit}
              disabled={true}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-slate-600 text-xs font-bold transition shadow-xs cursor-pointer w-full sm:w-auto bg-white"
              title={state.cosigned ? 'Hồ sơ đã được duyệt' : 'Hồ sơ đang chờ duyệt, không thể chỉnh sửa'}
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-550" /> {state.cosigned ? 'Chỉnh sửa' : 'Chỉnh sửa'}
            </button>
          )}
          
          {state.cosigned ? (
            <button
              type="button"
              onClick={onGoToDashboard}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider w-full sm:w-auto shadow-xs active:scale-95 transition cursor-pointer font-sans"
            >
              <Check className="w-4 h-4 stroke-[2.5]" /> VÀO DASHBOARD PHÁT TRIỂN
            </button>
          ) : state.smStatus === 'rejected' ? (
            <div className="text-[11px] text-amber-700 bg-amber-50/50 border border-amber-200 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Yêu cầu xem xét bổ sung phản hồi
            </div>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fffaeb] text-[#f59e0b] border border-amber-200 rounded-xl text-xs font-black uppercase tracking-wider w-full sm:w-auto shadow-4xs animate-pulse font-sans"
            >
              <Hourglass className="w-4.5 h-4.5 text-[#f59e0b] animate-spin" /> Đang chờ SM co-sign
            </button>
          )}
        </div>

        {/* ────────── HISTORY LEAD LEDGER MODAL ────────── */}
        {isHistoryOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in select-none">
            <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-slide-up">
              {/* Modal Header */}
              <div className="px-6 py-5 bg-[#fafbfd] border-b border-slate-200 flex items-center justify-between text-left font-sans">
                <div className="flex items-center gap-2 font-sans">
                  <Clock className="w-5 h-5 text-[#0062ff]" />
                  <div>
                    <h3 className="text-sm font-black text-[#011638] uppercase tracking-wide">
                      Lịch sử phê duyệt Job Track
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">Mã định danh Ledger: ESB-JT-L2841</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body / History Steps */}
              <div className="p-6 text-left space-y-5 max-h-[380px] overflow-y-auto font-sans">
                
                {/* Timeline item 3 (Live Co-signed) if applicable */}
                {state.cosigned && (
                  <div className="relative pl-6 pb-2">
                    <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-emerald-100 -ml-px"></div>
                    <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white shadow-3xs flex items-center justify-center font-sans">
                      <Check className="w-2 h-2 text-white stroke-[3.5]" />
                    </div>
                    <div className="space-y-1 font-sans font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#002868] uppercase tracking-wider font-sans">Đã hoàn tất Co-sign</span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">Thao tác ký số</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-normal font-sans">
                        Supervisor trực tiếp <strong className="text-slate-800">{state.sm?.name || "Nguyễn Anh Minh"}</strong> thực hiện phê duyệt chính thức và ký số lưu huân chương sự nghiệp.
                      </p>
                      <span className="text-[9.5px] font-mono bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-black uppercase tracking-wide inline-block mt-1 font-sans">
                        Lịch sử: {state.submittedAt || "Mới nhận việc"} (Verified)
                      </span>
                    </div>
                  </div>
                )}

                {/* Timeline item 2 (Submitted for approval) */}
                {state.submitted && (
                  <div className="relative pl-6 pb-2 font-sans font-sans">
                    <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-slate-100 -ml-px font-sans font-sans"></div>
                    <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-blue-500 border border-white shadow-3xs flex items-center justify-center font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </div>
                    <div className="space-y-1 font-sans font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider font-sans">Đã gửi Đề xuất</span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">User Trần Minh</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-normal font-sans font-sans">
                        Lập bản đồ Career Path và SBU: <strong className="text-slate-800">{state.careerTrack} &gt; {state.functionSpecialty}</strong>. Trình hồ sơ đến đại diện Quản lý SBU.
                      </p>
                      {state.smStatus === 'rejected' && (
                        <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-xs mt-1.5 font-medium italic font-sans font-sans">
                          SM phản hồi yêu cầu xem xét lại: "{state.smFeedback}"
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline item 1 (Draft created) */}
                <div className="relative pl-6 font-sans font-sans">
                  <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-slate-200 border border-white shadow-3xs flex items-center justify-center font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  </div>
                  <div className="space-y-1 font-sans font-sans">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wider font-sans">Khởi tạo Dự thảo</span>
                      <span className="text-[10px] text-slate-450 font-sans font-bold">Hệ thống</span>
                    </div>
                    <p className="text-xs text-slate-505 leading-normal font-sans font-sans">
                      Hồ sơ Job Track được khởi tạo thành công theo chính sách ESB 7 ngày thử việc từ HRBP của Group.
                    </p>
                    <span className="text-[9.5px] text-slate-400 font-bold block pt-0.5 mt-1 font-sans font-sans">
                      3 ngày trước • Trạng thái lưu nháp cục bộ hoàn chỉnh
                    </span>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-5.5 bg-[#fbfcfd] border-t border-slate-200 flex justify-end font-sans">
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="px-5 py-2.5 bg-[#0062ff] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-4xs cursor-pointer font-sans"
                >
                  Đóng lịch sử
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // Render unified setup form
  const selectedFdObj = FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain);

  return (
    <div className="space-y-6">
      
      {/* 2-Column Responsive Layout matching mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* ────────── LEFT COLUMN (FORMS) ────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* BLOCK: QUẢN LÝ TRỰC TIẾP (SM) - EXQUISITE BLUE INTEGRATED CARD (NON-SPLIT) */}
          <div className={`bg-[#f0f6ff]/60 border-2 border-[#0062ff]/15 rounded-2xl p-5 md:p-6 space-y-4 relative shadow-2xs ${isSmOpen ? 'z-40' : 'z-20'}`}>
            
            {/* Unified Header */}
            <div className="flex items-start gap-3">
              <div className="w-8.5 h-8.5 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0 border border-blue-200/40">
                <Bell className="w-4.5 h-4.5 text-primary" />
              </div>
              <div className="space-y-1 select-none">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-[#0d2f5c] text-[16px] uppercase tracking-wide font-sans">QUẢN LÝ TRỰC TIẾP (SM) PHÊ DUYỆT</h3>
                  <span className="inline-block bg-primary text-white font-extrabold text-[10px] tracking-wider px-2 py-0.5 rounded-md uppercase font-sans shrink-0">
                    Bắt Buộc Lần Đầu
                  </span>
                </div>
                <p className="text-[12px] text-[#324157] font-normal leading-normal font-sans">
                  Chỉ định SM trực tiếp dự kiến phê duyệt đề xuất Job Track để kích hoạt luồng co-sign học tập & phát triển mới.
                </p>
              </div>
            </div>

            {/* Input Selection Dropdown */}
            <div className="relative font-sans pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsSmOpen(!isSmOpen);
                  setIsCtOpen(false);
                  setIsFdOpen(false);
                  setIsFsOpen(false);
                }}
                className="w-full px-4 py-3 bg-white border border-[#0062ff]/35 focus:border-[#0062ff] rounded-xl text-left flex items-center justify-between text-xs transition-all focus:outline-none focus:ring-2 focus:ring-[#0062ff]/10 cursor-pointer shadow-3xs"
              >
                <span className="flex items-center gap-2.5">
                  {state.sm ? (
                    <>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-white text-[9px] ${state.sm.avatarBg}`}>
                        {state.sm.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <span className="font-extrabold text-slate-900">{state.sm.name}</span>
                      <span className="text-[11px] text-[#525d7e] font-normal">• {state.sm.role} ({state.sm.branch})</span>
                    </>
                  ) : (
                    <span className="text-slate-400 font-semibold font-sans">-- Chọn quản lý dự kiến của bạn --</span>
                  )}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-primary" />
              </button>

              {isSmOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 opacity-100">
                  {availableSMs.map((sm) => (
                    <button
                      key={sm.id}
                      type="button"
                      onClick={() => handleSelectSM(sm)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs border-b border-slate-50 last:border-0 cursor-pointer text-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center font-bold text-white text-[10px] ${sm.avatarBg}`}>
                          {sm.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900">{sm.name}</div>
                          <div className="text-[10px] text-[#626d9c] font-semibold">{sm.role} · {sm.branch}</div>
                        </div>
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-50 text-primary rounded-md">
                        {sm.sbu}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Unified Timeline-Connected Config Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-10 relative">
            
            {/* Timeline Vertical Line Connector */}
            <div className="absolute left-[38px] md:left-[46px] top-[48px] bottom-[48px] w-[2px] bg-slate-100 z-0"></div>

            {/* BLOCK 2: CAREER TRACK (CT) */}
            <div className={`relative pl-12 md:pl-16 ${isCtOpen ? 'z-30' : 'z-10'}`}>
              {/* Timeline Circular Badge */}
              <div className={`absolute left-0 top-[6px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center font-bold font-mono text-xs transition-all ${
                state.careerTrack 
                  ? 'bg-gradient-to-r from-[#0077ed] to-[#60a5fa] text-white shadow-3xs' 
                  : 'bg-white border-2 border-primary text-primary shadow-3xs'
              }`}>
                {state.careerTrack ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-855 text-[14px] uppercase tracking-widest pl-0.5">CAREER TRACK (CT)</h3>
                
                <div className="relative font-sans">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCtOpen(!isCtOpen);
                      setIsSmOpen(false);
                      setIsFdOpen(false);
                      setIsFsOpen(false);
                    }}
                    className={`w-full text-left flex items-center justify-between text-xs transition-all focus:outline-none cursor-pointer ${
                      state.careerTrack 
                        ? 'border-[#0077ed] border-2 px-[15px] py-[11px] bg-white text-slate-900 font-semibold shadow-xs rounded-xl' 
                        : 'border border-slate-200 px-4 py-3 text-slate-400 hover:border-slate-300 bg-white rounded-xl'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {state.careerTrack ? (
                        <>
                          <div className="w-6 h-6 rounded-md bg-[#0077ed] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {CAREER_TRACK_HIERARCHY[state.careerTrack]?.abbr || 'CT'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-extrabold text-slate-900 text-[14px] block mb-0.5 leading-tight truncate">{state.careerTrack}</span>
                            <span className="text-slate-400 font-semibold text-[12px] block truncate">
                              {CAREER_TRACK_HIERARCHY[state.careerTrack]?.description}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 font-medium font-sans truncate">Chọn định hướng Career Track ban đầu...</span>
                      )}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isCtOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  {isCtOpen && (
                    <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 divide-y divide-slate-50">
                      {Object.keys(CAREER_TRACK_HIERARCHY).map((ctName) => {
                        const item = CAREER_TRACK_HIERARCHY[ctName];
                        const isSelected = state.careerTrack === ctName;
                        
                        return (
                          <button
                            key={ctName}
                            type="button"
                            onClick={() => handleSelectCT(ctName)}
                            className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs cursor-pointer ${
                              isSelected ? 'bg-blue-50/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0 pr-4">
                              <div className="w-6 h-6 rounded-md border font-black text-[10px] flex items-center justify-center shrink-0 bg-slate-100 text-slate-700">
                                {item.abbr}
                              </div>
                              <div className="min-w-0">
                                <div className="font-extrabold text-slate-900 text-[14px]">{ctName}</div>
                                <div className="text-[12px] text-slate-400 font-semibold leading-tight mt-0.5">{item.description}</div>
                              </div>
                            </div>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-white text-[9px] shrink-0">
                                <Check className="w-3 stroke-[3]" />
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

            {/* BLOCK 2: FUNCTIONAL DOMAIN (FD) */}
            <div className={`relative pl-12 md:pl-16 ${isFdOpen ? 'z-30' : 'z-10'}`}>
              {/* Timeline Circular Badge */}
              <div className={`absolute left-0 top-[6px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center font-bold font-mono text-xs transition-all ${
                !state.careerTrack 
                  ? 'bg-slate-100 border border-slate-200 text-slate-350' 
                  : state.functionalDomain 
                  ? 'bg-gradient-to-r from-[#0077ed] to-[#60a5fa] text-white shadow-3xs' 
                  : 'bg-slate-100 border-2 border-primary text-primary shadow-3xs'
              }`}>
                {!state.careerTrack ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : state.functionalDomain ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span>2</span>
                )}
              </div>

              <div className="space-y-3">
                <h3 className={`font-extrabold text-[14px] uppercase tracking-widest pl-0.5 ${state.careerTrack ? 'text-slate-855' : 'text-slate-400'}`}>
                  FUNCTIONAL DOMAIN (FD)
                </h3>
                
                <div className="relative font-sans">
                  <button
                    type="button"
                    disabled={!state.careerTrack}
                    onClick={() => {
                      setIsFdOpen(!isFdOpen);
                      setIsSmOpen(false);
                      setIsCtOpen(false);
                      setIsFsOpen(false);
                    }}
                    className={`w-full text-left flex items-center justify-between text-xs transition-all focus:outline-none cursor-pointer ${
                      !state.careerTrack 
                        ? 'bg-slate-100/50 border border-slate-200 px-4 py-3 text-slate-400 cursor-not-allowed opacity-75 rounded-xl' 
                        : state.functionalDomain 
                        ? 'border-[#0077ed] border-2 px-[15px] py-[11px] bg-white text-slate-900 font-semibold shadow-xs rounded-xl' 
                        : 'border border-slate-200 px-4 py-3 hover:border-slate-300 text-slate-400 bg-white rounded-xl'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {state.functionalDomain ? (
                        <>
                          <div className="w-6 h-6 rounded-md bg-[#0077ed] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain)?.abbr || 'FD'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-extrabold text-slate-900 text-[14px] block mb-0.5 leading-tight truncate">{state.functionalDomain}</span>
                            <span className="text-slate-400 font-semibold text-[12px] block truncate">
                              Lĩnh vực chuyên môn thuộc nhóm {(FUNCTIONAL_DOMAINS.find(fd => fd.name === state.functionalDomain)?.category || 'FD')} Group
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 font-medium font-sans truncate">
                          {state.careerTrack 
                            ? 'Chọn Functional Domain chuyên môn...' 
                            : 'Khóa - Hoàn tất CT để mở...'
                          }
                        </span>
                      )}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isFdOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  {isFdOpen && state.careerTrack && (
                    <div className="absolute z-25 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-80 overflow-y-auto py-1 divide-y divide-slate-50">
                      {FUNCTIONAL_DOMAINS.filter(fd => 
                        CAREER_TRACK_HIERARCHY[state.careerTrack]?.domains.includes(fd.name)
                      ).map((fd) => {
                        const isSelected = state.functionalDomain === fd.name;
                        return (
                          <button
                            key={fd.abbr}
                            type="button"
                            onClick={() => handleSelectFD(fd.name)}
                            className={`w-full text-left px-5 py-3.5 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs cursor-pointer ${
                              isSelected ? 'bg-blue-50/20' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-4">
                              <span className="w-6 h-6 border border-slate-300 rounded-md text-slate-800 font-extrabold text-[10px] flex items-center justify-center shrink-0 bg-slate-50">
                                {fd.abbr}
                              </span>
                              <div className="min-w-0">
                                <p className="font-extrabold text-slate-900 text-[14px] leading-tight mb-0.5">{fd.name}</p>
                                <span className="text-[12px] text-slate-400 font-semibold">
                                  Nhóm {fd.category} Group
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <span className="w-5.5 h-5.5 rounded-full bg-[#10b981] flex items-center justify-center text-white shrink-0 shadow-xs">
                                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
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

            {/* BLOCK 3: FUNCTION SPECIALTY (FS) */}
            <div className={`relative pl-12 md:pl-16 ${isFsOpen ? 'z-30' : 'z-10'}`}>
              {/* Timeline Circular Badge */}
              <div className={`absolute left-0 top-[6px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center font-bold font-mono text-xs transition-all ${
                !state.functionalDomain 
                  ? 'bg-slate-100 border border-slate-200 text-slate-350' 
                  : state.functionSpecialty 
                  ? 'bg-gradient-to-r from-[#0077ed] to-[#60a5fa] text-white shadow-3xs' 
                  : 'bg-slate-100 border-2 border-primary text-primary shadow-3xs'
              }`}>
                {!state.functionalDomain ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : state.functionSpecialty ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span>3</span>
                )}
              </div>

              <div className="space-y-3">
                <h3 className={`font-extrabold text-[14px] uppercase tracking-widest pl-0.5 ${state.functionalDomain ? 'text-slate-855' : 'text-slate-400'}`}>
                  FUNCTION SPECIALTY (FS)
                </h3>
                <div className="relative font-sans">
                  <button
                    type="button"
                    disabled={!state.functionalDomain}
                    onClick={() => {
                      setIsFsOpen(!isFsOpen);
                      setIsSmOpen(false);
                      setIsCtOpen(false);
                      setIsFdOpen(false);
                    }}
                    className={`w-full text-left flex items-center justify-between text-xs transition-all focus:outline-none cursor-pointer ${
                      !state.functionalDomain 
                        ? 'bg-slate-100/50 border border-slate-200 px-4 py-3 text-slate-400 cursor-not-allowed opacity-75 rounded-xl' 
                        : state.functionSpecialty 
                        ? 'border-[#0077ed] border-2 px-[15px] py-[11px] bg-white text-slate-900 font-semibold shadow-xs rounded-xl' 
                        : 'border border-slate-200 px-4 py-3 hover:border-slate-300 text-slate-400 bg-white rounded-xl'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {state.functionSpecialty ? (
                        <>
                          <div className="w-6 h-6 rounded-md bg-[#0077ed] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {state.functionSpecialty.includes(' — ') ? state.functionSpecialty.split(' — ')[0] : 'FS'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-extrabold text-slate-900 text-[14px] block mb-0.5 leading-tight truncate">{state.functionSpecialty}</span>
                            <span className="text-slate-400 font-semibold text-[12px] block truncate">
                              Chuyên môn sâu thuộc lĩnh vực {state.functionalDomain}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 font-medium font-sans truncate">
                          {state.functionalDomain 
                            ? 'Chọn Phân khúc Chuyên môn tương ứng...' 
                            : 'Khóa - Hoàn tất FD để mở...'
                          }
                        </span>
                      )}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isFsOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  {isFsOpen && state.careerTrack && state.functionalDomain && (
                    <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 divide-y divide-slate-50">
                      {(CAREER_TRACK_HIERARCHY[state.careerTrack]?.specialties[state.functionalDomain] || []).map((spec) => {
                        const isSelected = state.functionSpecialty === spec;
                        return (
                          <button
                            key={spec}
                            type="button"
                            onClick={() => handleSelectFS(spec)}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs cursor-pointer"
                          >
                            <span className="font-extrabold text-slate-800">{spec}</span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-white text-[9px] shrink-0">
                                <Check className="w-3 stroke-[3]" />
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

          </div>

          {/* Compact visual and lighter Questions card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <Lightbulb className="w-4.5 h-4.5 text-primary" />
              <h3 className="font-extrabold text-slate-850 text-[16px] uppercase tracking-wider">Phác thảo định vị vai trò & Bản phác thảo nghề nghiệp</h3>
            </div>

            <div className="space-y-4">
              
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug">
                  1. Điều gì thúc đẩy lớn nhất? {state.smStatus === 'pending' ? (
                    <span className="text-xs font-normal text-rose-500 font-sans">(Bắt buộc điền do SM yêu cầu sửa đổi)</span>
                  ) : (
                    <span className="text-xs font-normal text-slate-400 font-sans italic">(Tùy chọn)</span>
                  )}
                </label>
                <textarea
                  value={state.selfReflection.reason}
                  onChange={(e) => handleReflectionChange('reason', e.target.value)}
                  rows={2}
                  placeholder="Ví dụ: Tôi thấy hứng thú với việc phân tác dữ liệu, kinh doanh..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-medium placeholder-slate-400/90 leading-normal"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug">
                  2. Khó khăn hiện tại là gì? {state.smStatus === 'pending' ? (
                    <span className="text-xs font-normal text-rose-500 font-sans">(Bắt buộc điền do SM yêu cầu sửa đổi)</span>
                  ) : (
                    <span className="text-xs font-normal text-slate-400 font-sans italic">(Tùy chọn)</span>
                  )}
                </label>
                <textarea
                  value={state.selfReflection.currentView}
                  onChange={(e) => handleReflectionChange('currentView', e.target.value)}
                  rows={2}
                  placeholder="Ví dụ: Nắm vững lý thuyết nhưng thiếu cơ hội thực hành..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/45 transition-all font-medium placeholder-slate-400/90 leading-normal"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug">
                  3. Hình mẫu/Kế hoạch học tập & phát triển 12 tháng tới? {state.smStatus === 'pending' ? (
                    <span className="text-xs font-normal text-rose-500 font-sans">(Bắt buộc điền do SM yêu cầu sửa đổi)</span>
                  ) : (
                    <span className="text-xs font-normal text-slate-400 font-sans italic">(Tùy chọn)</span>
                  )}
                </label>
                <textarea
                  value={state.selfReflection.goal12Months}
                  onChange={(e) => handleReflectionChange('goal12Months', e.target.value)}
                  rows={2}
                  placeholder="Ví dụ: Đạt chứng chỉ chuyên nghiệp, làm việc độc lập..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/45 transition-all font-medium placeholder-slate-400/90 leading-normal"
                />
              </div>

              {/* Optional Change Flag (Second time or more) */}
              <div className="pt-3 border-t border-slate-100/60 pb-1 mt-2 flex flex-col gap-3">
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="checkbox-is-second-submission"
                    checked={!!state.isSecondSubmission}
                    onChange={(e) => {
                      onChange({
                        ...state,
                        isSecondSubmission: e.target.checked,
                        changeReason: e.target.checked ? (state.changeReason || '') : ''
                      });
                    }}
                    className="w-4 h-4 text-[#0077ed] bg-slate-50 border-slate-300 rounded focus:ring-primary/40 focus:ring-2 accent-[#0077ed] cursor-pointer cursor-pointer"
                  />
                  <div className="text-left">
                    <span className="text-xs font-black text-[#0d2f5c] block uppercase tracking-wide">Thay đổi Job Track (Lần 2 trở đi)</span>
                    <span className="text-[12px] font-normal text-[#324157] block leading-tight">Bật nếu đây là lượt điều chỉnh/thay đổi Job Track đã định vị trước đó.</span>
                  </div>
                </label>

                {state.isSecondSubmission && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-[12.5px] font-extrabold text-slate-800 flex items-center gap-1.5">
                      Lý do thay đổi Job Track <span className="text-xs font-extrabold text-rose-500 font-sans">*</span>
                    </label>
                    <textarea
                      id="input-change-reason"
                      value={state.changeReason || ''}
                      onChange={(e) => {
                        onChange({
                          ...state,
                          changeReason: e.target.value
                        });
                      }}
                      rows={2}
                      placeholder="Giải trình lý do bạn thay đổi định hướng/lộ trình nghề nghiệp so với định vị cũ..."
                      className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-medium placeholder-slate-400/90 leading-normal"
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* ────────── RIGHT COLUMN (STICKY PREVIEW & SUBMIT) ────────── */}
        <div className="lg:col-span-1 lg:sticky lg:top-0 space-y-6 pt-0 mt-0">
          
          <div className="bg-white border border-[#dee2e6] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col relative">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0062ff] to-[#10B981]"></div>
            {/* Shaded Header with dynamic badge, verified icon */}
            <div className="bg-gradient-to-r from-[#f0f4ff] to-white border-b border-[#dee2e6]/80 px-5 py-4.5 text-left">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0062ff] stroke-[2.25]" />
                <span className="font-extrabold text-[16px] text-slate-900 uppercase tracking-wider">Job Track Preview</span>
              </div>
              <p className="text-[11px] text-[#324157] font-semibold mt-1 font-sans">
                Cấu trúc định danh nghiệp vụ Job Track sẽ được tổng hợp tự động theo thời gian thực dưới đây
              </p>
            </div>

            {/* Sidebar body list */}
            <div className="p-5 space-y-5 font-sans">
              
              {/* Label - Value Pairs with visual icons */}
              <div className="space-y-4 text-xs font-semibold">
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">MANAGER (SM)</span>
                  {state.sm ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <div className="flex items-center gap-2 font-sans">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white font-extrabold ${state.sm.avatarBg}`}>
                          {state.sm.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <span className="text-xs font-extrabold text-slate-800">{state.sm.name}</span>
                      </div>
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans text-xs text-slate-400 italic">
                      <span>Chưa chọn Quản lý</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100/80 pt-3 flex flex-col gap-1.5 font-sans">
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">CAREER TRACK</span>
                  {state.careerTrack ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{state.careerTrack}</span>
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans text-xs text-slate-400 italic">
                      <span>Chưa chọn Career Track</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100/80 pt-3 flex flex-col gap-1.5 font-sans">
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">FUNCTIONAL DOMAIN</span>
                  {state.functionalDomain ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{state.functionalDomain}</span>
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-slate-50 border border-[#dee2e6]/50 p-2.5 rounded-xl font-sans text-xs text-slate-400 italic font-sans font-medium hover:text-slate-950">
                      <span>Đang khóa - Chọn CT để mở</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100/80 pt-3 flex flex-col gap-1.5 font-sans">
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">SPECIALTY</span>
                  {state.functionSpecialty ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{state.functionSpecialty}</span>
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-slate-50 border border-[#dee2e6]/50 p-2.5 rounded-xl font-sans text-xs text-slate-400 italic font-sans font-medium hover:text-slate-950">
                      <span>Đang khóa - Chọn FD để mở</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100/80 pt-3 flex flex-col gap-1.5 font-sans font-sans">
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">BẢN PHÁC THẢO TỰ ĐỊNH VỊ VAI TRÒ</span>
                  <div className="space-y-2.5 bg-slate-50 border border-slate-100 p-3 rounded-xl text-[12px] leading-relaxed text-left">
                    <div>
                      <span className="font-extrabold text-[#0d2f5c] block">1. Động lực lựa chọn:</span>
                      <span className="text-slate-600 block pl-1 italic font-medium">
                        {state.selfReflection.reason ? `"${state.selfReflection.reason}"` : "Chưa nhập..."}
                      </span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-2">
                      <span className="font-extrabold text-[#0d2f5c] block">2. Nhận thức hiện tại:</span>
                      <span className="text-slate-600 block pl-1 italic font-medium">
                        {state.selfReflection.currentView ? `"${state.selfReflection.currentView}"` : "Chưa nhập..."}
                      </span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-2">
                      <span className="font-extrabold text-[#0d2f5c] block">3. Mục tiêu 12 tháng tới:</span>
                      <span className="text-slate-600 block pl-1 italic font-medium">
                        {state.selfReflection.goal12Months ? `"${state.selfReflection.goal12Months}"` : "Chưa nhập..."}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Informative note */}
              <div className="bg-[#f0f5ff]/60 rounded-xl p-4 border border-blue-50 text-[12px] text-[#324157] leading-normal shadow-4xs font-normal font-sans">
                Hãy hoàn thành chọn cả 3 tiêu chí ở cột trái để tạo mã Job Track định danh nghề nghiệp
              </div>

              {/* Primary submit action */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full h-11 flex items-center justify-center gap-2.5 bg-primary hover:bg-[#0059e0] disabled:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer font-sans"
              >
                <Send className="w-4 h-4 text-white stroke-[2.25]" />
                GỬI SM KÍ XÁC NHẬN
              </button>

            </div>
          </div>

        </div>

      </div>

      {/* ────────── HISTORY LEAD LEDGER MODAL ────────── */}
      {isHistoryOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in select-none">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-slide-up">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#fafbfd] border-b border-slate-200 flex items-center justify-between text-left font-sans">
              <div className="flex items-center gap-2 font-sans">
                <Clock className="w-5 h-5 text-[#0062ff]" />
                <div>
                  <h3 className="text-sm font-black text-[#011638] uppercase tracking-wide">
                    Lịch sử phê duyệt Job Track
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Mã định danh Ledger: ESB-JT-L2841</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / History Steps */}
            <div className="p-6 text-left space-y-5 max-h-[380px] overflow-y-auto font-sans">
              
              {/* Timeline item 3 (Live Co-signed) if applicable */}
              {state.cosigned && (
                <div className="relative pl-6 pb-2">
                  <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-emerald-100 -ml-px font-sans"></div>
                  <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white shadow-3xs flex items-center justify-center font-sans">
                    <Check className="w-2 h-2 text-white stroke-[3.5]" />
                  </div>
                  <div className="space-y-1 font-sans">
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-xs font-black text-[#002868] uppercase tracking-wider">Đã hoàn tất Co-sign</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold animate-pulse">Thao tác ký số</span>
                    </div>
                    <p className="text-xs text-slate-505 leading-normal font-sans">
                      Supervisor trực tiếp <strong className="text-slate-800">{state.sm?.name || "Nguyễn Anh Minh"}</strong> thực hiện phê duyệt chính thức và ký số lưu huân chương sự nghiệp.
                    </p>
                    <span className="text-[9.5px] font-mono bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-black uppercase tracking-wide inline-block mt-1 font-sans">
                      Lịch sử: {state.submittedAt || "Mới nhận việc"} (Verified)
                    </span>
                  </div>
                </div>
              )}

              {/* Timeline item 2 (Submitted for approval) */}
              {state.submitted && (
                <div className="relative pl-6 pb-2 font-sans animate-fade-in">
                  <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-slate-100 -ml-px font-sans"></div>
                  <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-blue-500 border border-white shadow-3xs flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>
                  <div className="space-y-1 font-sans">
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Đã gửi Đề xuất</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">User Trần Minh</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal font-sans">
                      Lập bản đồ Career Path và SBU: <strong className="text-slate-800">{state.careerTrack} &gt; {state.functionSpecialty}</strong>. Trình hồ sơ đến đại diện Quản lý SBU.
                    </p>
                    {state.smStatus === 'rejected' && (
                      <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-xs mt-1.5 font-medium italic font-sans">
                        SM phản hồi yêu cầu xem xét lại: "{state.smFeedback}"
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline item 1 (Draft created) */}
              <div className="relative pl-6 font-sans">
                <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-slate-200 border border-white shadow-3xs flex items-center justify-center font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                </div>
                <div className="space-y-1 font-sans">
                  <div className="flex items-center justify-between font-sans">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Khởi tạo Dự thảo</span>
                    <span className="text-[10px] text-slate-450 font-sans font-bold">Hệ thống</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal font-sans">
                    Hồ sơ Job Track được khởi tạo thành công theo chính sách ESB 7 ngày thử việc từ HRBP của Group.
                  </p>
                  <span className="text-[9.5px] text-slate-400 font-bold block pt-0.5 mt-1 font-sans">
                    3 ngày trước • Trạng thái lưu nháp cục bộ hoàn chỉnh
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5.5 bg-[#fbfcfd] border-t border-slate-200 flex justify-end font-sans">
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="px-5 py-2.5 bg-[#0062ff] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-4xs cursor-pointer font-sans"
              >
                Đóng lịch sử
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
