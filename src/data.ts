import { SupervisorManager } from './types';

export const SUPERVISOR_MANAGERS: SupervisorManager[] = [
  {
    id: 'LKA',
    name: 'Lý Khắc Anh',
    role: 'SU Manager',
    branch: 'Saigon Tower',
    sbu: 'Non-IT',
    avatarBg: 'bg-indigo-600',
  },
  {
    id: 'NTH',
    name: 'Nguyễn Thị Hoa',
    role: 'BM',
    branch: 'Hà Nội Branch',
    sbu: 'Non-IT',
    avatarBg: 'bg-emerald-500',
  },
  {
    id: 'TVM',
    name: 'Trần Văn Minh',
    role: 'SU Manager',
    branch: 'Đà Nẵng Office',
    sbu: 'Non-IT',
    avatarBg: 'bg-amber-500',
  },
  {
    id: 'VTH',
    name: 'Vũ Thế Hưng',
    role: 'Managing Director',
    branch: 'Saigon Tower',
    sbu: 'Non-IT',
    avatarBg: 'bg-rose-500',
  },
  {
    id: 'NTM',
    name: 'Nguyễn Thanh Mỹ',
    role: 'VP Client Solutions',
    branch: 'Hà Nội Branch',
    sbu: 'Non-IT',
    avatarBg: 'bg-sky-500',
  },
  {
    id: 'KQL',
    name: 'Khương Quốc Lâm',
    role: 'Technical Lead',
    branch: 'Tech Hub Q7',
    sbu: 'IT',
    avatarBg: 'bg-purple-600',
  },
];

export const CAREER_TRACK_HIERARCHY: Record<
  string,
  {
    abbr: string;
    icon: string;
    description: string;
    domains: string[];
    specialties: Record<string, string[]>;
  }
