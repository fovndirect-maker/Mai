import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  Hourglass,
  Lightbulb,
  Send,
  Home,
  Info,
  Search,
  TrendingUp,
  Users,
  Briefcase,
  Layers,
  Check,
  Edit2,
  Play,
  Calendar,
  UserCheck,
  Network,
  Award,
  Lock,
  Unlock,
  AlertTriangle,
  BadgeCheck,
  Bell,
  Eye,
  Clock,
  Zap,
  FileText,
  Sliders,
  Star,
  Activity,
  Flag,
  BellRing,
  CalendarClock,
  HelpCircle,
  Plus,
} from "lucide-react";
import { SupervisorManager, JobTrackData } from "../types";
import {
  SUPERVISOR_MANAGERS,
  CAREER_TRACK_HIERARCHY,
  FUNCTIONAL_DOMAINS,
} from "../data";

interface JobTrackWizardProps {
  state: JobTrackData;
  onChange: (newState: JobTrackData) => void;
  onGoToDashboard: () => void;
  forceRole?: "employee" | "sm";
  smSubTab?: "inbox" | "team" | "discussion";
  setSmSubTab?: (tab: "inbox" | "team" | "discussion") => void;
}

export default function JobTrackWizard({
  state,
  onChange,
  onGoToDashboard,
  forceRole,
  smSubTab: propsSmSubTab,
  setSmSubTab: propsSetSmSubTab,
}: JobTrackWizardProps) {
  // Local state for UI dropdowns
  const [isSmOpen, setIsSmOpen] = useState(false);
  const [isCtOpen, setIsCtOpen] = useState(false);
  const [isFdOpen, setIsFdOpen] = useState(false);
  const [isFsOpen, setIsFsOpen] = useState(false);

  // Simulated Role state (Employee / SM)
  const [simulatedRole, setSimulatedRole] = useState<"employee" | "sm">(
    "employee",
  );
  const currentRole = forceRole || simulatedRole;
  const [smFeedbackInput, setSmFeedbackInput] = useState(
    state.smFeedback || "",
  );
  const [isCommitChecked, setIsCommitChecked] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyTab, setHistoryTab] = useState<"approval" | "versions">("approval");

  // Derived abbreviations for the main state (used in both employee and sm/supervisor contexts)
  const getSpecialtyAbbrAtMain = (specName: string): string => {
    if (!specName) return "ARC";
    if (specName.includes("Backend Engineer")) return "BE";
    if (specName.includes("Frontend Engineer")) return "FE";
    if (specName.includes("Fullstack Developer")) return "FS";
    if (specName.includes("Mobile App Engineer")) return "MOB";
    if (specName.includes("Solution Architect")) return "SA";
    if (specName.includes("AI/ML Practitioner")) return "AI";
    if (specName.includes("Big Data Engineer")) return "DATA";
    if (specName.includes("Product Designer")) return "UIX";
    if (specName.includes("Tech Lead")) return "TL";
    if (specName.includes("SRE Specialist")) return "SRE";
    if (specName.includes("Infrastructure Engineer")) return "INF";
    if (specName.includes("Systems Specialist")) return "SYS";
    if (specName.includes("DevOps Specialist")) return "DO";
    return specName.substring(0, 4).toUpperCase();
  };

  const ctAbbr =
    CAREER_TRACK_HIERARCHY[state.careerTrack || "Product Design"]?.abbr ||
    "PD";
  const fdAbbr =
    FUNCTIONAL_DOMAINS.find((fd) => fd.name === state.functionalDomain)
      ?.abbr || "D&A";
  const fsAbbr = getSpecialtyAbbrAtMain(
    state.functionSpecialty || "Architecture & Frontier",
  );

  const secondCtAbbr =
    CAREER_TRACK_HIERARCHY[state.secondCareerTrack || "Product Design"]
      ?.abbr || "PD";
  const secondFdAbbr =
    FUNCTIONAL_DOMAINS.find((fd) => fd.name === state.secondFunctionalDomain)
      ?.abbr || "D&A";
  const secondFsAbbr = getSpecialtyAbbrAtMain(
    state.secondFunctionSpecialty || "Architecture & Frontier",
  );
  const [inactiveConfirmTrack, setInactiveConfirmTrack] = useState<
    number | null
  >(null);

  const [localSmSubTab, setLocalSmSubTab] = useState<
    "inbox" | "team" | "discussion"
  >("inbox");
  const smSubTab = propsSmSubTab || localSmSubTab;
  const setSmSubTab = propsSetSmSubTab || setLocalSmSubTab;
  const [chatMessages, setChatMessages] = useState(() => [
    {
      id: 1,
      sender: "Lê Hoàng Nam",
      role: "SRE Specialist",
      text: "Chào anh Minh, em vừa cập nhật lại lộ trình SRE và kế hoạch 12 tháng kế tiếp ạ.",
      time: "09:02 Hôm nay",
    },
    {
      id: 2,
      sender: "Đức Minh Trần",
      role: "Supervisor Manager",
      text: "Chào Nam, anh đã thấy yêu cầu của em. Nội dung học Kubernetes lớn rất thực tiễn cho dự án dLink.",
      time: "09:15 Hôm nay",
    },
    {
      id: 3,
      sender: "Lê Trang",
      role: "Systems Engineer",
      text: "Em cũng vừa nhấn gửi yêu cầu co-sign dLINK Job Track, anh rà soát giúp em nhé.",
      time: "11:25 Hôm nay",
    },
  ]);
  const [newMessageText, setNewMessageText] = useState("");
  const [activeChannel, setActiveChannel] = useState<
    "co-sign" | "idp" | "general"
  >("co-sign");
  const [selectedChatUserId, setSelectedChatUserId] =
    useState<string>("L-2813");
  const [messagesMap, setMessagesMap] = useState<
    Record<
      string,
      Array<{ id: number; sender: string; text: string; time: string }>
    >
  >(() => ({
    "L-2811": [
      {
        id: 1,
        sender: "Nguyễn Anh Tuấn",
        text: "Chào anh Minh, em đang hoàn thiện nốt phần phản hồi tự đánh giá theo Job Track Backend Engineer ạ.",
        time: "10:30, 21/05",
      },
    ],
    "L-2812": [
      {
        id: 1,
        sender: "Phạm Minh Hoa",
        text: "Chào anh Minh, em đã gửi kết quả benchmark và cập nhật thông tin thiết kế rồi ạ.",
        time: "14:15, 21/05",
      },
    ],
    "L-2813": [
      {
        id: 1,
        sender: "Lê Hoàng Nam",
        text: "Anh Minh ơi, em vừa gửi đề xuất đổi Job Track để đổi lên Span S2 do được lead phân công dự án mới. Nhờ anh xem xét co-sign giúp em nhé.",
        time: "09:00, 22/05",
      },
    ],
    "L-2814": [
      {
        id: 1,
        sender: "Trần Thu Hà",
        text: "Chào anh Minh, em đang hoàn thiện bộ test và kịch bản automation test cho dự án dLINK.",
        time: "11:00, 22/05",
      },
    ],
    "L-2815": [
      {
        id: 1,
        sender: "Vũ Hoàng Lâm",
        text: "Chào anh Minh, em đã đạt đủ BMI và hoàn thành hồ sơ thử việc theo blueprint rồi nhé.",
        time: "13:30, 22/05",
      },
    ],
    "L-2816": [
      {
        id: 1,
        sender: "Lê Trang",
        text: "Anh Minh ơi, em vừa submit khai báo thông tin Job Track mới, nhờ anh calibrate giúp em.",
        time: "10:15, 23/05",
      },
    ],
  }));

  // Interactive Inbox & Review Reason workflow states
  const [isDepthApproved, setIsDepthApproved] = useState(false);
  const [isIcmApproved, setIsIcmApproved] = useState(false);
  const [inboxFilter, setInboxFilter] = useState<
    "cosign" | "depth" | "icm" | "delegated" | "history"
  >("cosign");
  const [isReviewReasonOpen, setIsReviewReasonOpen] = useState(false);
  const [reviewReasonInput, setReviewReasonInput] = useState("");

  // Stateful list of simulated IC direct reports under 1 SM
  const [teamMembers, setTeamMembers] = useState(() => [
    {
      id: "L-2811",
      name: "Nguyễn Anh Tuấn",
      role: "IC · Software Engineer",
      cosigned: false,
      smStatus: "pending" as const,
      careerTrack: "Solution Engineer",
      functionalDomain: "Phát triển Phần mềm",
      functionSpecialty: "Backend Engineer",
      span: "S2",
      selfReflection: {
        reason: "Đam mê phát triển Web & Backend nghiệp vụ lớn.",
        currentView: "Cần nâng cao kỹ năng tối ưu câu lệnh SQL phức tạp.",
        goal12Months: "Trở thành một Senior Backend Engineer dẫn dắt module.",
      },
      submittedAt: "09:30 - Hôm nay",
      smFeedback: "",
      isCommitChecked: false,
    },
    {
      id: "L-2812",
      name: "Phạm Minh Hoa",
      role: "IC · Product Designer",
      cosigned: true,
      smStatus: "approved" as const,
      careerTrack: "Product Design",
      functionalDomain: "Kiến tạo Sản phẩm & Trải nghiệm Số",
      functionSpecialty: "PM — Product Management",
      span: "S2",
      selfReflection: {
        reason:
          "Tôi muốn làm ra những sản phẩm có trải nghiệm người dùng tuyệt vời nhất.",
        currentView:
          "Cơ hội thực chiến cọ xát với tệp người dùng thực tế còn ít.",
        goal12Months:
          "Chứng nhận Product Management chuyên nghiệp của tập đoàn.",
      },
      submittedAt: "14:15 - Hôm qua",
      smFeedback: "Đồng ý phê duyệt định vị lộ trình Job Track.",
      isCommitChecked: true,
    },
    {
      id: "L-2813",
      name: "Lê Hoàng Nam",
      role: "IC · Site Reliability Engineer",
      cosigned: true,
      smStatus: "approved" as const,
      careerTrack: "Solution Engineer",
      functionalDomain: "Nền tảng & Hạ tầng Công nghệ Số",
      functionSpecialty: "SRE — Site Reliability Engineer",
      span: "S2",
      selfReflection: {
        reason:
          "Đại diện tinh thần bảo vệ sự an định, liên tục hoạt động của hệ thống.",
        currentView: "Muốn học sâu thêm cách nâng cấp Kubernetes clusters lớn.",
        goal12Months: "Đảm bảo SLA thời gian hoạt động hệ thống đạt 99.99%.",
      },
      submittedAt: "08:45 - Hôm nay",
      smFeedback:
        "Đã co-sign. Chúc đồng chí Nam tiếp tục phát huy năng lực SRE tại dự án dLINK.",
      isCommitChecked: true,
    },
    {
      id: "L-2814",
      name: "Trần Thu Hà",
      role: "IC · QA Analyst",
      cosigned: true,
      smStatus: "approved" as const,
      careerTrack: "Solution Engineer",
      functionalDomain: "Phát triển Phần mềm",
      functionSpecialty: "FE — Frontend Engineer",
      span: "S2",
      selfReflection: {
        reason:
          "Tôi muốn xây dựng lộ trình nâng hạng chất lượng kiểm thử chuyên nghiệp.",
        currentView: "Mong muốn được thử sức với kiểm thử hiệu năng cao dLink.",
        goal12Months:
          "Tích hợp script test tự động vào pipeline CI/CD chính thức.",
      },
      submittedAt: "16:45 - Hôm qua",
      smFeedback: "Lộ trình phát triển năng lực rõ ràng.",
      isCommitChecked: true,
    },
    {
      id: "L-2815",
      name: "Vũ Hoàng Lâm",
      role: "IC · Systems Specialist",
      cosigned: true,
      smStatus: "approved" as const,
      careerTrack: "Architecture & System Specialist",
      functionalDomain: "Phát triển Phần mềm",
      functionSpecialty: "SA — System Analyst",
      span: "S2",
      selfReflection: {
        reason: "Khởi tạo các sơ đồ kiến trúc chuẩn hóa định vị giải pháp.",
        currentView: "Mong muốn học sâu về Cloud-Native Architecture.",
        goal12Months: "Hoàn thành thiết kế kiến trúc chuẩn hóa cho dWork.",
      },
      submittedAt: "10:00 - 3 ngày trước",
      smFeedback:
        "Đã hoàn tất calibrate & co-sign. Chúc đồng chí Lâm bền chí hướng tới mốc thành công tiếp theo.",
      isCommitChecked: true,
    },
    {
      id: "L-2816",
      name: "Lê Trang",
      role: "IC · Systems Engineer",
      cosigned: false,
      smStatus: "pending" as const,
      careerTrack: "Solution Engineer",
      functionalDomain: "Nền tảng & Hạ tầng Công nghệ Số",
      functionSpecialty: "SRE — Site Reliability Engineer",
      span: "S2",
      selfReflection: {
        reason: "Khao khát làm quy trình kỹ thuật hệ thống đạt tải tối ưu.",
        currentView: "Dự án dLink có tần suất truyền tải dữ liệu rất cao.",
        goal12Months: "Tối ưu hóa hạ tầng đám mây giúp tiết kiệm 20% chi phí.",
      },
      submittedAt: "11:20 - Hôm nay",
      smFeedback: "",
      isCommitChecked: false,
    },
    {
      id: "L-2817",
      name: "Đoàn Quốc Bảo",
      role: "IC · DevOps Specialist",
      cosigned: true,
      smStatus: "approved" as const,
      careerTrack: "Solution Engineer",
      functionalDomain: "Nền tảng & Hạ tầng Công nghệ Số",
      functionSpecialty: "SRE — Site Reliability Engineer",
      span: "S3",
      selfReflection: {
        reason:
          "Xây dựng dây chuyền phân phối liên tục hiệu năng đáp ứng tải cao.",
        currentView:
          "Cơ sở hạ tầng Kubernetes dLink cần ổn định cấu hình mạng tốt hơn.",
        goal12Months:
          "Rút ngắn thời gian triển khai CI/CD tối ưu xuống dưới 5 phút.",
      },
      submittedAt: "09:12 - Hôm nay",
      smFeedback: "Đồng ý phê duyệt.",
      isCommitChecked: true,
    },
    {
      id: "L-2818",
      name: "Phạm Thắng Lợi",
      role: "IC · Product Owner",
      cosigned: true,
      smStatus: "approved" as const,
      careerTrack: "Product Design",
      functionalDomain: "Kiến tạo Sản phẩm & Trải nghiệm Số",
      functionSpecialty: "PM — Product Management",
      span: "S1",
      selfReflection: {
        reason:
          "Đóng góp phát triển trực quan các tính năng cốt lõi cho iLead portal.",
        currentView:
          "Kinh nghiệm định vị dòng tiền sản phẩm cần cải thiện đột phá.",
        goal12Months:
          "Nghiên cứu thành công 3 mảng thị trường ngách mới cho dLink.",
      },
      submittedAt: "14:30 - Hôm qua",
      smFeedback: "Đã nhất trí thông qua.",
      isCommitChecked: true,
    },
    {
      id: "L-2819",
      name: "Đặng Thùy Dương",
      role: "IC · Fullstack Developer",
      cosigned: true,
      smStatus: "approved" as const,
      careerTrack: "Solution Engineer",
      functionalDomain: "Phát triển Phần mềm",
      functionSpecialty: "FE — Frontend Engineer",
      span: "S2",
      selfReflection: {
        reason:
          "Tối ưu hóa và tái cấu trúc giao diện tương thích đa nền tảng tuyệt mỹ.",
        currentView:
          "Muốn học sâu thêm các thuật toán rendering tối ưu hiệu suất runtime.",
        goal12Months:
          "Phát triển hoàn chỉnh dashboard lõi dWork mới thân thiện mượt mà.",
      },
      submittedAt: "16:10 - Hôm qua",
      smFeedback: "Ý kiến định biên tốt, nhất trí với lộ trình.",
      isCommitChecked: true,
    },
  ]);

  const [selectedMemberId, setSelectedMemberId] = useState<string>("L-2841");
  const [activeEditTab, setActiveEditTab] = useState<"first" | "second">(
    "first",
  );
  const [selectedSmTrackTab, setSelectedSmTrackTab] = useState<
    "first" | "second"
  >("first");

  // Current active track for editing
  const currentEditTrack =
    activeEditTab === "first"
      ? {
          careerTrack: state.careerTrack,
          functionalDomain: state.functionalDomain,
          functionSpecialty: state.functionSpecialty,
          span: state.span,
          selfReflection: state.selfReflection,
          isEditing: state.isEditing,
          changeReason: state.changeReason,
          submitted: state.submitted,
        }
      : {
          careerTrack: state.secondCareerTrack,
          functionalDomain: state.secondFunctionalDomain,
          functionSpecialty: state.secondFunctionSpecialty,
          span: state.secondSpan,
          selfReflection: state.secondSelfReflection || {
            reason: "",
            currentView: "",
            goal12Months: "",
          },
          isEditing: state.secondIsEditing,
          changeReason: state.secondChangeReason,
          submitted: state.secondSubmitted,
        };

  // SM Delegation states
  const [delegatedTasks, setDelegatedTasks] = useState<
    Record<string, { toSm: SupervisorManager; at: string; note?: string }>
  >({});
  const [delegationNotifs, setDelegationNotifs] = useState<
    Array<{ id: number; msg: string; time: string }>
  >([]);
  const [selectedDelegateSmId, setSelectedDelegateSmId] = useState<string>("");
  const [delegationNote, setDelegationNote] = useState<string>("");

  // Auto assign SM if null (Mục SM chỉ định sẽ đc hệ thống Auto trả ra tên SM chứ ko đc phép chọn nữa)
  useEffect(() => {
    if (currentRole === "employee" && !state.sm) {
      onChange({
        ...state,
        sm: SUPERVISOR_MANAGERS[0],
      });
    }
  }, [state.sm, currentRole, onChange, state]);

  // Helper helper to format track and specialty string precisely like the image (e.g. PD • PM or SE • Backend Engineer)
  const formatSub = (member: any) => {
    const ctAbbr = member.careerTrack
      ? CAREER_TRACK_HIERARCHY[member.careerTrack]?.abbr || "IC"
      : "PD";
    let specName = member.functionSpecialty || "PM";
    if (specName.includes(" — ")) {
      specName = specName.split(" — ")[0];
    } else if (specName.includes(" - ")) {
      specName = specName.split(" - ")[0];
    }
    return `${ctAbbr} • ${specName}`;
  };

  // Compute all unified corporate members direct reports list (current IC + other ICs)
  const allMembers = [
    {
      id: "L-2841",
      name: "Minh Trần",
      role: "IC · Client Engineer (Mới nhận việc)",
      cosigned: state.cosigned || false,
      smStatus: state.smStatus || "pending",
      careerTrack: state.careerTrack || "Product Design",
      functionalDomain:
        state.functionalDomain || "Kiến tạo Sản phẩm & Trải nghiệm Số",
      functionSpecialty: state.functionSpecialty || "PM — Product Management",
      span: state.span || "S2",
      selfReflection: {
        reason:
          state.selfReflection?.reason ||
          "Tôi muốn đóng góp định hướng phát triển tối ưu sản phẩm.",
        currentView:
          state.selfReflection?.currentView ||
          "Cần nâng cao trình quản trị và thiết kế lộ trình thực tế.",
        goal12Months:
          state.selfReflection?.goal12Months ||
          "Chứng nhận PD/PM chuyên nghiệp của tập đoàn.",
      },
      submittedAt: state.submittedAt || "10:15 - Hôm nay",
      smFeedback: state.smFeedback || "",
      isCommitChecked: isCommitChecked,
      isSecondSubmission: state.isSecondSubmission || false,
      changeReason: state.changeReason || "",
      hasSecondTrack: state.hasSecondTrack || false,
      secondCareerTrack: state.secondCareerTrack || null,
      secondFunctionalDomain: state.secondFunctionalDomain || null,
      secondFunctionSpecialty: state.secondFunctionSpecialty || null,
      secondSpan: state.secondSpan || null,
      secondSubmitted: state.secondSubmitted || false,
      secondSubmittedAt: state.secondSubmittedAt || null,
      secondCosigned: state.secondCosigned || false,
      secondCosignedAt: state.secondCosignedAt || null,
      secondSmStatus: state.secondSmStatus || "pending",
      secondSmFeedback: state.secondSmFeedback || "",
      secondSelfReflection: state.secondSelfReflection || null,
    },
    ...teamMembers,
  ];

  // Handler to delegate Co-sign task to another SM in the SBU
  const handleDelegateTask = (
    memberId: string,
    toSm: SupervisorManager,
    note?: string,
  ) => {
    const timestamp =
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " - " +
      new Date().toLocaleDateString("vi-VN");

    // Update delegation record
    setDelegatedTasks((prev) => ({
      ...prev,
      [memberId]: { toSm, at: timestamp, note: note || "" },
    }));

    // Find the member name being delegated
    const memberName =
      allMembers.find((m) => m.id === memberId)?.name || "Nhân viên";

    // Broadcast notifications to both IC and IG
    const successMsg = `Đã ủy quyền Co-sign Job Track của nhân sự ${memberName} cho Quản lý ${toSm.name} (${toSm.role}) trong cùng SBU Non-IT thành công.`;

    setDelegationNotifs((prev) => [
      { id: Date.now(), msg: successMsg, time: timestamp.split(" - ")[0] },
      ...prev,
    ]);
  };

  const handleSelectMember = (
    id: string,
    memberObj: any,
    trackType?: "first" | "second",
  ) => {
    setSelectedMemberId(id);
    setIsCommitChecked(memberObj.isCommitChecked || false);
    setSmFeedbackInput(memberObj.smFeedback || "");
    setSelectedDelegateSmId("");
    setIsReviewReasonOpen(false);
    if (trackType) {
      setSelectedSmTrackTab(trackType);
    } else {
      if (
        memberObj.hasSecondTrack &&
        memberObj.secondSubmitted &&
        !memberObj.secondCosigned
      ) {
        setSelectedSmTrackTab("second");
      } else {
        setSelectedSmTrackTab("first");
      }
    }
  };

  const handleCosignMember = (
    id: string,
    customFeedback?: string,
    trackType: "first" | "second" = "first",
  ) => {
    const timestamp =
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " - " +
      new Date().toLocaleDateString("vi-VN");
    const feedbackText =
      customFeedback !== undefined ? customFeedback : smFeedbackInput;

    if (id === "L-2841") {
      if (trackType === "first") {
        onChange({
          ...state,
          cosigned: true,
          cosignedAt: timestamp,
          smFeedback: feedbackText,
          smStatus: "approved",
        });
      } else {
        onChange({
          ...state,
          secondCosigned: true,
          secondCosignedAt: timestamp,
          secondSmFeedback: feedbackText,
          secondSmStatus: "approved",
        });
      }
    } else {
      setTeamMembers((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              cosigned: true,
              cosignedAt: timestamp,
              smStatus: "approved",
              smFeedback: feedbackText,
              isCommitChecked: true,
            };
          }
          return m;
        }),
      );
    }
    setIsCommitChecked(false);
    setSmFeedbackInput("");
  };

  const handleRejectMember = (
    id: string,
    reason?: string,
    trackType: "first" | "second" = "first",
  ) => {
    const feedbackText =
      reason ||
      smFeedbackInput ||
      "SM yêu cầu xem xét lại định vị, vui lòng bổ sung đầy đủ 3 câu hỏi soi chiếu bản thân.";

    if (id === "L-2841") {
      if (trackType === "first") {
        onChange({
          ...state,
          submitted: true, // Keep submitted as true so they are on the status screen and can see the comment/edit request box
          cosigned: false,
          smStatus: "rejected",
          smFeedback: feedbackText,
        });
      } else {
        onChange({
          ...state,
          secondSubmitted: true,
          secondCosigned: false,
          secondSmStatus: "rejected",
          secondSmFeedback: feedbackText,
        });
      }
    } else {
      setTeamMembers((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              cosigned: false,
              smStatus: "rejected",
              smFeedback: feedbackText,
              isCommitChecked: false,
            };
          }
          return m;
        }),
      );
    }
    setIsCommitChecked(false);
    setSmFeedbackInput("");
  };

  // Filter only Non-IT SMs
  const availableSMs = SUPERVISOR_MANAGERS.filter((sm) => sm.sbu === "Non-IT");

  // Change handlers
  const handleSelectSM = (sm: SupervisorManager) => {
    onChange({ ...state, sm });
    setIsSmOpen(false);
  };

  const handleSelectCT = (ct: string) => {
    if (activeEditTab === "first") {
      onChange({
        ...state,
        careerTrack: ct,
        functionalDomain: null,
        functionSpecialty: null,
        span: null,
      });
    } else {
      onChange({
        ...state,
        secondCareerTrack: ct,
        secondFunctionalDomain: null,
        secondFunctionSpecialty: null,
        secondSpan: null,
      });
    }
    setIsCtOpen(false);
  };

  const handleSelectFD = (fd: string) => {
    if (activeEditTab === "first") {
      onChange({
        ...state,
        functionalDomain: fd,
        functionSpecialty: null,
        span: null,
      });
    } else {
      onChange({
        ...state,
        secondFunctionalDomain: fd,
        secondFunctionSpecialty: null,
        secondSpan: null,
      });
    }
    setIsFdOpen(false);
  };

  const handleSelectFS = (fs: string) => {
    if (activeEditTab === "first") {
      onChange({
        ...state,
        functionSpecialty: fs,
        span: "S2", // Auto assign standard Developing track experience
      });
    } else {
      onChange({
        ...state,
        secondFunctionSpecialty: fs,
        secondSpan: "S2",
      });
    }
    setIsFsOpen(false);
  };

  const handleSelectSpan = (span: string) => {
    if (activeEditTab === "first") {
      onChange({ ...state, span });
    } else {
      onChange({ ...state, secondSpan: span });
    }
  };

  const handleReflectionChange = (
    field: "reason" | "currentView" | "goal12Months",
    value: string,
  ) => {
    if (activeEditTab === "first") {
      onChange({
        ...state,
        selfReflection: {
          ...state.selfReflection,
          [field]: value,
        },
      });
    } else {
      onChange({
        ...state,
        secondSelfReflection: {
          ...(state.secondSelfReflection || {
            reason: "",
            currentView: "",
            goal12Months: "",
          }),
          [field]: value,
        },
      });
    }
  };

  const handleSubmit = () => {
    const timestamp =
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " - " +
      new Date().toLocaleDateString("vi-VN");
    if (activeEditTab === "first") {
      onChange({
        ...state,
        submitted: true,
        isEditing: false,
        submittedAt: timestamp,
      });
    } else {
      onChange({
        ...state,
        secondSubmitted: true,
        secondIsEditing: false,
        secondSubmittedAt: timestamp,
        secondSmStatus: "pending",
      });
    }
  };

  const handleResetSubmit = (
    isEditing: boolean = true,
    trackType: "first" | "second" = "first",
  ) => {
    if (trackType === "first") {
      onChange({
        ...state,
        submitted: !isEditing,
        cosigned: false, // Reset co-sign if user edits again
        smStatus: "pending",
        isSecondSubmission: isEditing ? state.isSecondSubmission : true,
        isEditing: isEditing,
        changeReason: isEditing ? state.changeReason : "",
      });
      setActiveEditTab("first");
    } else {
      onChange({
        ...state,
        secondSubmitted: !isEditing,
        secondCosigned: false,
        secondSmStatus: "pending",
        secondIsEditing: isEditing,
        secondChangeReason: isEditing ? state.secondChangeReason : "",
      });
      setActiveEditTab("second");
    }
  };

  const handleAddSecondTrack = () => {
    onChange({
      ...state,
      hasSecondTrack: true,
      secondCareerTrack: null,
      secondFunctionalDomain: null,
      secondFunctionSpecialty: null,
      secondSpan: null,
      secondSubmitted: false,
      secondCosigned: false,
      secondSmStatus: "pending",
      secondSelfReflection: {
        reason: "",
        currentView: "",
        goal12Months: "",
      },
      secondChangeReason: "",
      secondIsEditing: true,
    });
    setActiveEditTab("second");
  };

  const handleCosign = () => {
    const timestamp =
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " - " +
      new Date().toLocaleDateString("vi-VN");
    onChange({
      ...state,
      cosigned: true,
      cosignedAt: timestamp,
      smFeedback: smFeedbackInput,
      smStatus: "approved",
    });
  };

  const handleRejectBySM = () => {
    onChange({
      ...state,
      submitted: true,
      cosigned: false,
      smStatus: "rejected",
      smFeedback:
        smFeedbackInput || "SM yêu cầu rà soát điều chỉnh lại lựa chọn.",
    });
    setSimulatedRole("employee");
  };

  const isFormValid = (() => {
    if (!state.sm) return false;
    if (activeEditTab === "first") {
      const track = {
        careerTrack: state.careerTrack,
        functionalDomain: state.functionalDomain,
        functionSpecialty: state.functionSpecialty,
        isEditing: state.isEditing,
        changeReason: state.changeReason,
        selfReflection: state.selfReflection,
        smStatus: state.smStatus,
      };

      const isBasicsOk = !!(
        track.careerTrack &&
        track.functionalDomain &&
        track.functionSpecialty
      );
      const isChangeReasonOk =
        !track.isEditing ||
        (track.changeReason || "").trim().length > 0 ||
        !state.isSecondSubmission;
      const isReflectionOk =
        track.smStatus !== "pending" ||
        ((track.selfReflection.reason || "").trim().length > 0 &&
          (track.selfReflection.currentView || "").trim().length > 0 &&
          (track.selfReflection.goal12Months || "").trim().length > 0);

      return isBasicsOk && isChangeReasonOk && isReflectionOk;
    } else {
      // For job track 2: 3 questions are strictly mandatory + 4. Reason for adding new job track (secondChangeReason) is also strictly mandatory
      const isBasicsOk = !!(
        state.secondCareerTrack &&
        state.secondFunctionalDomain &&
        state.secondFunctionSpecialty
      );
      const secondSelf = state.secondSelfReflection || {
        reason: "",
        currentView: "",
        goal12Months: "",
      };
      const isReflectionOk =
        (secondSelf.reason || "").trim().length > 0 &&
        (secondSelf.currentView || "").trim().length > 0 &&
        (secondSelf.goal12Months || "").trim().length > 0;
      const isChangeReasonOk =
        (state.secondChangeReason || "").trim().length > 0;

      return isBasicsOk && isReflectionOk && isChangeReasonOk;
    }
  })();

  // Render Submitted / Pending Approval view OR if explicitly forced to SM view
  if (
    (state.submitted && !state.isEditing && !state.secondIsEditing) ||
    forceRole === "sm"
  ) {
    if (currentRole === "sm") {
      const selectedMember =
        allMembers.find((m) => m.id === selectedMemberId) || allMembers[0];
      const pendingCount =
        allMembers.filter((m) => !m.cosigned).length +
        (isDepthApproved ? 0 : 1) +
        (isIcmApproved ? 0 : 1);
      const approvedCount = allMembers.filter((m) => m.cosigned).length;

      return (
        <div className="space-y-6 w-full font-sans text-slate-800 animate-fade-in text-left">
          {/* ────────── DYNAMIC SIMULATION BAR (SM View) ────────── */}
          {!forceRole && (
            <div className="bg-slate-100 border border-slate-200 p-2 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans shadow-3xs">
              <div className="flex items-center gap-2 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                  Giả lập kiểm thử:
                </span>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded ml-2">
                  Quản lý trực tiếp (SM) Workspace
                </span>
              </div>
              <div className="flex rounded-xl bg-slate-200/60 p-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSimulatedRole("employee")}
                  className="px-4 py-2 rounded-lg text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-all duration-200 cursor-pointer"
                >
                  🙋‍♂️ Nhân viên / HRBP
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedRole("sm")}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-extrabold shadow-xs transition-all duration-200 cursor-pointer"
                >
                  👔 Quản lý trực tiếp (SM)
                </button>
              </div>
            </div>
          )}

          {/* 3 Metrics Cards (Redesigned like Image 2, with soft border gradients and gold theme for pending status) */}
          {smSubTab === "inbox" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Tổng nhân sự */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-start justify-between relative overflow-hidden transition hover:shadow-2xs">
                <div className="space-y-1 text-left z-10">
                  <span className="text-[11px] font-bold text-[#324157] uppercase tracking-wider block font-sans">
                    Tổng nhân sự SBU
                  </span>
                  <div className="text-[34px] font-black text-[#0d2f5c] tracking-tight leading-none font-sans mt-0.5">
                    {allMembers.length}{" "}
                    <span className="text-xs font-bold text-slate-400">
                      nhân viên
                    </span>
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
                    {pendingCount}{" "}
                    <span className="text-xs font-bold text-slate-400">
                      hồ sơ
                    </span>
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
                    {approvedCount}{" "}
                    <span className="text-xs font-bold text-slate-400">
                      hoàn tất
                    </span>
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
          {smSubTab === "inbox" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT PANEL: Urgent Task Inbox & Recent Reports (6 cols to make it horizontally wider and spacious) */}
              <div className="lg:col-span-6 space-y-6">
                {/* Inbox component (Hộp việc cần xử lý khẩn cấp) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
                  <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-[14px] font-black text-[#0d2f5c] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                      <Zap className="w-4 h-4 text-[#0077ed]" /> Hộp việc cần xử
                      lý khẩn cấp
                    </h3>
                    <button
                      type="button"
                      onClick={() => setInboxFilter("history")}
                      className="text-xs text-[#0077ed] hover:text-[#005bb7] font-black tracking-wider flex items-center gap-1.5 transition cursor-pointer font-sans bg-transparent border-0"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Lịch sử xử lý
                    </button>
                  </div>

                  {/* Subtabs filters */}
                  {(() => {
                    const cosignPending = allMembers.filter(
                      (m) => !m.cosigned && !delegatedTasks[m.id],
                    );
                    const cosignCount = cosignPending.length;
                    const depthCount = isDepthApproved ? 0 : 1;
                    const icmCount = isIcmApproved ? 0 : 1;
                    const delegatedCount = allMembers.filter(
                      (m) => delegatedTasks[m.id],
                    ).length;
                    const historyCount = allMembers.filter(
                      (m) => m.cosigned,
                    ).length;

                    return (
                      <div className="flex flex-wrap gap-1.5 select-none pt-0.5 font-sans">
                        <button
                          type="button"
                          onClick={() => setInboxFilter("cosign")}
                          className={`px-3 py-1.5 rounded-pill text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none border ${
                            inboxFilter === "cosign"
                              ? "bg-[#0077ed] text-white border-[#0077ed] shadow-3xs"
                              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          Co-sign Job Track ({cosignCount})
                        </button>
                        <button
                          type="button"
                          onClick={() => setInboxFilter("depth")}
                          className={`px-3 py-1.5 rounded-pill text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none border ${
                            inboxFilter === "depth"
                              ? "bg-[#0077ed] text-white border-[#0077ed] shadow-3xs"
                              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          Depth & BMI ({depthCount})
                        </button>
                        <button
                          type="button"
                          onClick={() => setInboxFilter("icm")}
                          className={`px-3 py-1.5 rounded-pill text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none border ${
                            inboxFilter === "icm"
                              ? "bg-[#0077ed] text-[#ffffff] border-[#0077ed] shadow-3xs"
                              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          Đánh giá ICM ({icmCount})
                        </button>
                        <button
                          type="button"
                          onClick={() => setInboxFilter("delegated")}
                          className={`px-3 py-1.5 rounded-pill text-[11px] font-extrabold uppercase tracking-wide transition cursor-pointer select-none border ${
                            inboxFilter === "delegated"
                              ? "bg-[#0077ed] text-white border-[#0077ed] shadow-3xs"
                              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          Đã uỷ quyền ({delegatedCount})
                        </button>
                      </div>
                    );
                  })()}
                  <div className="space-y-2 pt-1">
                    {/* Item 1: Đánh giá DEPTH S1 từ Phạm Minh Hoa */}
                    {!isDepthApproved && inboxFilter === "depth" && (
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
                          className="bg-[#0077ed] hover:bg-[#006bd6] text-white font-extrabold text-[9.5px] px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 shrink-0 transition border-0"
                        >
                          <Check className="w-3 h-3 stroke-[3]" /> Calibrate
                        </button>
                      </div>
                    )}

                    {isDepthApproved && inboxFilter === "depth" && (
                      <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs font-sans">
                        🎉 Đã hoàn tất Calibrate DEPTH & BMI!
                      </div>
                    )}

                    {/* Item 2: Đánh giá ICM cho Trần Thu Hà */}
                    {!isIcmApproved && inboxFilter === "icm" && (
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
                              Kỹ năng: System Design · Hiện tại: L1 · Đánh giá
                              năng lực
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsIcmApproved(true);
                          }}
                          className="bg-[#db2777] hover:bg-[#be185d] text-white font-extrabold text-[9.5px] px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 shrink-0 transition border-0"
                        >
                          <Award className="w-3 h-3" /> Đánh giá ICM
                        </button>
                      </div>
                    )}

                    {isIcmApproved && inboxFilter === "icm" && (
                      <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs font-sans">
                        🎉 Đã hoàn tất Đánh giá ICM!
                      </div>
                    )}

                    {/* Dynamic Pending Co-sign requests from all direct reports */}
                    {inboxFilter === "cosign" &&
                      (() => {
                        const cosignItems: Array<{
                          member: any;
                          trackType: "first" | "second";
                          uniqueId: string;
                        }> = [];

                        allMembers.forEach((m) => {
                          if (delegatedTasks[m.id]) return;

                          // Add Track 1 if not cosigned
                          if (!m.cosigned) {
                            cosignItems.push({
                              member: m,
                              trackType: "first",
                              uniqueId: `${m.id}-first`,
                            });
                          }
                          // Add Track 2 if has second track, second is submitted and not cosigned
                          if (
                            m.hasSecondTrack &&
                            m.secondSubmitted &&
                            !m.secondCosigned
                          ) {
                            cosignItems.push({
                              member: m,
                              trackType: "second",
                              uniqueId: `${m.id}-second`,
                            });
                          }
                        });

                        if (cosignItems.length === 0) {
                          return (
                            <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs font-sans">
                              🎉 Đã hoàn tất co-sign toàn bộ danh sách!
                            </div>
                          );
                        }

                        return cosignItems.map(
                          ({ member, trackType, uniqueId }) => {
                            const isSelected =
                              selectedMemberId === member.id &&
                              selectedSmTrackTab === trackType;
                            const label =
                              trackType === "second"
                                ? `Co-sign Lộ trình mới (Track 2) từ ${member.name}`
                                : `Co-sign Lộ trình chính (Track 1) từ ${member.name}`;

                            const specialty =
                              trackType === "second"
                                ? member.secondFunctionSpecialty ||
                                  "Chuyên viên kỹ thuật"
                                : member.functionSpecialty ||
                                  "Chuyên viên kỹ thuật";

                            return (
                              <div
                                key={uniqueId}
                                onClick={() =>
                                  handleSelectMember(member.id, member, trackType)
                                }
                                className={`p-2 rounded-xl bg-white transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-left ${
                                  isSelected
                                    ? "border-2 border-[#0077ed] bg-blue-50/5 shadow-2xs"
                                    : "border border-slate-200 hover:border-slate-350"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {/* Smaller rounded icon block */}
                                  <div
                                    className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${
                                      trackType === "second"
                                        ? "bg-indigo-50 text-indigo-600 border-indigo-150"
                                        : "bg-orange-50 text-orange-600 border-orange-100"
                                    }`}
                                  >
                                    <FileText className="w-3.5 h-3.5 stroke-[2]" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight truncate">
                                      {label}
                                    </h4>
                                    <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 truncate leading-none">
                                      Đề xuất: {specialty}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectMember(
                                      member.id,
                                      member,
                                      trackType,
                                    );
                                  }}
                                  className={`font-black text-[9px] px-2.5 py-1.5 rounded-lg shrink-0 tracking-wider transition uppercase cursor-pointer ${
                                    isSelected
                                      ? "bg-blue-600 text-white font-bold h-7 flex items-center"
                                      : "bg-[#fff7ed] text-[#e06c00] hover:bg-[#ffebd1] border border-orange-200/20"
                                  }`}
                                >
                                  Co-Sign
                                </button>
                              </div>
                            );
                          },
                        );
                      })()}

                    {/* Item 4: Delegated Co-sign requests tab */}
                    {inboxFilter === "delegated" &&
                      (() => {
                        const delegatedItems = allMembers.filter(
                          (m) => delegatedTasks[m.id],
                        );
                        if (delegatedItems.length === 0) {
                          return (
                            <div className="p-5 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs font-sans">
                              💨 Chưa uỷ quyền co-sign yêu cầu nào.
                            </div>
                          );
                        }
                        return delegatedItems.map((member) => {
                          const isSelected = selectedMemberId === member.id;
                          const delegation = delegatedTasks[member.id];
                          return (
                            <div
                              key={member.id}
                              onClick={() =>
                                handleSelectMember(member.id, member)
                              }
                              className={`p-3 rounded-xl bg-white transition-all duration-200 cursor-pointer flex flex-col gap-2.5 text-left border ${
                                isSelected
                                  ? "border-2 border-indigo-600 bg-indigo-50/5 shadow-2xs"
                                  : "border border-slate-200 hover:border-slate-350"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 font-sans">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                                    <UserCheck className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-extrabold text-[#0d2f5c] text-[12.5px] leading-tight truncate">
                                      Yêu cầu của {member.name} (Đã ủy quyền)
                                    </h4>
                                    <p className="text-[10.5px] text-slate-400 font-semibold mt-0.5 truncate leading-none">
                                      Ủy quyền cho:{" "}
                                      <b className="text-[#0d2f5c]">
                                        {delegation?.toSm?.name || "SM"}
                                      </b>{" "}
                                      • {delegation?.toSm?.role || "Manager"}
                                    </p>
                                  </div>
                                </div>
                                <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider font-sans shrink-0">
                                  Đã uỷ quyền
                                </span>
                              </div>
                            </div>
                          );
                        });
                      })()}

                    {/* History View Items */}
                    {inboxFilter === "history" &&
                      (() => {
                        const approvedMembers = allMembers.filter(
                          (m) => m.cosigned,
                        );
                        if (approvedMembers.length === 0) {
                          return (
                            <div className="p-4 text-center text-[#94a3b8] bg-[#f8fafc] rounded-xl border border-dashed border-[#e2e8f0] text-xs font-semibold font-sans">
                              💨 Chưa có yêu cầu co-sign nào được duyệt.
                            </div>
                          );
                        }
                        return approvedMembers.map((member) => {
                          const isSelected = selectedMemberId === member.id;
                          return (
                            <div
                              key={member.id}
                              onClick={() =>
                                handleSelectMember(member.id, member)
                              }
                              className={`p-2.5 rounded-xl bg-white transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-left border ${
                                isSelected
                                  ? "border-2 border-emerald-600 bg-emerald-50/5 shadow-3xs"
                                  : "border border-slate-200 hover:border-slate-350"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                </div>
                                <div className="min-w-0 font-sans">
                                  <h4 className="font-extrabold text-[#0d2f5c] text-[12px] leading-tight truncate">
                                    Yêu cầu của {member.name}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 font-bold mt-1 leading-none">
                                    MS: {member.id} • Lộ trình:{" "}
                                    {member.functionSpecialty ||
                                      "Chưa thiết lập"}
                                  </p>
                                </div>
                              </div>
                              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black px-2.5 py-0.5 rounded-lg uppercase tracking-wider shrink-0 font-sans">
                                Đã duyệt
                              </span>
                            </div>
                          );
                        });
                      })()}
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
                        <h4 className="font-extrabold text-[14px] text-[#0d2f5c] leading-tight truncate">
                          {selectedSmTrackTab === "second"
                            ? "Co-sign Lộ trình mới (Track 2)"
                            : "Co-sign Lộ trình chính (Track 1)"}{" "}
                          từ {selectedMember.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1 truncate">
                          Mã nhân sự: {selectedMember.id} • Đăng ký ngày:{" "}
                          {selectedSmTrackTab === "second"
                            ? selectedMember.secondSubmittedAt ||
                              selectedMember.submittedAt
                            : selectedMember.submittedAt}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      {delegatedTasks[selectedMember.id] ? (
                        <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2.5 py-1 rounded-lg border border-indigo-100 uppercase tracking-wider font-sans shrink-0">
                          Đã uỷ quyền
                        </span>
                      ) : selectedSmTrackTab === "second" ? (
                        selectedMember.secondCosigned ? (
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-250 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wide uppercase">
                            ĐÃ PHÊ DUYỆT
                          </span>
                        ) : selectedMember.secondSmStatus === "rejected" ? (
                          <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[9.5px] font-black px-2.5 py-1 rounded-lg tracking-wide uppercase font-sans">
                            PENDING
                          </span>
                        ) : (
                          <span className="bg-[#fff7ed] text-[#e06c00] border border-orange-200 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wide uppercase font-sans">
                            CHỜ CO-SIGN
                          </span>
                        )
                      ) : selectedMember.cosigned ? (
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-250 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wide uppercase">
                          ĐÃ PHÊ DUYỆT
                        </span>
                      ) : selectedMember.smStatus === "rejected" ? (
                        <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[9.5px] font-black px-2.5 py-1 rounded-lg tracking-wide uppercase font-sans">
                          PENDING
                        </span>
                      ) : (
                        <span className="bg-[#fff7ed] text-[#e06c00] border border-orange-200 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wide uppercase font-sans">
                          CHỜ CO-SIGN
                        </span>
                      )}
                    </div>
                  </div>

                  {(() => {
                    const isViewingSecond = selectedSmTrackTab === "second";
                    const trackToView = isViewingSecond
                      ? {
                          careerTrack: selectedMember.secondCareerTrack,
                          functionalDomain:
                            selectedMember.secondFunctionalDomain,
                          functionSpecialty:
                            selectedMember.secondFunctionSpecialty,
                          span: selectedMember.secondSpan,
                          selfReflection:
                            selectedMember.secondSelfReflection || {
                              reason: "",
                              currentView: "",
                              goal12Months: "",
                            },
                          cosigned: selectedMember.secondCosigned,
                          cosignedAt: selectedMember.secondCosignedAt,
                          smStatus: selectedMember.secondSmStatus,
                          smFeedback: selectedMember.secondSmFeedback,
                          isSecond: true,
                          changeReason:
                            selectedMember.secondChangeReason ||
                            selectedMember.changeReason,
                          submitted: selectedMember.secondSubmitted,
                        }
                      : {
                          careerTrack: selectedMember.careerTrack,
                          functionalDomain: selectedMember.functionalDomain,
                          functionSpecialty: selectedMember.functionSpecialty,
                          span: selectedMember.span,
                          selfReflection: selectedMember.selfReflection || {
                            reason: "",
                            currentView: "",
                            goal12Months: "",
                          },
                          cosigned: selectedMember.cosigned,
                          cosignedAt: selectedMember.cosignedAt,
                          smStatus: selectedMember.smStatus,
                          smFeedback: selectedMember.smFeedback,
                          isSecond: false,
                          changeReason: selectedMember.changeReason,
                          submitted: true,
                        };

                    const ctAbbr = trackToView.careerTrack
                      ? CAREER_TRACK_HIERARCHY[trackToView.careerTrack]?.abbr ||
                        "CT"
                      : "CT";
                    const specPart = trackToView.functionSpecialty
                      ? trackToView.functionSpecialty.split("—")[0].trim()
                      : "FS";
                    const specAbbr =
                      specPart
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase() || "SPEC";
                    const squadCode = "DWORK";

                    const currentLevel =
                      trackToView.span === "S3"
                        ? "FD2"
                        : trackToView.span === "S2"
                          ? "FD1"
                          : "FD0";
                    const proposedLevel = `FD${trackToView.span || "1"}`;

                    const currentCode = `${ctAbbr}-${specAbbr}-${squadCode}-${currentLevel}`;
                    const proposedCode = `${ctAbbr}-${specAbbr}-${squadCode}-${proposedLevel}`;

                    return (
                      <div className="space-y-5">
                        {/* Dynamically Styled Job Track Comparison Block requested by User */}
                        {(trackToView.isSecond ||
                          selectedMember.isSecondSubmission) && (
                          <div className="space-y-3">
                            <div className="bg-amber-50/20 border border-amber-200/50 p-4 rounded-xl font-sans relative overflow-hidden">
                              <div className="grid grid-cols-5 items-center gap-2">
                                {/* Current Job Track */}
                                <div className="col-span-2 text-center">
                                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block font-sans">
                                    JOB TRACK HIỆN TẠI
                                  </span>
                                  <span className="mt-1.5 block text-[13px] md:text-[14px] font-black font-mono text-slate-500 tracking-tight text-center truncate">
                                    {trackToView.isSecond
                                      ? "PD-PM-DWORK-FD1"
                                      : currentCode}
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
                                    {trackToView.isSecond
                                      ? "JOB TRACK ĐỀ XUẤT"
                                      : "JOB TRACK ĐỀ XUẤT"}
                                  </span>
                                  <span className="mt-1.5 block text-[13px] md:text-[14px] font-black font-mono text-[#d97706] tracking-tight text-center truncate">
                                    {trackToView.isSecond
                                      ? "SE-BE-DWORK-FD1"
                                      : proposedCode}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Lý do thay đổi / Lý do thêm track mới */}
                            <div className="bg-amber-50/30 border border-amber-200/40 p-3.5 rounded-xl space-y-1 font-sans text-left">
                              <span className="text-[9px] font-black uppercase text-[#9f5700] tracking-wider block font-sans">
                                {trackToView.isSecond
                                  ? "Lý do thêm Job Track mới"
                                  : "Lý do thay đổi Job Track"}
                              </span>
                              <p className="text-slate-650 text-xs font-semibold pl-2.5 border-l-2 border-amber-500 leading-relaxed italic">
                                "
                                {trackToView.changeReason ||
                                  "Chưa cung cấp lý do thay đổi."}
                                "
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Grid Choices */}
                        <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 font-sans">
                          <div className="space-y-1">
                            <span className="text-[9px] text-[#6b7280] font-bold uppercase tracking-widest block font-sans">
                              Career Track
                            </span>
                            <div className="text-[13px] font-extrabold text-slate-800 flex items-center gap-2 leading-none mt-1.5 font-sans">
                              <div className="w-5 h-5 rounded bg-[#0077ed] text-white font-extrabold text-[8.5px] flex items-center justify-center shrink-0">
                                {trackToView.careerTrack
                                  ? CAREER_TRACK_HIERARCHY[
                                      trackToView.careerTrack
                                    ]?.abbr || "CT"
                                  : "—"}
                              </div>
                              <span className="truncate">
                                {trackToView.careerTrack || "Chưa thiết lập"}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] text-[#6b7280] font-bold uppercase tracking-widest block font-sans">
                              Functional Domain
                            </span>
                            <div className="text-[13px] font-extrabold text-slate-800 flex items-center gap-2 leading-none mt-1.5 font-sans">
                              <div className="w-5 h-5 rounded bg-[#0077ed] text-white font-extrabold text-[8.5px] flex items-center justify-center shrink-0">
                                {trackToView.functionalDomain
                                  ? FUNCTIONAL_DOMAINS.find(
                                      (fd) =>
                                        fd.name ===
                                        trackToView.functionalDomain,
                                    )?.abbr || "FD"
                                  : "—"}
                              </div>
                              <span className="truncate leading-tight block">
                                {trackToView.functionalDomain ||
                                  "Chưa thiết lập"}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1 border-t border-slate-200/60 pt-3.5 col-span-2">
                            <span className="text-[9px] text-[#6b7280] font-bold uppercase tracking-widest block font-sans">
                              Specialty
                            </span>
                            <div className="text-[13px] font-extrabold text-slate-800 flex items-center gap-2 leading-none mt-1.5 font-sans">
                              <div className="w-5 h-5 rounded bg-[#1d9e75] text-white font-extrabold text-[8.5px] flex items-center justify-center shrink-0">
                                FS
                              </div>
                              <span className="truncate">
                                {trackToView.functionSpecialty ||
                                  "Chưa thiết lập"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Essay reflections */}
                        <div className="bg-amber-50/20 border border-amber-200/50 p-4 rounded-xl space-y-3 font-sans">
                          <span className="text-[12px] font-black uppercase text-[#9f5700] tracking-wider block font-sans">
                            Định vị vai trò & Bản phác thảo nghề nghiệp
                          </span>
                          <div className="space-y-2.5 text-xs">
                            <div>
                              <p className="font-extrabold text-[#0d2f5c]">
                                1. Lý do định vị bản thân theo Job Track này:
                              </p>
                              <p className="text-slate-500 font-semibold pl-2.5 leading-relaxed border-l-2 border-amber-400 italic">
                                "{trackToView.selfReflection?.reason || "Trống"}
                                "
                              </p>
                            </div>
                            <div>
                              <p className="font-extrabold text-[#0d2f5c]">
                                2. Thử thách / Mong muốn vượt bậc:
                              </p>
                              <p className="text-slate-500 font-semibold pl-2.5 leading-relaxed border-l-2 border-amber-400 italic">
                                "
                                {trackToView.selfReflection?.currentView ||
                                  "Trống"}
                                "
                              </p>
                            </div>
                            <div>
                              <p className="font-extrabold text-[#0d2f5c]">
                                3. Kế hoạch phát triển 12 tháng tới:
                              </p>
                              <p className="text-slate-500 font-semibold pl-2.5 leading-relaxed border-l-2 border-amber-400 italic">
                                "
                                {trackToView.selfReflection?.goal12Months ||
                                  "Trống"}
                                "
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Co-sign form card */}
                        <div className="bg-[#fcfdfe] border border-slate-200/95 rounded-xl p-5 space-y-4 font-sans text-left">
                          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                            <span className="text-xs">🔑</span>
                            <h4 className="text-[11.5px] font-black text-[#0d2f5c] uppercase tracking-wider font-sans">
                              {trackToView.isSecond
                                ? "Định biên & Co-sign Lộ trình mới"
                                : "Định biên & Co-sign"}
                            </h4>
                          </div>

                          <div className="space-y-3.5 text-xs font-sans">
                            {trackToView.cosigned ? (
                              <div className="animate-fade-in py-1.5 text-left flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[11px] text-emerald-650 font-extrabold font-sans">
                                  <span>
                                    ✓ Đã phê duyệt & ký xác nhận co-sign thành
                                    công (
                                    {trackToView.isSecond
                                      ? "Track 2"
                                      : "Track 1"}
                                    )
                                  </span>
                                </div>
                                {trackToView.cosignedAt && (
                                  <span className="font-mono text-[10px] text-slate-400 font-bold">
                                    {trackToView.cosignedAt.split(" - ")[0]}
                                  </span>
                                )}
                              </div>
                            ) : trackToView.smStatus === "rejected" ? (
                              <div className="space-y-2.5 animate-fade-in">
                                <p className="text-[10px] font-black text-amber-650 uppercase tracking-widest select-none">
                                  Ý kiến gửi yêu cầu rà soát đã lưu
                                </p>
                                <div className="py-2.5 px-3 bg-amber-50/40 border border-amber-200/60 text-slate-700 rounded-lg font-semibold text-[11.5px] italic leading-normal select-none">
                                  "
                                  {trackToView.smFeedback ||
                                    "SM yêu cầu rà soát điều chỉnh lại lựa chọn."}
                                  "
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-amber-600 font-extrabold font-sans pt-0.5">
                                  <span>
                                    ⚠ Đang chờ nhân sự rà soát và gửi lại yêu
                                    cầu
                                  </span>
                                </div>
                              </div>
                            ) : isReviewReasonOpen ? (
                              <div className="space-y-3.5">
                                <textarea
                                  value={reviewReasonInput}
                                  onChange={(e) =>
                                    setReviewReasonInput(e.target.value)
                                  }
                                  rows={3}
                                  placeholder="Nhập lý do hoặc ý kiến đóng góp ý kiến bổ sung tại đây để rà soát..."
                                  className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold text-[11.5px] placeholder-slate-400 leading-normal"
                                />

                                <div className="flex gap-3">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsReviewReasonOpen(false);
                                      setReviewReasonInput("");
                                    }}
                                    className="flex-1 inline-flex items-center justify-center border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-extrabold text-[10px] uppercase tracking-wider py-3 rounded-lg transition-all cursor-pointer bg-white"
                                  >
                                    Đóng xem xét
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleRejectMember(
                                        selectedMember.id,
                                        reviewReasonInput || undefined,
                                        trackToView.isSecond
                                          ? "second"
                                          : "first",
                                      );
                                      setIsReviewReasonOpen(false);
                                      setReviewReasonInput("");
                                    }}
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-[#004ecc] text-white font-extrabold text-[10px] uppercase tracking-wider py-3 rounded-lg shadow-3xs hover:shadow-2xs transition cursor-pointer"
                                  >
                                    Xác nhận và thông báo IG
                                  </button>
                                </div>
                              </div>
                            ) : delegatedTasks[selectedMember.id] ? null : (
                              <div className="space-y-3">
                                <div className="flex gap-3 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setIsReviewReasonOpen(true)}
                                    disabled={
                                      trackToView.smStatus === "rejected"
                                    }
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed font-extrabold text-[12px] uppercase tracking-wider py-3 rounded-lg transition-all cursor-pointer bg-white"
                                  >
                                    Xem xét thêm
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleCosignMember(
                                        selectedMember.id,
                                        trackToView.isSecond
                                          ? "Đồng ý phê duyệt định vị lộ trình mới Job Track 2 này."
                                          : "Đồng ý phê duyệt định vị lộ trình Job Track này.",
                                        trackToView.isSecond
                                          ? "second"
                                          : "first",
                                      );
                                    }}
                                    disabled={
                                      trackToView.smStatus === "rejected"
                                    }
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0077ed] hover:bg-[#0064c7] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white border border-transparent font-extrabold text-[12px] uppercase tracking-wider py-3 rounded-lg shadow-3xs hover:shadow-2xs transition-all cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />{" "}
                                    KÝ CO-SIGN{" "}
                                    {trackToView.isSecond ? "TRACK 2" : ""}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Delegation Section */}
                  {delegatedTasks[selectedMember.id] ? (
                    <div className="mt-4 p-4 bg-[#f0f6ff]/60 border border-[#0062ff]/12 rounded-lg space-y-2 font-sans text-left">
                      <div className="flex items-center gap-1.5 text-[#0077ed] font-black text-[11px] uppercase tracking-wider select-none">
                        <UserCheck className="w-4 h-4 text-[#0077ed] stroke-[2.25]" />
                        <span>ĐÃ ỦY QUYỀN PHÊ DUYỆT THÀNH CÔNG</span>
                      </div>
                      <p className="text-[11.5px] text-[#324157] leading-relaxed font-semibold">
                        Yêu cầu này đã được uỷ quyền phê duyệt cho{" "}
                        <b>{delegatedTasks[selectedMember.id].toSm.name}</b> (
                        {delegatedTasks[selectedMember.id].toSm.role}). Người
                        nhận uỷ quyền có toàn quyền phê duyệt chính thức thay
                        cho bạn.
                      </p>
                      {delegatedTasks[selectedMember.id].note && (
                        <div className="text-[11px] text-slate-650 bg-white p-2 border border-slate-150 rounded-lg italic mt-1 font-medium text-left">
                          <strong>Ghi chú lý do uỷ quyền:</strong> "
                          {delegatedTasks[selectedMember.id].note}"
                        </div>
                      )}
                      <span className="text-[9.5px] text-slate-400 font-mono font-bold block pt-1">
                        Thời gian: {delegatedTasks[selectedMember.id].at}
                      </span>
                    </div>
                  ) : (
                    !selectedMember.cosigned &&
                    selectedMember.smStatus !== "rejected" && (
                      <div className="mt-5 pt-5 border-t border-dashed border-slate-200/90 space-y-3 font-sans text-left">
                        {/* Header Block with text only (No Icon) */}
                        <div className="flex items-start gap-3">
                          <div className="font-sans leading-tight">
                            <h5 className="text-[11.5px] font-black text-[#0d2f5c] tracking-wider uppercase">
                              Ủy quyền phê duyệt co-sign dự phòng
                            </h5>
                            <p className="text-[10px] text-slate-400 font-bold leading-normal mt-1">
                              Đồng chí có thể uỷ quyền co-sign hồ sơ của thành
                              viên này cho một Supervisor Manager (SM) khác cùng
                              SBU Non-IT.
                            </p>
                          </div>
                        </div>

                        {/* Note Input Box */}
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Nhập ghi chú ủy quyền (nếu có)..."
                            value={delegationNote}
                            onChange={(e) => setDelegationNote(e.target.value)}
                            className="w-full h-10 px-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg font-semibold text-[11.5px] text-slate-750 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150"
                          />
                        </div>

                        {/* Setup Form (Directly placed, No outer card/wrapper box) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mt-2">
                          <div className="relative w-full">
                            <select
                              value={selectedDelegateSmId || ""}
                              onChange={(e) =>
                                setSelectedDelegateSmId(e.target.value)
                              }
                              className="w-full h-10 pl-3 pr-11 bg-white border border-slate-200 hover:border-slate-300 rounded-lg font-semibold text-[11.5px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150 cursor-pointer appearance-none truncate"
                              style={{ textOverflow: "ellipsis" }}
                            >
                              <option value="">
                                -- Chọn SM nhận uỷ quyền --
                              </option>
                              {SUPERVISOR_MANAGERS.filter(
                                (sm) => sm.sbu === "Non-IT",
                              ).map((sm) => (
                                <option
                                  key={sm.id}
                                  value={sm.id}
                                  className="truncate"
                                >
                                  {sm.name} — {sm.role} ({sm.branch})
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center">
                              <ChevronDown className="w-4 h-4 text-slate-400/80" />
                            </div>
                          </div>
                          <button
                            type="button"
                            disabled={!selectedDelegateSmId}
                            onClick={() => {
                              const delegateTo = SUPERVISOR_MANAGERS.find(
                                (sm) => sm.id === selectedDelegateSmId,
                              );
                              if (delegateTo) {
                                handleDelegateTask(
                                  selectedMember.id,
                                  delegateTo,
                                  delegationNote,
                                );
                                setSelectedDelegateSmId("");
                                setDelegationNote("");
                              }
                            }}
                            className={`w-full h-10 px-4.5 font-extrabold text-[12px] uppercase tracking-wider rounded-lg transition-all duration-150 border border-transparent select-none flex items-center justify-center ${
                              selectedDelegateSmId
                                ? "bg-[#0077ed] text-white hover:bg-[#0064c7] shadow-3xs cursor-pointer"
                                : "bg-[#e2e8f0] text-[#64748b] cursor-not-allowed"
                            }`}
                          >
                            Xác nhận ủy quyền
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 2: Members Directory Dashboard */}
          {smSubTab === "team" &&
            (() => {
              const teamDetails = [
                {
                  id: "L-2841",
                  name: "Minh Trần",
                  grade: "B3",
                  jobTrack: "PD×BIS×SWE×BE",
                  span: "S1",
                  bmi: "3.2",
                  bmiStatus: "self_done",
                  icm: "L2",
                  idp: 65,
                  sbi: 5,
                  qualify: false,
                  status: "Onboarding",
                  initials: "MT",
                  avatarBg: "bg-[#00a8cc] text-white",
                  buddy: "green",
                  coe: "green",
                  facilitator: "green",
                  sosOk: true,
                },
                {
                  id: "L-2790",
                  name: "Phạm Linh",
                  grade: "B4",
                  jobTrack: "DC×GTM×P&D×PM",
                  span: "S2",
                  bmi: "3.8",
                  bmiStatus: "calibrated",
                  icm: "L3",
                  idp: 82,
                  sbi: 8,
                  qualify: true,
                  status: "Active",
                  initials: "PL",
                  avatarBg: "bg-[#00b074] text-white",
                  buddy: "green",
                  coe: "green",
                  facilitator: "green",
                  sosOk: true,
                },
                {
                  id: "L-2815",
                  name: "Ngô Hải",
                  grade: "B2",
                  jobTrack: "PS×BIS×D&AI×DE",
                  span: "S1",
                  bmi: "2.1",
                  bmiStatus: "pending",
                  icm: "L1",
                  idp: 40,
                  sbi: 2,
                  qualify: false,
                  status: "Active",
                  initials: "NH",
                  avatarBg: "bg-[#008f8f] text-white",
                  buddy: "green",
                  coe: "red",
                  facilitator: "green",
                  sosOk: false,
                },
                {
                  id: "L-2856",
                  name: "Lê Trang",
                  grade: "B1",
                  jobTrack: "Chưa có",
                  span: "S1",
                  bmi: "—",
                  bmiStatus: "pending",
                  icm: "L1",
                  idp: 0,
                  sbi: 0,
                  qualify: false,
                  status: "Onboarding",
                  initials: "LT",
                  avatarBg: "bg-[#00a2c3] text-white",
                  buddy: "red",
                  coe: "red",
                  facilitator: "red",
                  sosOk: false,
                },
                {
                  id: "L-2798",
                  name: "Vũ Đức",
                  grade: "B4",
                  jobTrack: "CG×IPAG×CS×SOC",
                  span: "S2",
                  bmi: "3.5",
                  bmiStatus: "calibrated",
                  icm: "L3",
                  idp: 78,
                  sbi: 7,
                  qualify: true,
                  status: "Active",
                  initials: "VĐ",
                  avatarBg: "bg-[#02a0a0] text-white",
                  buddy: "green",
                  coe: "green",
                  facilitator: "green",
                  sosOk: true,
                },
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
                        <span className="text-[11px] font-bold text-slate-500 font-sans">
                          Thành viên
                        </span>
                      </div>
                      <div className="mt-2.5 text-left">
                        <div className="text-[24px] font-black text-slate-900 leading-none font-sans">
                          5
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                          2 onboarding
                        </span>
                      </div>
                    </div>

                    {/* Card 2: BMI Trung bình */}
                    <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                          <Activity className="w-3.5 h-3.5 stroke-[2.25]" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 font-sans">
                          BMI Trung bình
                        </span>
                      </div>
                      <div className="mt-2.5 text-left">
                        <div className="text-[24px] font-black text-slate-900 leading-none font-sans">
                          3.1
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                          1 dưới ngưỡng
                        </span>
                      </div>
                    </div>

                    {/* Card 3: Qualify Flag */}
                    <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Award className="w-3.5 h-3.5 stroke-[2.25]" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 font-sans">
                          Qualify Flag
                        </span>
                      </div>
                      <div className="mt-2.5 text-left">
                        <div className="text-[24px] font-black text-slate-900 leading-none font-sans">
                          2/5
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block font-sans">
                          đủ điều kiện
                        </span>
                      </div>
                    </div>

                    {/* Card 4: Chờ duyệt */}
                    <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                          <CalendarClock className="w-3.5 h-3.5 stroke-[2.25]" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 font-sans">
                          Chờ duyệt
                        </span>
                      </div>
                      <div className="mt-2.5 text-left">
                        <div className="text-[24px] font-black text-slate-900 leading-none font-sans">
                          0
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block truncate">
                          Span · Job Track · IDP
                        </span>
                      </div>
                    </div>

                    {/* Card 5: NAC Active */}
                    <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-3xs hover:shadow-2xs transition-all select-none col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                          <BellRing className="w-3.5 h-3.5 stroke-[2.25]" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 font-sans">
                          NAC Active
                        </span>
                      </div>
                      <div className="mt-2.5 text-left">
                        <div className="text-[24px] font-black text-slate-900 leading-none font-sans">
                          4
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                          2 coverage gap
                        </span>
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
                            <div className="text-[22px] font-black text-slate-800 leading-none font-sans">
                              2
                            </div>
                            <span className="text-[9px] text-slate-400 font-extrabold uppercase leading-none">
                              Pending
                            </span>
                          </div>

                          {/* Subcard 2: Self Done */}
                          <div className="bg-[#fffcf7] border border-orange-100/70 hover:bg-[#fffcf7] transition-colors py-3 px-1.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1 shadow-4xs">
                            <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                            <div className="text-[22px] font-black text-slate-800 leading-none font-sans">
                              1
                            </div>
                            <span className="text-[9px] text-orange-600 font-extrabold uppercase leading-none">
                              Self Done
                            </span>
                          </div>

                          {/* Subcard 3: Calibrated */}
                          <div className="bg-[#f5fffb] border border-emerald-100/70 hover:bg-[#ebfff7] transition-colors py-3 px-1.5 rounded-xl flex flex-col items-center justify-center text-center space-y-1 shadow-4xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <div className="text-[22px] font-black text-slate-800 leading-none font-sans">
                              2
                            </div>
                            <span className="text-[9px] text-emerald-600 font-extrabold uppercase leading-none">
                              Calibrated
                            </span>
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
                            {
                              name: "Minh Trần",
                              initials: "MT",
                              value: 65,
                              color: "bg-blue-500",
                              locked: true,
                            },
                            {
                              name: "Phạm Linh",
                              initials: "PL",
                              value: 82,
                              color: "bg-emerald-500",
                              locked: false,
                            },
                            {
                              name: "Ngô Hải",
                              initials: "NH",
                              value: 40,
                              color: "bg-orange-500",
                              locked: true,
                            },
                            {
                              name: "Lê Trang",
                              initials: "LT",
                              value: 0,
                              color: "bg-slate-350",
                              locked: true,
                            },
                            {
                              name: "Vũ Đức",
                              initials: "VĐ",
                              value: 78,
                              color: "bg-blue-500",
                              locked: true,
                            },
                          ].map((m, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-4 py-1 border-b border-slate-50 last:border-b-0"
                            >
                              {/* Avatar & Name */}
                              <div className="flex items-center gap-2.5 w-32 shrink-0">
                                <div
                                  className={`w-6.5 h-6.5 rounded-full bg-teal-600 text-white font-extrabold text-[9px] flex items-center justify-center shrink-0`}
                                >
                                  {m.initials}
                                </div>
                                <span className="text-xs font-bold text-slate-700 truncate text-left">
                                  {m.name}
                                </span>
                              </div>

                              {/* Progress bar */}
                              <div className="flex-1 flex items-center gap-2.5">
                                <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                                  <div
                                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${m.color}`}
                                    style={{ width: `${m.value}%` }}
                                  />
                                </div>
                                <span
                                  className={`text-[11px] font-extrabold w-8 text-right font-sans ${m.value > 0 ? (m.value >= 80 ? "text-emerald-600" : "text-slate-700") : "text-slate-400"}`}
                                >
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
                      <span className="font-extrabold text-[14px] text-slate-800 uppercase tracking-wider">
                        Chi tiết thành viên
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse font-sans text-xs min-w-[900px]">
                        <thead>
                          <tr className="bg-slate-50/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                            <th className="py-3 px-5 text-left font-bold">
                              THÀNH VIÊN
                            </th>
                            <th className="py-3 px-4 text-left font-bold">
                              JOB TRACK
                            </th>
                            <th className="py-3 px-4 text-center font-bold">
                              SPAN
                            </th>
                            <th className="py-3 px-4 text-center font-bold">
                              BMI
                            </th>
                            <th className="py-3 px-4 text-center font-bold">
                              BMI STATUS
                            </th>
                            <th className="py-3 px-4 text-center font-bold">
                              ICM
                            </th>
                            <th className="py-3 px-4 text-left font-bold w-[120px]">
                              IDP
                            </th>
                            <th className="py-3 px-4 text-center font-bold">
                              SBI
                            </th>
                            <th className="py-3 px-4 text-center font-bold">
                              QUALIFY
                            </th>
                            <th className="py-3 px-4 text-center font-bold">
                              TRẠNG THÁI
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/70 font-semibold text-slate-700">
                          {teamDetails.map((member) => {
                            // Find original matched report to enable interactivity
                            const matchingReport =
                              allMembers.find((m) => m.name === member.name) ||
                              allMembers[0];

                            return (
                              <tr
                                key={member.id}
                                onClick={() => {
                                  setSmSubTab("inbox");
                                  handleSelectMember(
                                    matchingReport.id,
                                    matchingReport,
                                  );
                                }}
                                className="hover:bg-slate-50/50 transition cursor-pointer group"
                              >
                                <td className="py-3.5 px-5 flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-full ${member.avatarBg} flex items-center justify-center font-extrabold text-[11px] shrink-0 shadow-3xs`}
                                  >
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
                                  {member.jobTrack === "Chưa có" ? (
                                    <span className="text-amber-500 font-bold italic text-xs">
                                      Chưa có
                                    </span>
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
                                  {member.bmi === "2.1" ? (
                                    <span className="text-amber-500">
                                      {member.bmi}
                                    </span>
                                  ) : (
                                    member.bmi
                                  )}
                                </td>

                                <td className="py-3.5 px-4 text-center">
                                  {member.bmiStatus === "self_done" && (
                                    <span className="bg-amber-50 text-amber-600 border border-amber-200/50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                      self_done
                                    </span>
                                  )}
                                  {member.bmiStatus === "calibrated" && (
                                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                      calibrated
                                    </span>
                                  )}
                                  {member.bmiStatus === "pending" && (
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
                                        className={`h-full rounded-full transition-all duration-500 ${member.idp > 80 ? "bg-emerald-500" : "bg-primary"}`}
                                        style={{ width: `${member.idp}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 w-7 text-right">
                                      {member.idp}%
                                    </span>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 text-center font-mono font-bold">
                                  {member.sbi === 2 ? (
                                    <span className="text-amber-500">
                                      {member.sbi}
                                    </span>
                                  ) : (
                                    member.sbi
                                  )}
                                </td>

                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-flex items-center justify-center">
                                    {member.qualify ? (
                                      <svg
                                        className="w-5 h-5 text-emerald-500 fill-current"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                      </svg>
                                    ) : (
                                      <svg
                                        className="w-5 h-5 text-slate-300 fill-current"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                                      </svg>
                                    )}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 text-center font-sans font-bold">
                                  {member.status === "Onboarding" ? (
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
                                <span className="font-extrabold text-slate-800">
                                  Minh Trần
                                </span>{" "}
                                BMI self-assessment sắp đến hạn
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
                                <span className="font-extrabold text-slate-800">
                                  Ngô Hải
                                </span>{" "}
                                SBI count thấp (2/3 minimum)
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
                                <span className="font-extrabold text-slate-800">
                                  Ngô Hải
                                </span>{" "}
                                IDP completion 40% — rất thấp
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
                                <span className="font-extrabold text-slate-800">
                                  Lê Trang
                                </span>{" "}
                                Chưa khai báo Job Track
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
                                <div
                                  className={`w-7 h-7 rounded-full ${member.avatarBg} flex items-center justify-center font-black text-[10px] shrink-0`}
                                >
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
                                      member.buddy === "green"
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 text-center font-sans"
                                        : "bg-rose-50 text-rose-600 border-rose-100 text-center font-sans"
                                    }`}
                                  >
                                    B
                                  </span>
                                  <span
                                    title="COE"
                                    className={`w-6 h-6 rounded flex items-center justify-center text-[10.5px] font-black tracking-wide border transition select-none ${
                                      member.coe === "green"
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 text-center font-sans"
                                        : "bg-rose-50 text-rose-600 border-rose-100 text-center font-sans"
                                    }`}
                                  >
                                    C
                                  </span>
                                  <span
                                    title="Facilitator"
                                    className={`w-6 h-6 rounded flex items-center justify-center text-[10.5px] font-black tracking-wide border transition select-none ${
                                      member.facilitator === "green"
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 text-center font-sans"
                                        : "bg-rose-50 text-rose-600 border-rose-100 text-center font-sans"
                                    }`}
                                  >
                                    F
                                  </span>
                                </div>

                                {/* Alert Check state icon */}
                                {member.sosOk ? (
                                  <svg
                                    className="w-5 h-5 text-emerald-500 fill-current shrink-0"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-4.5 h-4.5 text-amber-500 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                  </svg>
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
          {smSubTab === "discussion" && (
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
                      id: "L-2811",
                      name: "Nguyễn Anh Tuấn",
                      previewText: "Chào anh Minh, em đang hoàn thi...",
                      time: "10:30, 21/05",
                      initials: "T",
                    },
                    {
                      id: "L-2812",
                      name: "Phạm Minh Hoa",
                      previewText: "Chào anh Minh, em đã gửi kết quả...",
                      time: "14:15, 21/05",
                      initials: "H",
                    },
                    {
                      id: "L-2813",
                      name: "Lê Hoàng Nam",
                      previewText: "Anh Minh ơi, em vừa gửi đề xuất đ...",
                      time: "09:00, 22/05",
                      initials: "N",
                    },
                    {
                      id: "L-2814",
                      name: "Trần Thu Hà",
                      previewText: "Chào anh Minh, em đang hoàn thi...",
                      time: "11:00, 22/05",
                      initials: "H",
                    },
                    {
                      id: "L-2815",
                      name: "Vũ Hoàng Lâm",
                      previewText: "Chào anh Minh, em đã đạt đủ BMI...",
                      time: "13:30, 22/05",
                      initials: "L",
                    },
                    {
                      id: "L-2816",
                      name: "Lê Trang",
                      previewText: "Anh Minh ơi, em vừa submit khai b...",
                      time: "10:15, 23/05",
                      initials: "T",
                    },
                  ].map((user, idx) => {
                    const isSelected = selectedChatUserId === user.id;
                    const isTargetElement = idx === 1; // Phạm Minh Hoa user is the second element under div:nth-of-type(3)

                    // Build inline style or conditional style to strictly match CSS metadata for selector target
                    const customStyle = isTargetElement
                      ? {
                          fontSize: "12px",
                          marginBottom: "20px",
                          paddingBottom: "12px",
                          paddingTop: "12px",
                        }
                      : undefined;

                    return (
                      <div
                        key={user.id}
                        onClick={() => setSelectedChatUserId(user.id)}
                        style={customStyle}
                        className={`group p-3 rounded-2xl flex gap-3 transition cursor-pointer text-left leading-normal border ${
                          isSelected
                            ? "bg-white border-slate-200 shadow-sm"
                            : "bg-transparent border-transparent hover:bg-slate-50"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-[12px] shrink-0 bg-[#ecfdf5] text-[#10b981] border border-emerald-100`}
                        >
                          {user.initials}
                        </div>

                        {/* Content text: Name + Message preview */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-800 text-[13px] truncate">
                              {user.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {user.time}
                            </span>
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
                    {
                      id: "L-2811",
                      name: "Nguyễn Anh Tuấn",
                      role: "Fullstack Developer · dLINK Online",
                      initials: "T",
                    },
                    {
                      id: "L-2812",
                      name: "Phạm Minh Hoa",
                      role: "Fullstack Developer · dLINK Online",
                      initials: "H",
                    },
                    {
                      id: "L-2813",
                      name: "Lê Hoàng Nam",
                      role: "Fullstack Developer · dLINK Online",
                      initials: "N",
                    },
                    {
                      id: "L-2814",
                      name: "Frontend Developer · dLINK Online",
                      initials: "H",
                    },
                    {
                      id: "L-2815",
                      name: "Systems Analyst · dLINK Online",
                      initials: "L",
                    },
                    {
                      id: "L-2816",
                      name: "Systems Engineer · dLINK Online",
                      initials: "T",
                    },
                  ].find((u) => u.id === selectedChatUserId) || {
                    id: "L-2813",
                    name: "Lê Hoàng Nam",
                    role: "Fullstack Developer · dLINK Online",
                    initials: "N",
                  };

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
                          const isMe = msg.sender === "Đức Minh Trần";

                          return (
                            <div
                              key={msg.id}
                              className="flex gap-2.5 items-start text-left"
                            >
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
                            if (e.key === "Enter") {
                              if (!newMessageText.trim()) return;
                              setMessagesMap((prev) => ({
                                ...prev,
                                [selectedChatUserId]: [
                                  ...(prev[selectedChatUserId] || []),
                                  {
                                    id: Date.now(),
                                    sender: "Đức Minh Trần",
                                    text: newMessageText.trim(),
                                    time: "09:00, 22/05",
                                  },
                                ],
                              }));
                              setNewMessageText("");
                            }
                          }}
                          placeholder={`Gửi phản hồi dLINK cho ${currentUserDetails.name.split(" ").slice(-1)[0]}...`}
                          className="flex-1 py-2 px-4 bg-[#f8fafc] border border-slate-200 rounded-full font-semibold text-xs leading-normal focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newMessageText.trim()) return;
                            setMessagesMap((prev) => ({
                              ...prev,
                              [selectedChatUserId]: [
                                ...(prev[selectedChatUserId] || []),
                                {
                                  id: Date.now(),
                                  sender: "Đức Minh Trần",
                                  text: newMessageText.trim(),
                                  time: "09:00, 22/05",
                                },
                              ],
                            }));
                            setNewMessageText("");
                          }}
                          className="w-8 h-8 bg-[#02c074] hover:bg-[#02a061] text-white rounded-full flex items-center justify-center shadow-4xs transition shrink-0 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 text-white stroke-2 fill-none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
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

    const getSpecialtyAbbr = (specName: string | null) => {
      if (!specName) return "ARCH";
      if (specName.includes(" — ")) return specName.split(" — ")[0].trim();
      if (specName.includes("Architecture & Frontier")) return "ARCH";
      if (specName.includes("Backend Engineer")) return "BE";
      if (specName.includes("Client Engineering")) return "CE";
      if (specName.includes("Quality Engineering")) return "QE";
      if (specName.includes("Infrastructure Engineer")) return "INF";
      if (specName.includes("Systems Specialist")) return "SYS";
      if (specName.includes("DevOps Specialist")) return "DO";
      return specName.substring(0, 4).toUpperCase();
    };

    // Abbreviations for selected tracks
    const ctAbbr =
      CAREER_TRACK_HIERARCHY[state.careerTrack || "Product Design"]?.abbr ||
      "PD";
    const fdAbbr =
      FUNCTIONAL_DOMAINS.find((fd) => fd.name === state.functionalDomain)
        ?.abbr || "D&A";
    const fsAbbr = getSpecialtyAbbr(
      state.functionSpecialty || "Architecture & Frontier",
    );

    const secondCtAbbr =
      CAREER_TRACK_HIERARCHY[state.secondCareerTrack || "Product Design"]
        ?.abbr || "PD";
    const secondFdAbbr =
      FUNCTIONAL_DOMAINS.find((fd) => fd.name === state.secondFunctionalDomain)
        ?.abbr || "D&A";
    const secondFsAbbr = getSpecialtyAbbr(
      state.secondFunctionSpecialty || "Architecture & Frontier",
    );

    const editCtAbbr =
      CAREER_TRACK_HIERARCHY[currentEditTrack.careerTrack || "Product Design"]
        ?.abbr || "PD";
    const editFdAbbr =
      FUNCTIONAL_DOMAINS.find(
        (fd) => fd.name === currentEditTrack.functionalDomain,
      )?.abbr || "D&A";
    const editFsAbbr = getSpecialtyAbbr(
      currentEditTrack.functionSpecialty || "Architecture & Frontier",
    );

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs text-left space-y-6 w-full font-sans">
        {/* Title Header with icon (Flat, no surrounding box) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 font-sans gap-3">
          <div className="flex items-center gap-3 font-sans">
            <span className="w-10 h-10 rounded-full bg-[#f0f6ff] flex items-center justify-center text-primary border border-blue-100 flex-shrink-0">
              <UserCheck className="w-5 h-5 stroke-[2]" />
            </span>
            <div>
              <h2 className="text-[18px] font-black text-[#0d2f5c] font-sans leading-none">
                Trạng thái phê duyệt Job Track
              </h2>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                Lộ trình định danh sự nghiệp cá nhân
              </p>
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
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-550">
                Giả lập vai trò kiểm thử:
              </span>
            </div>
            <div className="flex rounded-xl bg-slate-200/60 p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSimulatedRole("employee")}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  currentRole === "employee"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                🙋‍♂️ Nhân viên / HRBP
              </button>
              <button
                type="button"
                onClick={() => setSimulatedRole("sm")}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  currentRole === "sm"
                    ? "bg-primary text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-850"
                }`}
              >
                👔 Quản lý trực tiếp (SM)
              </button>
              {state.hasSecondTrack &&
                (!state.cosigned || !state.secondCosigned) && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange({
                        ...state,
                        cosigned: true,
                        cosignedAt: "10:30 - Hôm nay",
                        secondCosigned: true,
                        secondCosignedAt: "10:32 - Hôm nay",
                        smStatus: "approved",
                        secondSmStatus: "approved",
                        submitted: true,
                        secondSubmitted: true,
                        isEditing: false,
                        secondIsEditing: false,
                      });
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer border-0 sm:ml-1"
                  >
                    ⚡ Ký Co-sign cả hai
                  </button>
                )}
            </div>
          </div>
        )}

        {/* Horizontal Progress Stepper */}
        <div className="relative font-sans select-none my-6">
          <div className="absolute top-5 left-[16.67%] right-[16.67%] h-[3px] bg-slate-200 hidden sm:block">
            <div
              className={`h-full bg-gradient-to-r transition-all duration-500 ${state.cosigned ? "from-emerald-500 to-emerald-500 w-full" : "from-emerald-500 to-amber-500 w-1/2"}`}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-2 relative">
            {/* Step 1: Đã gửi Job Track */}
            <div className="flex flex-col items-center text-center space-y-2.5 font-sans">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xs z-10 border-[3.5px] border-emerald-100">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="space-y-1 font-sans">
                <p className="text-[11px] sm:text-xs font-extrabold text-slate-800 leading-tight">
                  Đã gửi Job Track
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">
                  {state.submittedAt
                    ? state.submittedAt.split(" - ")[0]
                    : "Hôm nay"}{" "}
                  •{" "}
                  {state.submittedAt
                    ? state.submittedAt.split(" - ")[1] || "09:12"
                    : "09:12"}
                </p>
              </div>
            </div>

            {/* Step 2: Chờ SM co-sign */}
            <div className="flex flex-col items-center text-center space-y-2.5 font-sans">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white z-10 border-[3.5px] transition-all duration-300 ${
                  state.cosigned
                    ? "bg-emerald-500 border-emerald-100 shadow-2xs"
                    : "bg-amber-500 border-amber-100 shadow-xs ring-4 ring-amber-150 animate-pulse"
                }`}
              >
                {state.cosigned ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </div>
              <div className="space-y-1 font-sans">
                <p
                  className={`text-[11px] sm:text-xs font-extrabold leading-tight ${state.cosigned ? "text-slate-800" : "text-amber-600"}`}
                >
                  Chờ co-sign
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">
                  {state.cosigned
                    ? state.cosignedAt?.split(" - ")[0] || "Xác nhận"
                    : "Đang chờ • SLA 48h"}
                </p>
              </div>
            </div>

            {/* Step 3: Co-signed */}
            <div className="flex flex-col items-center text-center space-y-2.5 font-sans">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-[3.5px] transition-all duration-300 ${
                  state.cosigned
                    ? "bg-emerald-500 border-emerald-150 shadow-2xs ring-4 ring-emerald-100 text-white animate-fade-in"
                    : "bg-slate-100 border-slate-200 text-slate-400 shadow-3xs"
                }`}
              >
                <BadgeCheck className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1 font-sans">
                <p
                  className={`text-[11px] sm:text-xs leading-tight font-sans ${state.cosigned ? "text-emerald-600 font-black" : "text-slate-400 font-black"}`}
                >
                  {state.cosigned ? "Co-signed" : "SM ký xác nhận"}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium font-sans">
                  {state.cosigned
                    ? state.cosignedAt?.split(" - ")[1] || "09:12"
                    : "Chờ SM"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delegation Notification (Bắn sang cho IC và IG) */}
        {delegatedTasks["L-2841"] && (
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex items-start gap-3 shadow-3xs animate-fade-in font-sans text-left">
            <BellRing className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 animate-bounce-subtle" />
            <div className="font-sans">
              <span className="font-black text-indigo-800 text-[11px] uppercase tracking-wider block mb-1">
                📢 THÔNG BÁO ỦY QUYỀN PHÊ DUYỆT (HỆ THỐNG ĐÃ BẮN NOTI CHO IC VÀ
                IG)
              </span>
              <p className="text-[12px] text-slate-650 font-semibold leading-relaxed">
                Đề xuất co-sign Job Track của đồng chí đã được Quản lý trực tiếp
                uỷ quyền phê duyệt sang cho Quản lý{" "}
                <b>{delegatedTasks["L-2841"].toSm.name}</b> (
                {delegatedTasks["L-2841"].toSm.role} thuộc SBU Non-IT). Người
                nhận uỷ quyền có toàn quyền phê duyệt chính thức thay cho SM
                gốc. Bạn sẽ nhận được thông báo phản hồi ngay khi có kết quả
                duyệt từ {delegatedTasks["L-2841"].toSm.name}.
              </p>
              <span className="text-[9px] font-mono font-bold text-indigo-500 mt-2 block">
                {delegatedTasks["L-2841"].at}
              </span>
            </div>
          </div>
        )}

        {/* Dynamic Instructional Alert */}
        <div className="bg-[#f0f6ff]/60 border border-[#0062ff]/12 rounded-xl p-4 flex items-start gap-2.5 text-xs text-[#0f2d5a] font-medium leading-relaxed font-sans">
          <div className="flex gap-2.5 font-sans w-full">
            <div className="flex items-center gap-1.5 flex-shrink-0 pt-0.5 font-sans">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <div className="font-sans w-full">
              {state.cosigned ? (
                <span>
                  {" "}
                  Đề xuất Job Track của bạn đã được{" "}
                  <strong className="font-extrabold text-[#0062ff]">
                    SM {state.sm?.name} phê duyệt thành công
                  </strong>
                  !
                </span>
              ) : state.smStatus === "rejected" ? (
                <div className="space-y-1.5 text-left w-full">
                  <span>
                    {" "}
                    Đề xuất Job Track của bạn{" "}
                    <strong className="font-extrabold text-[#0d2f5c]">
                      cần xem xét lại
                    </strong>{" "}
                    theo phản hồi từ SM:
                  </span>
                  <div className="text-slate-600 italic font-medium mt-1">
                    "
                    {state.smFeedback ||
                      "SM yêu cầu xem xét lại định vị, vui lòng bổ sung đầy đủ 3 câu hỏi soi chiếu bản thân."}
                    "
                  </div>
                </div>
              ) : (
                <span>
                  {" "}
                  Đề xuất Job Track của bạn đang được liên kết gửi đến Quản lý
                  trực tiếp (SM) phê duyệt và co-sign.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── JOB TRACK PREVIEW & STATUS ── */}
        {state.cosigned || state.submitted ? (
          <div className="space-y-8 animate-fade-in font-sans">
            {/* ── JOB TRACK 1: CHÍNH ── */}
            {!state.track1Inactive && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-4 mt-2 font-sans">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-blue-50 text-primary border border-blue-100 flex items-center justify-center font-extrabold shadow-4xs shrink-0">
                      <Layers className="w-5.5 h-5.5 text-primary" />
                    </span>
                    <div>
                      <h2 className="text-[17px] font-black text-[#0d2f5c] leading-none font-sans">
                        {state.secondCosigned ||
                        (state.secondSubmitted && !state.secondCosigned)
                          ? "Job Track 1: Lộ trình chính"
                          : "Job Track"}
                      </h2>
                      <p className="text-[11px] text-slate-400 font-bold mt-1.5 font-sans">
                        {state.cosigned
                          ? "Đã định vị thành công lộ trình nghề nghiệp chính"
                          : "Đề xuất lộ trình đang chờ Quản lý trực tiếp phê duyệt và co-sign"}
                      </p>
                    </div>
                  </div>

                  {state.cosigned ? (
                    <div className="flex flex-wrap items-center gap-4 text-left font-sans">
                      <div className="flex items-center gap-1.5 text-[11.5px] text-[#10b981] font-black tracking-wider uppercase">
                        <Check className="w-4.5 h-4.5 text-[#10b981] shrink-0 stroke-[3.5]" />
                        <span>ĐANG HOẠT ĐỘNG (ACTIVE)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setInactiveConfirmTrack(1)}
                        className="h-10 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-700 font-black transition-all cursor-pointer shadow-3xs hover:shadow-2xs uppercase tracking-wider font-sans"
                      >
                        <span>Inactive</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-left font-sans">
                      <div className="h-10 px-3 bg-[#fffbeb] border border-amber-200 rounded-xl flex items-center gap-1.5 text-[11px] text-amber-700 font-black uppercase tracking-wider transition-all animate-pulse">
                        <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>ĐANG CHỜ CO-SIGN</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 custom Grid Cards for Track 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-300 font-sans">
                  <div className="bg-[#f2f6fc] border border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group hover:bg-[#ebf1f9] transition-all duration-300">
                    <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-widest font-mono">
                      CAREER TRACK (CT)
                    </span>
                    <div className="text-[36px] font-black text-[#0062ff] leading-none tracking-tight font-sans py-1">
                      {ctAbbr}
                    </div>
                    <span className="text-[13px] font-black text-[#324157]">
                      {state.careerTrack}
                    </span>
                  </div>
                  <div className="bg-[#f2f6fc] border border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group hover:bg-[#ebf1f9] transition-all duration-300">
                    <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-widest font-mono">
                      FUNCTIONAL DOMAIN (FD)
                    </span>
                    <div className="text-[36px] font-black text-amber-500 leading-none tracking-tight font-sans py-1">
                      {fdAbbr}
                    </div>
                    <span className="text-[13.5px] font-black text-[#324157] line-clamp-1">
                      {state.functionalDomain}
                    </span>
                  </div>
                  <div className="bg-[#f2f6fc] border border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group hover:bg-[#ebf1f9] transition-all duration-300">
                    <span className="text-[9.5px] uppercase font-black text-slate-400 tracking-widest font-mono">
                      FUNC. SPECIALTY (FS)
                    </span>
                    <div className="text-[36px] font-black text-pink-500 leading-none tracking-tight font-sans py-1">
                      {fsAbbr}
                    </div>
                    <span className="text-[13.5px] font-black text-[#324157] line-clamp-1">
                      {state.functionSpecialty}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ── JOB TRACK 2: LỘ TRÌNH MỚI (ĐÃ CO-SIGN HOẶC ĐANG CHỜ CO-SIGN) ── */}
            {(state.secondCosigned ||
              (state.secondSubmitted && !state.secondCosigned)) &&
              !state.track2Inactive && (
                <div className="space-y-5 pt-6 border-t border-slate-200 font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-4 mt-2">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-extrabold shadow-4xs shrink-0">
                        <Layers className="w-5.5 h-5.5 text-indigo-650" />
                      </span>
                      <div>
                        <h2 className="text-[17px] font-black text-[#0d2f5c] leading-none">
                          {state.secondCosigned
                            ? "Job Track 2: Lộ trình mới"
                            : "Job Track 2: Đang chờ co-sign"}
                        </h2>
                        <p className="text-[11px] text-slate-400 font-bold mt-1.5">
                          {state.secondCosigned
                            ? "Đã định vị thành công lộ trình nghề nghiệp mới"
                            : "Đề xuất lộ trình mới đang chờ Quản lý trực tiếp phê duyệt"}
                        </p>
                      </div>
                    </div>

                    {state.secondCosigned ? (
                      <div className="flex flex-wrap items-center gap-4 text-left">
                        <div className="flex items-center gap-1.5 text-[11.5px] text-[#10b981] font-black tracking-wider uppercase">
                          <Check className="w-4.5 h-4.5 text-[#10b981] shrink-0 stroke-[3.5]" />
                          <span>ĐANG HOẠT ĐỘNG (ACTIVE)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setInactiveConfirmTrack(2)}
                          className="h-10 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-700 font-black transition-all cursor-pointer shadow-3xs hover:shadow-2xs uppercase tracking-wider font-sans"
                        >
                          <span>Inactive</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-left">
                        <div className="h-10 px-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-1.5 text-[11px] text-amber-700 font-black uppercase tracking-wider transition-all animate-pulse">
                          <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>ĐANG CHỜ CO-SIGN</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3 custom Grid Cards for Track 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-300">
                    <div
                      className={`border rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group transition-all duration-300 ${
                        state.secondCosigned
                          ? "bg-[#f5f3ff] border-[#ddd6fe]/60 hover:bg-[#ede9fe]"
                          : "bg-[#fdfbf7] border-amber-100 hover:bg-[#fffbeb]"
                      }`}
                    >
                      <span className="text-[9.5px] uppercase font-black text-slate-405 tracking-widest font-mono">
                        CAREER TRACK (CT)
                      </span>
                      <div
                        className={`text-[36px] font-black leading-none tracking-tight font-sans py-1 ${
                          state.secondCosigned
                            ? "text-[#4f46e5]"
                            : "text-amber-600"
                        }`}
                      >
                        {secondCtAbbr}
                      </div>
                      <span
                        className={`text-[13px] font-black ${
                          state.secondCosigned
                            ? "text-[#4f46e5]"
                            : "text-amber-700"
                        }`}
                      >
                        {state.secondCareerTrack}
                      </span>
                    </div>

                    <div
                      className={`border rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group transition-all duration-300 ${
                        state.secondCosigned
                          ? "bg-[#f5f3ff] border-[#ddd6fe]/60 hover:bg-[#ede9fe]"
                          : "bg-[#fdfbf7] border-amber-100 hover:bg-[#fffbeb]"
                      }`}
                    >
                      <span className="text-[9.5px] uppercase font-black text-slate-405 tracking-widest font-mono">
                        FUNCTIONAL DOMAIN (FD)
                      </span>
                      <div className="text-[36px] font-black text-amber-500 leading-none tracking-tight font-sans py-1">
                        {secondFdAbbr}
                      </div>
                      <span
                        className={`text-[13.5px] font-black line-clamp-1 ${
                          state.secondCosigned
                            ? "text-[#4f46e5]"
                            : "text-amber-750"
                        }`}
                      >
                        {state.secondFunctionalDomain}
                      </span>
                    </div>

                    <div
                      className={`border rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-2 relative group transition-all duration-300 ${
                        state.secondCosigned
                          ? "bg-[#f5f3ff] border-[#ddd6fe]/60 hover:bg-[#ede9fe]"
                          : "bg-[#fdfbf7] border-amber-100 hover:bg-[#fffbeb]"
                      }`}
                    >
                      <span className="text-[9.5px] uppercase font-black text-slate-405 tracking-widest font-mono">
                        FUNC. SPECIALTY (FS)
                      </span>
                      <div className="text-[36px] font-black text-pink-500 leading-none tracking-tight font-sans py-1">
                        {secondFsAbbr}
                      </div>
                      <span
                        className={`text-[13.5px] font-black line-clamp-1 ${
                          state.secondCosigned
                            ? "text-[#4f46e5]"
                            : "text-amber-[#e0c463]"
                        }`}
                      >
                        {state.secondFunctionSpecialty}
                      </span>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4 font-sans select-none">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-[16px] font-black text-[#0d2f5c] uppercase tracking-wider flex items-center gap-2 font-sans">
                <Layers className="w-4 h-4 text-primary" />{" "}
                {state.submitted && !state.cosigned
                  ? "Job Track: Đang chờ co-sign"
                  : "Job track preview"}
              </h3>
              {state.submitted && !state.cosigned ? (
                <span className="text-[11px] font-extrabold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 font-sans animate-pulse">
                  ĐANG CHỜ CO-SIGN
                </span>
              ) : (
                <span className="text-[10px] font-extrabold bg-[#e3f2fd] text-primary px-3 py-0.5 rounded-full border border-blue-100 font-sans">
                  Thông tin đã đăng ký
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
              <div className="space-y-4 font-sans">
                <div className="flex flex-col gap-1.5 font-sans">
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-slate-400 font-bold uppercase tracking-widest block font-sans"
                  >
                    MANAGER (SM)
                  </span>
                  {state.sm ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div
                          className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[9px] text-white font-extrabold ${state.sm.avatarBg}`}
                        >
                          {state.sm.name.split(" ").slice(-1)[0][0]}
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-slate-800 block leading-tight">
                            {state.sm.name}
                          </span>
                          <span className="text-[10.5px] text-slate-500 font-medium leading-none">
                            {state.sm.role} ({state.sm.branch})
                          </span>
                        </div>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px]">
                      <div className="flex items-center gap-2.5 font-sans">
                        <span className="w-5.5 h-5.5 rounded-full border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 bg-slate-100">
                          ?
                        </span>
                        <span>Chưa chọn Quản lý</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-slate-400 font-bold uppercase tracking-widest block font-sans"
                  >
                    CAREER TRACK
                  </span>
                  {currentEditTrack.careerTrack ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className="w-5.5 h-5.5 rounded-lg bg-[#0077ed] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                          {editCtAbbr}
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                          {currentEditTrack.careerTrack}
                        </span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px]">
                      <div className="flex items-center gap-2.5 font-sans">
                        <span className="w-5.5 h-5.5 rounded-lg border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 bg-slate-100 font-mono">
                          CT
                        </span>
                        <span>Chưa chọn Career Track</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-slate-400 font-bold uppercase tracking-widest block font-sans"
                  >
                    FUNCTIONAL DOMAIN
                  </span>
                  {currentEditTrack.functionalDomain ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs font-sans">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className="w-5.5 h-5.5 rounded-lg bg-[#0077ed] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                          {editFdAbbr}
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                          {currentEditTrack.functionalDomain}
                        </span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0 font-sans">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px]">
                      <div className="flex items-center gap-2.5 font-sans">
                        <span className="w-5.5 h-5.5 rounded-lg border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 bg-slate-100 font-mono">
                          FD
                        </span>
                        <span>Đang khóa - Chọn CT để mở</span>
                      </div>
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-slate-400 font-bold uppercase tracking-widest block font-sans"
                  >
                    SPECIALTY
                  </span>
                  {currentEditTrack.functionSpecialty ? (
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl font-sans shadow-3xs font-sans">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className="w-5.5 h-5.5 rounded-lg bg-[#1d9e75] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0 font-sans">
                          FS
                        </div>
                        <span className="text-xs font-extrabold text-slate-800 line-clamp-1 font-sans">
                          {currentEditTrack.functionSpecialty}
                        </span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0 font-sans">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3 rounded-xl font-sans text-xs text-slate-400 italic shadow-3xs min-h-[46px]/ font-sans">
                      <div className="flex items-center gap-2.5 font-sans font-mono">
                        <span className="w-5.5 h-5.5 rounded-lg border border-slate-355 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0 font-mono">
                          FS
                        </span>
                        <span>Đang khóa - Chọn FD để mở</span>
                      </div>
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-3xs space-y-4 flex flex-col justify-start font-sans">
                <div className="text-[12px] font-bold uppercase text-slate-400 tracking-wider pb-3 border-b border-sidebar border-slate-100 font-sans">
                  BẢN PHÁC THẢO TỰ ĐỊNH VỊ VAI TRÒ
                </div>

                <div className="space-y-3.5 text-[13px] text-slate-800 leading-relaxed font-sans pt-1">
                  <div>
                    <span className="font-extrabold text-[#0d2f5c] font-sans">
                      Điều gì khiến tôi chọn lĩnh vực này:
                    </span>{" "}
                    {currentEditTrack.selfReflection.reason ? (
                      <span className="text-slate-600 font-medium font-sans">
                        {currentEditTrack.selfReflection.reason}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium font-sans italic">
                        Chưa nhập
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-extrabold text-[#0d2f5c] font-sans">
                      Tôi đang nhìn nhận vị trí hiện tại của mình thế nào:
                    </span>{" "}
                    {currentEditTrack.selfReflection.currentView ? (
                      <span className="text-slate-600 font-medium font-sans">
                        {currentEditTrack.selfReflection.currentView}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium font-sans italic">
                        Chưa nhập
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-extrabold text-[#0d2f5c] font-sans">
                      Tôi muốn trở thành gì trong 12 tháng tới:
                    </span>{" "}
                    {currentEditTrack.selfReflection.goal12Months ? (
                      <span className="text-slate-600 font-medium font-sans">
                        {currentEditTrack.selfReflection.goal12Months}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium font-sans italic">
                        Chưa nhập
                      </span>
                    )}
                  </div>

                  {currentEditTrack.isEditing && (
                    <div className="space-y-1 bg-amber-50/15 border border-amber-200/50 p-3 rounded-lg mt-2 font-sans">
                      <p className="font-extrabold text-[#9f5700] font-sans">
                        Lý do thay đổi Job Track (Lần 2):
                      </p>
                      <p className="text-slate-600 font-medium pl-2.5 border-l-2 border-amber-500 italic font-sans">
                        "
                        {currentEditTrack.changeReason ||
                          "Chưa điền lý do thay đổi."}
                        "
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Panel Actions */}
        <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans select-none w-full">
          {/* Left element: a single "Tạo Job Track mới" button that is ALWAYS ACTIVE to permit creating profiles */}
          <button
            type="button"
            onClick={handleAddSecondTrack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0077ed] hover:bg-[#0064c7] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition cursor-pointer font-sans"
          >
            <Plus className="w-4 h-4 text-white font-black stroke-[3.5]" /> Tạo
            Job Track mới
          </button>

          {/* Right element: Status information and controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end font-sans">
            {state.smStatus === "rejected" ? (
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-[11px] text-amber-700 bg-amber-50/50 border border-amber-200 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Yêu cầu xem xét bổ sung phản hồi
                </div>
                <button
                  type="button"
                  onClick={() => handleResetSubmit(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-500 hover:text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest transition cursor-pointer font-sans shadow-xs"
                >
                  <Edit2 className="w-4 h-4 text-slate-400" /> Chỉnh sửa Đề xuất
                  Job Track
                </button>
              </div>
            ) : state.secondSubmitted &&
              state.secondSmStatus !== "rejected" &&
              !state.secondCosigned ? (
              <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-black uppercase tracking-wider w-full sm:w-auto shadow-4xs font-sans">
                <Check className="w-4.5 h-4.5 text-indigo-600 animate-pulse shrink-0" />{" "}
                Đang chờ SM co-sign Track 2
              </div>
            ) : state.submitted && !state.cosigned ? (
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fffaeb] text-[#f59e0b] border border-amber-200 rounded-xl text-xs font-black uppercase tracking-wider w-full sm:w-auto shadow-4xs animate-pulse font-sans"
              >
                <Hourglass className="w-4.5 h-4.5 text-[#f59e0b] animate-spin shrink-0" />{" "}
                Đang chờ SM co-sign Track 1
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsHistoryOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-550 hover:text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans shadow-3xs"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Xem lịch sử xét duyệt</span>
              </button>
            )}
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
                    <h3 className="text-sm font-black text-[#011638] tracking-wide">
                      Lịch sử phê duyệt & thay đổi Job Track
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                      Mã định danh Ledger: ESB-JT-L2841
                    </p>
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

              {/* Tab Selector inside Modal */}
              <div className="px-6 pt-3 pb-0 bg-[#fafbfd] border-b border-slate-200 flex gap-4 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => setHistoryTab("approval")}
                  className={`pb-3 font-semibold transition-all relative border-b-2 cursor-pointer ${
                    historyTab === "approval"
                      ? "text-[#0062ff] border-[#0062ff] font-black"
                      : "text-slate-400 border-transparent hover:text-slate-600"
                  }`}
                >
                  Nhật lý xét duyệt
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryTab("versions")}
                  className={`pb-3 font-semibold transition-all relative border-b-2 cursor-pointer ${
                    historyTab === "versions"
                      ? "text-[#0062ff] border-[#0062ff] font-black"
                      : "text-slate-400 border-transparent hover:text-slate-600"
                  }`}
                >
                  Lịch sử thay đổi Job Track
                </button>
              </div>

              {/* Modal Body / History Steps */}
              <div className="p-6 text-left space-y-5 max-h-[380px] overflow-y-auto font-sans">
                {historyTab === "approval" ? (
                  <>
                    {/* Timeline item 3 (Live Co-signed) if applicable */}
                    {state.cosigned && (
                      <div className="relative pl-6 pb-2">
                        <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-emerald-100 -ml-px"></div>
                        <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white shadow-3xs flex items-center justify-center font-sans">
                          <Check className="w-2 h-2 text-white stroke-[3.5]" />
                        </div>
                        <div className="space-y-1 font-sans font-sans">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#002868] uppercase tracking-wider font-sans">
                              Đã hoàn tất Co-sign
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">
                              Thao tác ký số
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-normal font-sans">
                            Supervisor trực tiếp{" "}
                            <strong className="text-slate-800">
                              {state.sm?.name || "Nguyễn Anh Minh"}
                            </strong>{" "}
                            thực hiện phê duyệt chính thức và ký số lưu huân chương
                            sự nghiệp.
                          </p>
                          <span className="text-[9.5px] font-mono bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-black uppercase tracking-wide inline-block mt-1 font-sans">
                            Lịch sử: {state.submittedAt || "Mới nhận việc"}{" "}
                            (Verified)
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
                            <span className="text-xs font-black text-slate-800 uppercase tracking-wider font-sans">
                              Đã gửi Đề xuất
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold">
                              User Trần Minh
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-normal font-sans font-sans">
                            Lập bản đồ Career Path và SBU:{" "}
                            <strong className="text-slate-800">
                              {state.careerTrack} &gt; {state.functionSpecialty}
                            </strong>
                            . Trình hồ sơ đến đại diện Quản lý SBU.
                          </p>
                          {state.smStatus === "rejected" && (
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
                          <span className="text-xs font-black text-slate-700 uppercase tracking-wider font-sans">
                            Khởi tạo Dự thảo
                          </span>
                          <span className="text-[10px] text-slate-450 font-sans font-bold">
                            Hệ thống
                          </span>
                        </div>
                        <p className="text-xs text-slate-505 leading-normal font-sans font-sans">
                          Hồ sơ Job Track được khởi tạo thành công theo chính sách
                          ESB 7 ngày thử việc từ HRBP của Group.
                        </p>
                        <span className="text-[9.5px] text-slate-400 font-bold block pt-0.5 mt-1 font-sans font-sans">
                          3 ngày trước • Trạng thái lưu nháp cục bộ hoàn chỉnh
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3 font-sans">
                    {/* If Tracker 2 has been made inactive, show it inside history */}
                    {state.hasSecondTrack && state.track2Inactive && (
                      <div className="bg-slate-55/40 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-80 shadow-4xs animate-fade-in font-sans">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-black shrink-0 font-mono">
                            v3
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2 leading-none">
                              <span className="text-[13px] font-black text-slate-650 font-mono tracking-wide">
                                {secondCtAbbr} × {secondFdAbbr} × {secondFsAbbr}
                              </span>
                              <span className="text-[9.5px] font-black bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-220 uppercase tracking-widest leading-none">
                                INACTIVE
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                              Dừng hoạt động lộ trình phụ / đã được chuyển sang lưu trữ.
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 border-t md:border-t-0 border-slate-100 pt-2 md:pt-0">
                          <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans">
                            Trạng thái cuối
                          </span>
                          <span className="text-[11px] font-black text-[#5a6e85] mt-1 block font-sans">
                            Lưu trữ lịch sử
                          </span>
                        </div>
                      </div>
                    )}

                    {/* If Tracker 1 has been made inactive, show it inside history */}
                    {state.track1Inactive && (
                      <div className="bg-slate-55/40 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-80 shadow-4xs animate-fade-in font-sans">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-black shrink-0 font-mono">
                            v2
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2 leading-none">
                              <span className="text-[13px] font-black text-slate-650 font-mono tracking-wide">
                                {ctAbbr} × {fdAbbr} × {fsAbbr}
                              </span>
                              <span className="text-[9px] font-black bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-220 uppercase tracking-widest leading-none font-sans">
                                INACTIVE
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans">
                              Dừng hoạt động lộ trình chính để cập nhật điều chỉnh định hướng.
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 border-t md:border-t-0 border-slate-100 pt-2 md:pt-0">
                          <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans">
                            Trạng thái cuối
                          </span>
                          <span className="text-[11px] font-black text-[#5a6e85] mt-1 block font-sans">
                            Lưu trữ lịch sử
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Active v2 details (Only if Track 1 is active and second submission was made) */}
                    {state.isSecondSubmission && !state.track1Inactive && (
                      <div className="bg-[#f0fdf4] border border-[#a7f3d0]/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-4xs animate-fade-in">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                            v2
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2 leading-none">
                              <span className="text-[13px] font-black text-slate-800 font-mono tracking-wide">
                                {ctAbbr} × {fdAbbr} × {fsAbbr}
                              </span>
                              <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100 rounded-full uppercase tracking-widest leading-none">
                                ACTIVE
                              </span>
                            </div>
                            <p className="text-[11px] text-[#065f46] font-medium leading-relaxed font-sans">
                              Lý do: {state.changeReason || "Điều chỉnh định hướng phát triển cá nhân theo yêu cầu dự án mới."}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 border-t md:border-t-0 border-slate-100 pt-2 md:pt-0">
                          <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans">
                            Thời gian áp dụng
                          </span>
                          <span className="text-[11px] font-black text-slate-700 mt-1 block">
                            {state.cosignedAt?.split(" - ")[0] || "Hôm nay"} → Hiện tại
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Base v1 history item */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-75 shadow-4xs animate-fade-in">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-black shrink-0">
                          v1
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2 leading-none">
                            <span className="text-[13px] font-black text-slate-650 font-mono tracking-wide">
                              {ctAbbr} × {fdAbbr} × {state.isSecondSubmission ? "SYS" : fsAbbr}
                            </span>
                            <span className="text-[9px] font-black bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">
                              {state.isSecondSubmission ? "LƯU TRỮ" : "ACTIVE"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            Lý do: Khởi tạo Job Track ban đầu · Onboarding
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 border-t md:border-t-0 border-[#f1f5f9] pt-2 md:pt-0">
                        <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans">
                          Thời gian áp dụng
                        </span>
                        <span className="text-[11px] font-black text-slate-500 mt-1 block">
                          02/03/2026 → {state.isSecondSubmission ? (state.cosignedAt?.split(" - ")[0] || "Hôm nay") : "Hiện tại"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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

        {inactiveConfirmTrack !== null && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
            <div className="bg-white border border-slate-100 rounded-2xl max-w-md w-full p-6 shadow-2xl relative select-none animate-scale-up text-left">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4 text-[#e11d48]">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-rose-600 stroke-[2.25]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-850">
                    Xác nhận dừng Job Track {inactiveConfirmTrack}
                  </h3>
                  <p className="text-[10px] text-rose-500 font-extrabold tracking-wide uppercase mt-0.5">
                    Cảnh báo không thể hoàn tác
                  </p>
                </div>
              </div>

              <p className="text-slate-650 text-[13.5px] leading-relaxed font-semibold">
                Hành động này không thể hoàn tác, bạn có chắc chắn muốn kết thúc
                Job track này?
              </p>

              {/* Track detail card in modal */}
              <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block font-mono border-b border-slate-150 pb-1">
                  Thông tin Job Track {inactiveConfirmTrack === 1 ? "1 (Chính)" : "2 (Mới)"}
                </div>
                {inactiveConfirmTrack === 1 ? (
                  <div className="text-xs font-semibold text-slate-700 space-y-1">
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase text-[9.5px] inline-block w-8 mr-1">CT:</span>{" "}
                      <span className="text-slate-850 font-bold">{state.careerTrack || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase text-[9.5px] inline-block w-8 mr-1">FD:</span>{" "}
                      <span className="text-slate-850 font-bold">{state.functionalDomain || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase text-[9.5px] inline-block w-8 mr-1">FS:</span>{" "}
                      <span className="text-slate-850 font-bold">{state.functionSpecialty || "N/A"}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-slate-700 space-y-1">
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase text-[9.5px] inline-block w-8 mr-1">CT:</span>{" "}
                      <span className="text-slate-850 font-bold">{state.secondCareerTrack || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase text-[9.5px] inline-block w-8 mr-1">FD:</span>{" "}
                      <span className="text-slate-850 font-bold">{state.secondFunctionalDomain || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase text-[9.5px] inline-block w-8 mr-1">FS:</span>{" "}
                      <span className="text-slate-850 font-bold">{state.secondFunctionSpecialty || "N/A"}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setInactiveConfirmTrack(null)}
                  className="px-4 py-2 border border-slate-250 hover:bg-slate-50 text-slate-500 text-xs hover:text-slate-700 rounded-xl font-bold transition cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (inactiveConfirmTrack === 1) {
                      onChange({
                        ...state,
                        track1Inactive: true,
                      });
                    } else if (inactiveConfirmTrack === 2) {
                      onChange({
                        ...state,
                        track2Inactive: true,
                      });
                    }
                    setInactiveConfirmTrack(null);
                  }}
                  className="px-4.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  Đồng ý dừng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render unified setup form
  const selectedFdObj = FUNCTIONAL_DOMAINS.find(
    (fd) => fd.name === currentEditTrack.functionalDomain,
  );

  return (
    <div className="space-y-6">
      {/* 2-Column Responsive Layout matching mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ────────── LEFT COLUMN (FORMS) ────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* BLOCK: QUẢN LÝ TRỰC TIẾP (SM) - EXQUISITE BLUE INTEGRATED CARD (NON-SPLIT) */}
          <div
            className={`bg-[#f0f6ff]/60 border-2 border-[#0062ff]/15 rounded-2xl p-5 md:p-6 space-y-4 relative shadow-2xs ${isSmOpen ? "z-40" : "z-20"}`}
          >
            {/* Unified Header */}
            <div className="flex items-start gap-3">
              <div className="w-8.5 h-8.5 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0 border border-blue-200/40">
                <Bell className="w-4.5 h-4.5 text-primary" />
              </div>
              <div className="space-y-1 select-none">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-[#0d2f5c] text-[16px] uppercase tracking-wide font-sans">
                    QUẢN LÝ TRỰC TIẾP (SM) PHÊ DUYỆT
                  </h3>
                  {state.isSecondSubmission ? (
                    <span className="inline-block bg-slate-500 text-white font-extrabold text-[10px] tracking-wider px-2 py-0.5 rounded-md uppercase font-sans shrink-0">
                      Đã Cố Định SM
                    </span>
                  ) : null}
                </div>
                <p className="text-[12px] text-[#324157] font-normal leading-normal font-sans">
                  {state.isSecondSubmission
                    ? "Quản lý được giữ cố định từ lần tạo Job Track đầu tiên và không thể thay thế."
                    : "SM trực tiếp dự kiến phê duyệt để kích hoạt luồng đề xuất co-sign Job Track mới."}
                </p>
              </div>
            </div>

            {/* Input Selection Dropdown - System Auto Assigned (Always locked for IC) */}
            <div className="relative font-sans pt-1">
              <div className="w-full px-4 py-3 bg-blue-50/50 border border-blue-100 rounded-xl text-left flex items-center justify-between text-xs transition-all shadow-3xs select-none">
                <span className="flex items-center gap-2.5">
                  {state.sm ? (
                    <>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-white text-[9px] ${state.sm.avatarBg}`}
                      >
                        {state.sm.name.split(" ").slice(-1)[0][0]}
                      </div>
                      <span className="font-extrabold text-[#0d2f5c]">
                        {state.sm.name}
                      </span>
                      <span className="text-[11px] text-[#3b5998] font-semibold font-sans">
                        • {state.sm.role} ({state.sm.branch})
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-450 font-semibold font-sans">
                      -- Hệ thống tự động gán quản lý --
                    </span>
                  )}
                </span>
                <span className="text-[9px] uppercase font-black tracking-wider bg-blue-105 bg-blue-100 text-indigo-600 border border-indigo-200/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-sans">
                  🔒 Tự động phân bổ
                </span>
              </div>
            </div>
          </div>

          {/* Unified Timeline-Connected Config Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-10 relative">
            {/* Timeline Vertical Line Connector */}
            <div className="absolute left-[38px] md:left-[46px] top-[48px] bottom-[48px] w-[2px] bg-slate-100 z-0"></div>

            {/* BLOCK 2: CAREER TRACK (CT) */}
            <div
              className={`relative pl-12 md:pl-16 ${isCtOpen ? "z-30" : "z-10"}`}
            >
              {/* Timeline Circular Badge */}
              <div
                className={`absolute left-0 top-[6px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center font-bold font-mono text-xs transition-all ${
                  currentEditTrack.careerTrack
                    ? "bg-gradient-to-r from-[#0077ed] to-[#60a5fa] text-white shadow-3xs"
                    : "bg-white border-2 border-primary text-primary shadow-3xs"
                }`}
              >
                {currentEditTrack.careerTrack ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  "1"
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-855 text-[14px] uppercase tracking-widest pl-0.5">
                  CAREER TRACK (CT)
                </h3>

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
                      currentEditTrack.careerTrack
                        ? "border-[#0077ed] border-2 px-[15px] py-[11px] bg-white text-slate-900 font-semibold shadow-xs rounded-lg"
                        : "border border-slate-200 px-4 py-3 text-slate-400 hover:border-slate-300 bg-white rounded-lg"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {currentEditTrack.careerTrack ? (
                        <>
                          <div className="w-6 h-6 rounded bg-[#0077ed] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {CAREER_TRACK_HIERARCHY[
                              currentEditTrack.careerTrack
                            ]?.abbr || "CT"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-extrabold text-slate-900 text-[14px] block mb-0.5 leading-tight truncate">
                              {currentEditTrack.careerTrack}
                            </span>
                            <span className="text-slate-400 font-semibold text-[12px] block truncate">
                              {
                                CAREER_TRACK_HIERARCHY[
                                  currentEditTrack.careerTrack
                                ]?.description
                              }
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 font-medium font-sans truncate">
                          Chọn định hướng Career Track ban đầu...
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4.5 h-4.5 text-slate-500 transition-transform duration-200 shrink-0 ${isCtOpen ? "rotate-180 text-[#0077ed]" : ""}`}
                    />
                  </button>

                  {isCtOpen && (
                    <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-250 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto py-1 divide-y divide-slate-50">
                      {Object.keys(CAREER_TRACK_HIERARCHY).map((ctName) => {
                        const item = CAREER_TRACK_HIERARCHY[ctName];
                        const isSelected =
                          currentEditTrack.careerTrack === ctName;

                        return (
                          <button
                            key={ctName}
                            type="button"
                            onClick={() => handleSelectCT(ctName)}
                            className={`w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs cursor-pointer ${
                              isSelected ? "bg-blue-50/10" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0 pr-4">
                              <div className="w-6 h-6 rounded-md border font-black text-[10px] flex items-center justify-center shrink-0 bg-slate-100 text-slate-700">
                                {item.abbr}
                              </div>
                              <div className="min-w-0">
                                <div className="font-extrabold text-slate-900 text-[14px]">
                                  {ctName}
                                </div>
                                <div className="text-[12px] text-slate-400 font-semibold leading-tight mt-0.5">
                                  {item.description}
                                </div>
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
            <div
              className={`relative pl-12 md:pl-16 ${isFdOpen ? "z-30" : "z-10"}`}
            >
              {/* Timeline Circular Badge */}
              <div
                className={`absolute left-0 top-[6px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center font-bold font-mono text-xs transition-all ${
                  !currentEditTrack.careerTrack
                    ? "bg-slate-100 border border-slate-200 text-slate-350"
                    : currentEditTrack.functionalDomain
                      ? "bg-gradient-to-r from-[#0077ed] to-[#60a5fa] text-white shadow-3xs"
                      : "bg-slate-100 border-2 border-primary text-primary shadow-3xs"
                }`}
              >
                {!currentEditTrack.careerTrack ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : currentEditTrack.functionalDomain ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span>2</span>
                )}
              </div>

              <div className="space-y-3">
                <h3
                  className={`font-extrabold text-[14px] uppercase tracking-widest pl-0.5 ${currentEditTrack.careerTrack ? "text-slate-855" : "text-slate-400"}`}
                >
                  FUNCTIONAL DOMAIN (FD)
                </h3>

                <div className="relative font-sans">
                  <button
                    type="button"
                    disabled={!currentEditTrack.careerTrack}
                    onClick={() => {
                      setIsFdOpen(!isFdOpen);
                      setIsSmOpen(false);
                      setIsCtOpen(false);
                      setIsFsOpen(false);
                    }}
                    className={`w-full text-left flex items-center justify-between text-xs transition-all focus:outline-none cursor-pointer ${
                      !currentEditTrack.careerTrack
                        ? "bg-slate-100/50 border border-slate-200 px-4 py-3 text-slate-400 cursor-not-allowed opacity-75 rounded-lg"
                        : currentEditTrack.functionalDomain
                          ? "border-[#0077ed] border-2 px-[15px] py-[11px] bg-white text-slate-900 font-semibold shadow-xs rounded-lg"
                          : "border border-slate-200 px-4 py-3 hover:border-slate-300 text-slate-400 bg-white rounded-lg"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {currentEditTrack.functionalDomain ? (
                        <>
                          <div className="w-6 h-6 rounded bg-[#0077ed] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {FUNCTIONAL_DOMAINS.find(
                              (fd) =>
                                fd.name === currentEditTrack.functionalDomain,
                            )?.abbr || "FD"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-extrabold text-slate-900 text-[14px] block mb-0.5 leading-tight truncate">
                              {currentEditTrack.functionalDomain}
                            </span>
                            <span className="text-slate-400 font-semibold text-[12px] block truncate">
                              Lĩnh vực chuyên môn thuộc nhóm{" "}
                              {FUNCTIONAL_DOMAINS.find(
                                (fd) =>
                                  fd.name === currentEditTrack.functionalDomain,
                              )?.category || "FD"}{" "}
                              Group
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 font-medium font-sans truncate">
                          {currentEditTrack.careerTrack
                            ? "Chọn Functional Domain chuyên môn..."
                            : "Khóa - Hoàn tất CT để mở..."}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4.5 h-4.5 text-slate-500 transition-transform duration-200 shrink-0 ${isFdOpen ? "rotate-180 text-[#0077ed]" : ""}`}
                    />
                  </button>

                  {isFdOpen && currentEditTrack.careerTrack && (
                    <div className="absolute z-25 w-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl max-h-80 overflow-y-auto py-1 divide-y divide-slate-50">
                      {FUNCTIONAL_DOMAINS.filter((fd) =>
                        CAREER_TRACK_HIERARCHY[
                          currentEditTrack.careerTrack
                        ]?.domains.includes(fd.name),
                      ).map((fd) => {
                        const isSelected =
                          currentEditTrack.functionalDomain === fd.name;
                        return (
                          <button
                            key={fd.abbr}
                            type="button"
                            onClick={() => handleSelectFD(fd.name)}
                            className={`w-full text-left px-5 py-3.5 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs cursor-pointer ${
                              isSelected ? "bg-blue-50/20" : ""
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-4">
                              <span className="w-6 h-6 border border-slate-300 rounded-md text-slate-800 font-extrabold text-[10px] flex items-center justify-center shrink-0 bg-slate-50">
                                {fd.abbr}
                              </span>
                              <div className="min-w-0">
                                <p className="font-extrabold text-slate-900 text-[14px] leading-tight mb-0.5">
                                  {fd.name}
                                </p>
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
            <div
              className={`relative pl-12 md:pl-16 ${isFsOpen ? "z-30" : "z-10"}`}
            >
              {/* Timeline Circular Badge */}
              <div
                className={`absolute left-0 top-[6px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center font-bold font-mono text-xs transition-all ${
                  !currentEditTrack.functionalDomain
                    ? "bg-slate-100 border border-slate-200 text-slate-350"
                    : currentEditTrack.functionSpecialty
                      ? "bg-gradient-to-r from-[#0077ed] to-[#60a5fa] text-white shadow-3xs"
                      : "bg-slate-100 border-2 border-primary text-primary shadow-3xs"
                }`}
              >
                {!currentEditTrack.functionalDomain ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : currentEditTrack.functionSpecialty ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span>3</span>
                )}
              </div>

              <div className="space-y-3">
                <h3
                  className={`font-extrabold text-[14px] uppercase tracking-widest pl-0.5 ${currentEditTrack.functionalDomain ? "text-slate-855" : "text-slate-400"}`}
                >
                  FUNCTION SPECIALTY (FS)
                </h3>
                <div className="relative font-sans">
                  <button
                    type="button"
                    disabled={!currentEditTrack.functionalDomain}
                    onClick={() => {
                      setIsFsOpen(!isFsOpen);
                      setIsSmOpen(false);
                      setIsCtOpen(false);
                      setIsFdOpen(false);
                    }}
                    className={`w-full text-left flex items-center justify-between text-xs transition-all focus:outline-none cursor-pointer ${
                      !currentEditTrack.functionalDomain
                        ? "bg-slate-100/50 border border-slate-200 px-4 py-3 text-slate-400 cursor-not-allowed opacity-75 rounded-lg"
                        : currentEditTrack.functionSpecialty
                          ? "border-[#0077ed] border-2 px-[15px] py-[11px] bg-white text-slate-900 font-semibold shadow-xs rounded-lg"
                          : "border border-slate-200 px-4 py-3 hover:border-slate-300 text-slate-400 bg-white rounded-lg"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {currentEditTrack.functionSpecialty ? (
                        <>
                          <div className="w-6 h-6 rounded bg-[#0077ed] text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {currentEditTrack.functionSpecialty.includes(" — ")
                              ? currentEditTrack.functionSpecialty.split(
                                  " — ",
                                )[0]
                              : "FS"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="font-extrabold text-slate-900 text-[14px] block mb-0.5 leading-tight truncate">
                              {currentEditTrack.functionSpecialty}
                            </span>
                            <span className="text-slate-400 font-semibold text-[12px] block truncate">
                              Chuyên môn sâu thuộc lĩnh vực{" "}
                              {currentEditTrack.functionalDomain}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 font-medium font-sans truncate">
                          {currentEditTrack.functionalDomain
                            ? "Chọn Phân khúc Chuyên môn tương ứng..."
                            : "Khóa - Hoàn tất FD để mở..."}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4.5 h-4.5 text-slate-500 transition-transform duration-200 shrink-0 ${isFsOpen ? "rotate-180 text-[#0077ed]" : ""}`}
                    />
                  </button>

                  {isFsOpen &&
                    currentEditTrack.careerTrack &&
                    currentEditTrack.functionalDomain && (
                      <div className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto py-1 divide-y divide-slate-50">
                        {(
                          CAREER_TRACK_HIERARCHY[currentEditTrack.careerTrack]
                            ?.specialties[currentEditTrack.functionalDomain] ||
                          []
                        ).map((spec) => {
                          const isSelected =
                            currentEditTrack.functionSpecialty === spec;
                          return (
                            <button
                              key={spec}
                              type="button"
                              onClick={() => handleSelectFS(spec)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs cursor-pointer"
                            >
                              <span className="font-extrabold text-slate-800">
                                {spec}
                              </span>
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
              <h3 className="font-extrabold text-slate-850 text-[16px] uppercase tracking-wider">
                Phác thảo định vị vai trò & Bản phác thảo nghề nghiệp
              </h3>
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug">
                  1. Điều gì thúc đẩy lớn nhất?{" "}
                  {activeEditTab === "second" ||
                  state.smStatus === "pending" ||
                  state.isSecondSubmission ? (
                    <span className="text-xs font-extrabold text-rose-500 font-sans">
                      (Bắt buộc điền)
                    </span>
                  ) : (
                    <span className="text-xs font-normal text-slate-400 font-sans italic">
                      (Tùy chọn)
                    </span>
                  )}
                </label>
                <textarea
                  value={currentEditTrack.selfReflection.reason}
                  onChange={(e) =>
                    handleReflectionChange("reason", e.target.value)
                  }
                  rows={2}
                  placeholder="Ví dụ: Tôi thấy hứng thú với việc phân tác dữ liệu, kinh doanh..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-medium placeholder-slate-400/90 leading-normal"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug">
                  2. Khó khăn hiện tại là gì?{" "}
                  {activeEditTab === "second" ||
                  state.smStatus === "pending" ||
                  state.isSecondSubmission ? (
                    <span className="text-xs font-extrabold text-rose-500 font-sans">
                      (Bắt buộc điền)
                    </span>
                  ) : (
                    <span className="text-xs font-normal text-slate-400 font-sans italic">
                      (Tùy chọn)
                    </span>
                  )}
                </label>
                <textarea
                  value={currentEditTrack.selfReflection.currentView}
                  onChange={(e) =>
                    handleReflectionChange("currentView", e.target.value)
                  }
                  rows={2}
                  placeholder="Ví dụ: Nắm vững lý thuyết nhưng thiếu cơ hội thực hành..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/45 transition-all font-medium placeholder-slate-400/90 leading-normal"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug">
                  3. Hình mẫu/Kế hoạch học tập & phát triển 12 tháng tới?{" "}
                  {activeEditTab === "second" ||
                  state.smStatus === "pending" ||
                  state.isSecondSubmission ? (
                    <span className="text-xs font-extrabold text-rose-500 font-sans">
                      (Bắt buộc điền)
                    </span>
                  ) : (
                    <span className="text-xs font-normal text-slate-400 font-sans italic">
                      (Tùy chọn)
                    </span>
                  )}
                </label>
                <textarea
                  value={currentEditTrack.selfReflection.goal12Months}
                  onChange={(e) =>
                    handleReflectionChange("goal12Months", e.target.value)
                  }
                  rows={2}
                  placeholder="Ví dụ: Đạt chứng chỉ chuyên nghiệp, làm việc độc lập..."
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/45 transition-all font-medium placeholder-slate-400/90 leading-normal"
                />
              </div>

              {/* Question 4: Change Reason for Job Track 1 - Show only when editing 1st track */}
              {activeEditTab === "first" && state.isEditing && (
                <div className="space-y-1.5 animate-fade-in pt-3 border-t border-slate-100/60 mt-3 text-left">
                  <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug select-none">
                    4. Lý do thay đổi Job Track{" "}
                    <span className="text-xs font-extrabold text-rose-500 font-sans">
                      (Bắt buộc điền)
                    </span>
                  </label>
                  <textarea
                    id="input-change-reason"
                    value={state.changeReason || ""}
                    onChange={(e) => {
                      onChange({
                        ...state,
                        changeReason: e.target.value,
                      });
                    }}
                    rows={2}
                    placeholder="Giải trình lý do bạn thay đổi định hướng/lộ trình nghề nghiệp so với định vị cũ..."
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#0062ff]/40 transition-all font-medium placeholder-slate-400/90 leading-normal"
                  />
                </div>
              )}

              {/* Question 4: Addition Reason for Job Track 2 - Show only when editing 2nd track (mandatory!) */}
              {activeEditTab === "second" && (
                <div className="space-y-1.5 animate-fade-in pt-3 border-t border-slate-100/60 mt-3 text-left">
                  <label className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-snug select-none">
                    4. Lý do thêm job track mới{" "}
                    <span className="text-xs font-extrabold text-rose-500 font-sans">
                      (Bắt buộc điền)
                    </span>
                  </label>
                  <textarea
                    id="input-second-change-reason"
                    value={state.secondChangeReason || ""}
                    onChange={(e) => {
                      onChange({
                        ...state,
                        secondChangeReason: e.target.value,
                      });
                    }}
                    rows={2}
                    placeholder="Giải trình lý do bạn thêm lộ trình công việc mới phụ trợ vào định biên..."
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all font-medium placeholder-slate-400/90 leading-normal"
                  />
                </div>
              )}
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
                <span className="font-extrabold text-[16px] text-slate-900 uppercase tracking-wider">
                  Job Track Preview
                </span>
              </div>
              <p className="text-[11px] text-[#324157] font-semibold mt-1 font-sans">
                Cấu trúc định danh nghiệp vụ Job Track sẽ được tổng hợp tự động
                theo thời gian thực dưới đây
              </p>
            </div>

            {/* Sidebar body list */}
            <div className="p-5 space-y-5 font-sans">
              {/* Label - Value Pairs with visual icons */}
              <div className="space-y-4 text-xs font-semibold">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">
                    MANAGER (SM)
                  </span>
                  {state.sm ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <div className="flex items-center gap-2 font-sans">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white font-extrabold ${state.sm.avatarBg}`}
                        >
                          {state.sm.name.split(" ").slice(-1)[0][0]}
                        </div>
                        <span className="text-xs font-extrabold text-slate-800">
                          {state.sm.name}
                        </span>
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
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">
                    CAREER TRACK
                  </span>
                  {currentEditTrack.careerTrack ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                        {currentEditTrack.careerTrack}
                      </span>
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
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">
                    FUNCTIONAL DOMAIN
                  </span>
                  {currentEditTrack.functionalDomain ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                        {currentEditTrack.functionalDomain}
                      </span>
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
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">
                    SPECIALTY
                  </span>
                  {currentEditTrack.functionSpecialty ? (
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-sans">
                      <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                        {currentEditTrack.functionSpecialty}
                      </span>
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
                  <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest block font-sans">
                    BẢN PHÁC THẢO TỰ ĐỊNH VỊ VAI TRÒ
                  </span>
                  <div className="space-y-2.5 bg-slate-50 border border-slate-100 p-3 rounded-xl text-[12px] leading-relaxed text-left">
                    <div>
                      <span className="font-extrabold text-[#0d2f5c] block">
                        1. Động lực lựa chọn:
                      </span>
                      <span className="text-slate-600 block pl-1 italic font-medium">
                        {currentEditTrack.selfReflection.reason
                          ? `"${currentEditTrack.selfReflection.reason}"`
                          : "Chưa nhập..."}
                      </span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-2">
                      <span className="font-extrabold text-[#0d2f5c] block">
                        2. Nhận thức hiện tại:
                      </span>
                      <span className="text-slate-600 block pl-1 italic font-medium">
                        {currentEditTrack.selfReflection.currentView
                          ? `"${currentEditTrack.selfReflection.currentView}"`
                          : "Chưa nhập..."}
                      </span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-2">
                      <span className="font-extrabold text-[#0d2f5c] block">
                        3. Mục tiêu 12 tháng tới:
                      </span>
                      <span className="text-slate-600 block pl-1 italic font-medium">
                        {currentEditTrack.selfReflection.goal12Months
                          ? `"${currentEditTrack.selfReflection.goal12Months}"`
                          : "Chưa nhập..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative note */}
              <div className="bg-[#f0f5ff]/60 rounded-xl p-4 border border-blue-50 text-[12px] text-[#324157] leading-normal shadow-4xs font-normal font-sans">
                Hãy hoàn thành chọn cả 3 tiêu chí ở cột trái để tạo mã Job Track
                định danh nghề nghiệp
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
                  <h3 className="text-sm font-black text-[#011638] tracking-wide">
                    Lịch sử phê duyệt & thay đổi Job Track
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                    Mã định danh Ledger: ESB-JT-L2841
                  </p>
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

            {/* Tab Selector inside Modal */}
            <div className="px-6 pt-3 pb-0 bg-[#fafbfd] border-b border-slate-200 flex gap-4 font-sans text-xs">
              <button
                type="button"
                onClick={() => setHistoryTab("approval")}
                className={`pb-3 font-semibold transition-all relative border-b-2 cursor-pointer ${
                  historyTab === "approval"
                    ? "text-[#0062ff] border-[#0062ff] font-black"
                    : "text-slate-400 border-transparent hover:text-slate-600"
                }`}
              >
                Nhật lý xét duyệt
              </button>
              <button
                type="button"
                onClick={() => setHistoryTab("versions")}
                className={`pb-3 font-semibold transition-all relative border-b-2 cursor-pointer ${
                  historyTab === "versions"
                    ? "text-[#0062ff] border-[#0062ff] font-black"
                    : "text-slate-400 border-transparent hover:text-slate-600"
                }`}
              >
                Lịch sử thay đổi Job Track
              </button>
            </div>

            {/* Modal Body / History Steps */}
            <div className="p-6 text-left space-y-5 max-h-[380px] overflow-y-auto font-sans">
              {historyTab === "approval" ? (
                <>
                  {/* Timeline item 3 (Live Co-signed) if applicable */}
                  {state.cosigned && (
                    <div className="relative pl-6 pb-2">
                      <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-emerald-100 -ml-px font-sans"></div>
                      <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white shadow-3xs flex items-center justify-center font-sans">
                        <Check className="w-2 h-2 text-white stroke-[3.5]" />
                      </div>
                      <div className="space-y-1 font-sans">
                        <div className="flex items-center justify-between font-sans">
                          <span className="text-xs font-black text-[#002868] uppercase tracking-wider">
                            Đã hoàn tất Co-sign
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono font-bold animate-pulse">
                            Thao tác ký số
                          </span>
                        </div>
                        <p className="text-xs text-slate-550 leading-normal font-sans">
                          Supervisor trực tiếp{" "}
                          <strong className="text-slate-800">
                            {state.sm?.name || "Nguyễn Anh Minh"}
                          </strong>{" "}
                          thực hiện phê duyệt chính thức và ký số lưu huân chương sự
                          nghiệp.
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
                          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                            Đã gửi Đề xuất
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono font-bold">
                            User Trần Minh
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal font-sans">
                          Lập bản đồ Career Path và SBU:{" "}
                          <strong className="text-slate-800">
                            {state.careerTrack} &gt; {state.functionSpecialty}
                          </strong>
                          . Trình hồ sơ đến đại diện Quản lý SBU.
                        </p>
                        {state.smStatus === "rejected" && (
                          <div className="p-2.5 bg-[#fff1f2] border border-[#fecdd3]/60 rounded-xl text-rose-600 text-xs mt-1.5 font-medium italic font-sans">
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
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                          Khởi tạo Dự thảo
                        </span>
                        <span className="text-[10px] text-slate-450 font-sans font-bold">
                          Hệ thống
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-normal font-sans">
                        Hồ sơ Job Track được khởi tạo thành công theo chính sách ESB
                        7 ngày thử việc từ HRBP của Group.
                      </p>
                      <span className="text-[9.5px] text-slate-400 font-bold block pt-0.5 mt-1 font-sans">
                        3 ngày trước • Trạng thái lưu nháp cục bộ hoàn chỉnh
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3 font-sans">
                  {/* If Tracker 2 has been made inactive, show it inside history */}
                  {state.hasSecondTrack && state.track2Inactive && (
                    <div className="bg-slate-55/40 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-80 shadow-4xs animate-fade-in font-sans">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-black shrink-0 font-mono">
                          v3
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2 leading-none">
                            <span className="text-[13px] font-black text-slate-650 font-mono tracking-wide">
                              {secondCtAbbr} × {secondFdAbbr} × {secondFsAbbr}
                            </span>
                            <span className="text-[9.5px] font-black bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-220 uppercase tracking-widest leading-none">
                              INACTIVE
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            Dừng hoạt động lộ trình phụ / đã được chuyển sang lưu trữ.
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 border-t md:border-t-0 border-slate-100 pt-2 md:pt-0">
                        <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans">
                          Trạng thái cuối
                        </span>
                        <span className="text-[11px] font-black text-[#5a6e85] mt-1 block font-sans">
                          Lưu trữ lịch sử
                        </span>
                      </div>
                    </div>
                  )}

                  {/* If Tracker 1 has been made inactive, show it inside history */}
                  {state.track1Inactive && (
                    <div className="bg-slate-55/40 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-80 shadow-4xs animate-fade-in font-sans">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-black shrink-0 font-mono">
                          v2
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2 leading-none">
                            <span className="text-[13px] font-black text-slate-650 font-mono tracking-wide">
                              {ctAbbr} × {fdAbbr} × {fsAbbr}
                            </span>
                            <span className="text-[9px] font-black bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-220 uppercase tracking-widest leading-none font-sans">
                              INACTIVE
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans">
                            Dừng hoạt động lộ trình chính để cập nhật điều chỉnh định hướng.
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 border-t md:border-t-0 border-slate-100 pt-2 md:pt-0">
                        <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans">
                          Trạng thái cuối
                        </span>
                        <span className="text-[11px] font-black text-[#5a6e85] mt-1 block font-sans">
                          Lưu trữ lịch sử
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Active v2 details (Only if Track 1 is active and second submission was made) */}
                  {state.isSecondSubmission && !state.track1Inactive && (
                    <div className="bg-[#f0fdf4] border border-[#a7f3d0]/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-4xs animate-fade-in font-sans">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                          v2
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2 leading-none">
                            <span className="text-[13px] font-black text-slate-800 font-mono tracking-wide">
                              {ctAbbr} × {fdAbbr} × {fsAbbr}
                            </span>
                            <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100 rounded-full uppercase tracking-widest leading-none">
                              ACTIVE
                            </span>
                          </div>
                          <p className="text-[11px] text-[#065f46] font-medium leading-relaxed font-sans">
                            Lý do: {state.changeReason || "Điều chỉnh định hướng phát triển cá nhân theo yêu cầu dự án mới."}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 border-t md:border-t-0 border-slate-100 pt-2 md:pt-0">
                        <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans">
                          Thời gian áp dụng
                        </span>
                        <span className="text-[11px] font-black text-slate-700 mt-1 block">
                          {state.cosignedAt?.split(" - ")[0] || "Hôm nay"} → Hiện tại
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Base v1 history item */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-75 shadow-4xs animate-fade-in font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-black shrink-0">
                        v1
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 leading-none">
                          <span className="text-[13px] font-black text-slate-650 font-mono tracking-wide">
                            {ctAbbr} × {fdAbbr} × {state.isSecondSubmission ? "SYS" : fsAbbr}
                          </span>
                          <span className="text-[9px] font-black bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">
                            {state.isSecondSubmission ? "LƯU TRỮ" : "ACTIVE"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans">
                          Lý do: Khởi tạo Job Track ban đầu · Onboarding
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 border-t md:border-t-0 border-[#f1f5f9] pt-2 md:pt-0">
                      <span className="text-[9px] text-[#94a3b8] font-extrabold uppercase tracking-widest block font-sans font-sans">
                        Thời gian áp dụng
                      </span>
                      <span className="text-[11px] font-black text-slate-500 mt-1 block font-sans font-sans">
                        02/03/2026 → {state.isSecondSubmission ? (state.cosignedAt?.split(" - ")[0] || "Hôm nay") : "Hiện tại"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