> = {
  'Product Design': {
    abbr: 'PD',
    icon: 'Edit2',
    description: 'Designer mindset · tạo giá trị qua hoạt động thiết kế',
    domains: ['Kiến tạo Sản phẩm & Trải nghiệm Số', 'Nền tảng phân tích dữ liệu'],
    specialties: {
      'Kiến tạo Sản phẩm & Trải nghiệm Số': ['PM — Product Management', 'PX — Product Experience'],
      'Nền tảng phân tích dữ liệu': ['DS — Data Science']
    }
  },
  'Solution Engineer': {
    abbr: 'SE',
    icon: 'Wrench',
    description: 'Engineer mindset · xây dựng giải pháp end-to-end',
    domains: ['Phát triển Phần mềm', 'Nền tảng & Hạ tầng Công nghệ Số', 'An toàn Thông tin & An ninh Mạng'],
    specialties: {
      'Phát triển Phần mềm': ['Backend Engineer', 'Client Engineering'],
      'Nền tảng & Hạ tầng Công nghệ Số': ['Infrastructure Engineer', 'Database Engineer', 'Platform Engineer', 'SRE — Site Reliability Engineer', 'Digital Workplace', 'Service Management'],
      'An toàn Thông tin & An ninh Mạng': ['Security Assessment Engineer', 'Application Security Engineer', 'Security Platform Engineer', 'SOC — Security Operation Engineer', 'Security Architect']
    }
  },
  'Technology Enablement': {
    abbr: 'TE',
    icon: 'Award',
    description: 'Enabler mindset · vận hành hệ thống & đảm bảo tuân thủ',
    domains: ['Kiến tạo & Phát triển Năng lực Công nghệ', 'Nền tảng & Hạ tầng Công nghệ Số', 'An toàn Thông tin & An ninh Mạng'],
    specialties: {
      'Kiến tạo & Phát triển Năng lực Công nghệ': ['Architecture & Frontier', 'Tech Strategy', 'Quality Engineering'],
      'Nền tảng & Hạ tầng Công nghệ Số': ['Infrastructure Engineer', 'Database Engineer', 'Platform Engineer', 'SRE — Site Reliability Engineer', 'Digital Workplace', 'Service Management'],
      'An toàn Thông tin & An ninh Mạng': ['Security Assessment Engineer', 'Application Security Engineer', 'Security Platform Engineer', 'SOC — Security Operation Engineer', 'Security Architect']
    }
  },
  'Direct Client': {
    abbr: 'DC',
    icon: 'Users',
    description: 'Tư vấn & quan hệ khách hàng dài hạn',
    domains: ['Kiến tạo Sản phẩm & Trải nghiệm Số', 'Nền tảng phân tích dữ liệu'],
    specialties: {
      'Kiến tạo Sản phẩm & Trải nghiệm Số': ['PM — Product Management', 'PX — Product Experience'],
      'Nền tảng phân tích dữ liệu': ['DS — Data Science']
    }
  },
  'Professional Specialist': {
    abbr: 'PS',
    icon: 'Briefcase',
    description: 'Deliver xuất sắc & chuyên môn kỹ thuật sâu',
    domains: ['Phát triển Phần mềm', 'Nền tảng Dữ liệu & Trí tuệ Nhân tạo', 'An toàn Thông tin & An ninh Mạng'],
    specialties: {
      'Phát triển Phần mềm': ['Backend Engineer', 'Client Engineering'],
      'Nền tảng Dữ liệu & Trí tuệ Nhân tạo': ['DE — Data Engineering', 'DA — Data Analytics', 'AI Engineering'],
      'An toàn Thông tin & An ninh Mạng': ['Security Assessment Engineer', 'Application Security Engineer', 'Security Platform Engineer', 'SOC — Security Operation Engineer', 'Security Architect']
    }
  },
  'Capability Guardian': {
    abbr: 'CG',
    icon: 'ShieldCheck',
    description: 'Enable toàn bộ tổ chức',
    domains: ['Kiến tạo & Phát triển Năng lực Công nghệ', 'Nền tảng & Hạ tầng Công nghệ Số', 'An toàn Thông tin & An ninh Mạng'],
    specialties: {
      'Kiến tạo & Phát triển Năng lực Công nghệ': ['Architecture & Frontier', 'Tech Strategy', 'Quality Engineering'],
      'Nền tảng & Hạ tầng Công nghệ Số': ['Infrastructure Engineer', 'Database Engineer', 'Platform Engineer', 'SRE — Site Reliability Engineer', 'Digital Workplace', 'Service Management'],
      'An toàn Thông tin & An ninh Mạng': ['Security Assessment Engineer', 'Application Security Engineer', 'Security Platform Engineer', 'SOC — Security Operation Engineer', 'Security Architect']
    }
  },
  'Business Architecture': {
    abbr: 'BA',
    icon: 'Layers',
    description: 'Thiết kế tổ chức theo nhiệm vụ BIS',
    domains: ['Kiến tạo & Phát triển Năng lực Công nghệ', 'Kiến tạo Sản phẩm & Trải nghiệm Số', 'Nền tảng phân tích dữ liệu'],
    specialties: {
      'Kiến tạo & Phát triển Năng lực Công nghệ': ['Architecture & Frontier', 'Tech Strategy', 'Quality Engineering'],
      'Kiến tạo Sản phẩm & Trải nghiệm Số': ['PM — Product Management', 'PX — Product Experience'],
      'Nền tảng phân tích dữ liệu': ['DS — Data Science']
    }
  }
};

export interface FunctionalDomain {
  abbr: string;
  name: string;
  category: string;
  specialties: string[];
}

export const FUNCTIONAL_DOMAINS: FunctionalDomain[] = [
  {
    abbr: 'TS',
    name: 'Kiến tạo & Phát triển Năng lực Công nghệ',
    category: 'Technology',
    specialties: ['Architecture & Frontier', 'Tech Strategy', 'Quality Engineering']
  },
  {
    abbr: 'SWE',
    name: 'Phát triển Phần mềm',
    category: 'Technology',
    specialties: ['Backend Engineer', 'Client Engineering']
  },
  {
    abbr: 'P&D',
    name: 'Kiến tạo Sản phẩm & Trải nghiệm Số',
    category: 'Product',
    specialties: ['PM — Product Management', 'PX — Product Experience']
  },
  {
    abbr: 'P&I',
    name: 'Nền tảng & Hạ tầng Công nghệ Số',
    category: 'Platform',
    specialties: ['Infrastructure Engineer', 'Database Engineer', 'Platform Engineer', 'SRE — Site Reliability Engineer', 'Digital Workplace', 'Service Management']
  },
  {
    abbr: 'D&A',
    name: 'Nền tảng phân tích dữ liệu',
    category: 'Data',
    specialties: ['DS — Data Science']
  },
  {
    abbr: 'D&AI',
    name: 'Nền tảng Dữ liệu & Trí tuệ Nhân tạo',
    category: 'Data',
    specialties: ['DE — Data Engineering', 'DA — Data Analytics', 'AI Engineering']
  },
  {
    abbr: 'CS',
    name: 'An toàn Thông tin & An ninh Mạng',
    category: 'Security',
    specialties: ['Security Assessment Engineer', 'Application Security Engineer', 'Security Platform Engineer', 'SOC — Security Operation Engineer', 'Security Architect']
  }
];

export const MOCK_ONBOARDING_TASKS = [
  { id: '1', title: 'Hoàn thành hồ sơ nhân sự trên hệ thống ESB DMS', done: true, deadline: 'Day 1' },
  { id: '2', title: 'Tham gia lớp Định hướng Văn hóa doanh nghiệp (ESB Culture)', done: true, deadline: 'Day 3' },
  { id: '3', title: 'Khai báo lộ trình Job Track ban đầu với Supervisor (SM)', done: false, deadline: 'Day 7', highlight: true },
  { id: '4', title: 'Thi chứng chỉ nghiệp vụ Cơ bản (Securities Basic Certification)', done: false, deadline: 'Day 14' },
  { id: '5', title: 'Thiết lập mục tiêu IDP (Individual Development Plan) quý đầu tiên', done: false, deadline: 'Day 30' },
];

export const MOCK_RESOURCES = [
  { title: 'Sổ tay nhân sự ESB 2026', type: 'PDF', size: '4.2 MB', duration: '15 phút đọc' },
  { title: 'Video giới thiệu các SBU và Core Business', type: 'VIDEO', size: '18 phút', duration: 'Học mọi lúc' },
  { title: 'Bộ quy tắc ứng xử và bảo mật thông tin khách hàng', type: 'COURSE', size: '3 bài học', duration: 'Bắt buộc' },
];

export const MOCK_COMPETENCIES: Record<string, { desc: string; coreSkills: string[]; levels: Record<string, string[]> }> = {
  'Portfolio Advisory': {
    desc: 'Năng lực xây dựng, quản lý và tư vấn tái cấu trúc danh mục đầu tư hiệu quả cho khách hàng cá nhân hoặc tổ chức theo mức độ chấp nhận rủi ro tương ứng.',
    coreSkills: ['Asset Allocation Theory', 'Investment Analytics', 'Risk Tolerance Profiling', 'Rebalancing Tactics'],
    levels: {
      'S1': [
        'Hiển thị kiến thức cơ bản về các cấu trúc tài sản chính (Cổ phiếu, Trái phiếu, Tiền gửi).',
        'Biết cách thu thập thông tin và bảng câu hỏi kiểm tra khẩu vị rủi ro cơ bản của khách hàng.',
        'Hỗ trợ lập báo cáo định giá danh mục đầu tư hàng tuần dưới sự hướng dẫn.'
      ],
      'S2': [
        'Xây dựng thành thạo danh mục đầu tư mẫu (Model Portfolio) theo 3 cấp độ: Thận trọng, Cân bằng, Tăng trưởng.',
        'Độc lập tư vấn cấu trúc phân bổ tài sản cho các khách hàng phân khúc trung lưu.',
        'Sử dụng thành thạo phần mềm tối ưu danh mục và đọc hiểu các chỉ số rủi ro cơ bản (Sharpe, Beta, VaR).'
      ],
      'S3': [
        'Thiết kế giải pháp phân bổ độc quyền và phức tạp cho phân khúc Privilege Wealthy (HNWI).',
        'Có năng lực chủ trì các buổi hội thảo tư vấn thị trường và dự báo xu hướng dòng vốn quốc tế.',
        'Quản lý và dẫn dắt đội ngũ Advisor cấp dưới hoàn thành KPI về tỷ lệ duy trì khách hàng.'
      ],
      'S4': [
        'Chuyên gia cố vấn cấp tập đoàn về chiến lược phân bổ nguồn vốn liên kết đa kênh.',
        'Xây dựng các thuật toán AI/Robo-advisory nâng cao cho ứng dụng giao dịch tự động của ESB.',
        'Được chứng nhận kiểm định chất lượng đào tạo (Master Coach/Mentor) toàn hệ thống.'
      ]
    }
  },
  'Financial Planning': {
    desc: 'Lập kế hoạch tài chính trọn đời: từ bảo vệ dòng tiền, chi tiêu, tích lũy hưu trí, học vấn đến lập di chúc kế thừa tài sản.',
    coreSkills: ['Cashflow Management', 'Tax planning', 'Retirement Modeling', 'Estate & Succession planning'],
    levels: {
      'S1': ['Đọc hiểu các chỉ số tài chính cá nhân căn bản.', 'Sử dụng thuần thục công cụ tính toán lãi suất ghép và lập ngân sách chi tiêu.', 'Hỗ trợ khách hàng nhập liệu kế hoạch thu chi.'],
      'S2': ['Thiết kế bản kế hoạch tài chính toàn diện 5-10 năm cho hộ gia đình.', 'Đề xuất giải pháp bảo hiểm tích hợp khôn ngoan.', 'Phân tích điểm tín dụng và cách cơ cấu nợ vay tốt nhất.'],
      'S3': ['Tư vấn kế hoạch thuế cá nhân nâng cao và lập quỹ tín thác gia đình.', 'Xử lý các tình huống tài chính khủng hoảng hoặc chuyển giao tài sản phức tạp giữa các thế hệ.', 'Tham gia biên soạn quy trình chuẩn quốc tế cho dòng tư vấn tư nhân.'],
      'S4': ['Đạt các chuẩn mực quốc tế cao cấp như CFP (Certified Financial Planner) quốc tế.', 'Xây dựng dòng sản phẩm tài chính thế hệ mới.', 'Thành viên hội đồng thẩm định tiêu chuẩn tư vấn quốc gia.'],
    }
  },
  'Insurance Integration': {
    desc: 'Phối hợp các giải pháp bảo hiểm nhân thọ, phi nhân thọ để phòng vệ rủi ro sinh mạng, sức khỏe, tài sản vào sơ đồ phân bổ tài sản tổng thể.',
    coreSkills: ['Underwriting Principles', 'Claim Settlement Support', 'Policy Structured Audit', 'Corporate Key-Man Solutions'],
    levels: {
      'S1': ['Hiểu rõ tính chất quyền lợi của 5 dòng bảo hiểm phổ thông.', 'Giới thiệu đúng và đầy đủ biểu phí quyền lợi cốt lõi cho khách hàng.', 'Hướng dẫn khách hàng hoàn tất thủ tục bồi thường sự cố đơn giản.'],
      'S2': ['Thực hiện kiểm đếm và đối chiếu (Audit) phân tích lỗ hổng bảo vệ của các hợp đồng cũ khách hàng đang có.', 'Thiết kế gói bảo hiểm liên kết đầu tư (ILP) tối ưu dòng tiền tích lũy kết hợp bảo vệ quyền lợi sinh mạng.', 'Tổ chức các buổi đào tạo nội bộ kỹ năng tư vấn bảo hiểm cho tư vấn viên mới.'],
      'S3': ['Xây dựng giải pháp bảo hiểm chìa khóa vàng (Key-Man Insurance) bảo vệ ban lãnh đạo các doanh nghiệp đối tác.', 'Thẩm định độc lập các rủi ro tài chính lớn cho khách hàng siêu VIP.', 'Đàm phán trực tiếp với các đơn vị tái bảo hiểm lớn để thiết kế giải pháp may đo.'],
      'S4': ['Trực tiếp tham gia cùng đối tác thiết kế và phát hành các dòng sản phẩm đồng thương hiệu (Co-brand) độc quyền tại ESB.', 'Tác giả sách hoặc tài liệu đào tạo chuyên sâu về bảo hiểm đầu tư tại Việt Nam.', 'Kiến trúc sư hệ thống định phí bảo hiểm thông minh.'],
    }
  }
};
