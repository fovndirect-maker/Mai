import React, { useState } from 'react';
import { Target, Award, ArrowRight, ShieldCheck, HelpCircle, BookOpen, ChevronRight, Activity, HelpCircle as Help } from 'lucide-react';
import { MOCK_COMPETENCIES } from '../data';

interface DepthTrackViewProps {
  selectedSpecialty: string | null;
  selectedSpan: string | null;
  onGoToJobTrack: () => void;
}

export default function DepthTrackView({ selectedSpecialty, selectedSpan, onGoToJobTrack }: DepthTrackViewProps) {
  // If nothing is selected, let's fall back to "Portfolio Advisory" but show a notice
  const activeSpecialty = selectedSpecialty || 'Portfolio Advisory';
  
  const getCompetencyData = (specialtyName: string) => {
    if (MOCK_COMPETENCIES[specialtyName]) {
      return MOCK_COMPETENCIES[specialtyName];
    }
    return {
      desc: `Năng lực chuyên môn tích hợp, đảm nhận nghiên cứu, huấn luyện và trực tiếp giải quyết các bài toán nghiệp vụ / kỹ thuật chuyên biệt liên quan đến ${specialtyName} tại hệ thống ESB.`,
      coreSkills: [`${specialtyName} Core`, 'Design Integration', 'Performance Audit', 'Risk Mitigating'],
      levels: {
        'S1': [
          `Hiểu rõ các khái niệm cốt lõi, quy trình tác nghiệp cơ bản và nhóm công cụ nền tảng hỗ trợ ${specialtyName}.`,
          `Có năng lực thực hiện chuẩn chu các tác vụ sơ cấp dưới sự hướng dẫn tỉ mỉ từ chuyên gia cấp cao.`,
          `Thực hành thành thạo kỹ năng tra cứu tài liệu và tuân thủ tuyệt đối quy trình nội bộ.`
        ],
        'S2': [
          `Độc lập tác nghiệp, làm chủ toàn diện các vụ việc kỹ thuật thường nhật liên quan đến ${specialtyName}.`,
          `Xử lý nhạy bén các sự cố nghiệp vụ phát sinh trung bình mà không cần người quản lý trực tiếp can thiệp.`,
          `Đề xuất nhiều cải tiến thiết thực giúp tối ưu hóa tiến độ vận hành và tăng trải nghiệm người dùng.`
        ],
        'S3': [
          `Làm chủ hoàn chỉnh các bài toán kĩ thuật / nghiệp vụ rủi ro và phức tạp nhất của chuyên ngành ${specialtyName}.`,
          `Đồng hành dẫn dắt và kèm cặp (mentoring) chuyên môn trực tiếp hiệu quả cho đội nhóm đàn em cấp dưới.`,
          `Đóng vai trò kiểm định chất lượng tác nghiệp xuất sắc, biên soạn bộ quy chuẩn đo lường năng lực.`
        ],
        'S4': [
          `Chuyên gia đầu tiếng tăm về ${specialtyName} cấp tập đoàn, cố vấn định hình chiến lược dài hạn cho ban giám đốc.`,
          `Nghiên cứu áp dụng thành tựu công nghệ đột phá bậc nhất nâng tầm vượt bậc vị thế cạnh tranh của ESB trên thị trường.`,
          `Kiến tạo nền tảng tri thức cốt lõi hệ thống, đào tạo bồi dưỡng đội ngũ nhân tài kế thừa xuất sắc.`
        ]
      }
    };
  };

  const data = getCompetencyData(activeSpecialty);
  
  const [selectedLevel, setSelectedLevel] = useState<string>(selectedSpan || 'S2');

  return (
    <div className="space-y-6">
      
      {/* Dynamic Alert if viewing preview */}
      {!selectedSpecialty && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-amber-900 text-xs">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              Bạn chưa khai báo Job Track hoặc chưa được Quản lý kí duyệt. Hiện tại hệ thống đang hiển thị bản **Xem trước mẫu năng lực (Preview): {activeSpecialty}**.
            </div>
          </div>
          <button
            onClick={onGoToJobTrack}
            className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg transition"
          >
            Khai báo Job Track ngay
          </button>
        </div>
      )}

      {/* Main Framework Intro card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider">
              {activeSpecialty}
            </span>
            <span className="text-[12px] text-slate-400 font-semibold">• Khung năng lực chi tiết</span>
          </div>

          <h3 className="text-[16px] font-bold text-slate-800">Chiều sâu Chuyên môn chuyên biệt (Depth Track)</h3>
          <p className="text-[14px] text-slate-500 leading-relaxed">
            {data.desc}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {data.coreSkills.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 text-[12px] bg-slate-100 text-slate-600 border border-slate-200 font-semibold rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Current status display */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wide">Trạng thái tự khai</span>
            <div className="text-2xl font-extrabold text-indigo-900">{selectedSpan || 'Chưa gán'}</div>
            <p className="text-[11px] text-indigo-500 font-medium">Bản đồ học tập và lộ trình chứng chỉ tương đương</p>
          </div>

          <div className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-semibold text-center border mt-4">
            Đợt đánh giá: Thử việc Quý 2/2026
          </div>
        </div>

      </div>

      {/* Levels and criteria details split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Selector level list */}
        <div className="space-y-2">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Chọn bậc phân bổ (Span)</span>
          
          {['S1', 'S2', 'S3', 'S4'].map((level) => {
            const labels: Record<string, string> = {
              S1: 'Foundation (Cơ bản)',
              S2: 'Developing (Phát triển)',
              S3: 'Proficient (Thạo việc)',
              S4: 'Expert (Chuyên gia)'
            };
            const isTarget = selectedSpan === level;
            
            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedLevel === level
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold scale-[1.01]'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-[12px] uppercase tracking-wider font-semibold opacity-60">Span {level}</div>
                  <div className="text-[12px] font-bold truncate max-w-[150px]">{labels[level]}</div>
                </div>
                {isTarget && (
                  <span className="text-[12px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Đã khai
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Level criteria details list */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" /> Tiêu chí Kỹ năng chi tiết của Span {selectedLevel}
            </h4>
            <span className="text-[12px] text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
              Chỉ số tối thiểu vượt qua thử việc
            </span>
          </div>

          <div className="space-y-4">
            {data.levels[selectedLevel]?.map((bullet, idx) => (
              <div key={idx} className="flex gap-3.5 p-3.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[12px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Quick learning roadmap recommended widgets */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <h5 className="text-[16px] font-bold text-slate-500 uppercase tracking-wide">
              Đề xuất tư liệu học học chuẩn hóa cho bạn
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="text-[14px] font-bold text-slate-800 group-hover:text-indigo-600">Lớp chuẩn phân bổ lý thuyết {selectedLevel}</h6>
                    <span className="text-[12px] text-slate-400 font-medium">E-learning • 4 bài học</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="text-[14px] font-bold text-slate-800 group-hover:text-emerald-600">Đề thi thử chứng chỉ Span {selectedLevel}</h6>
                    <span className="text-[12px] text-slate-400 font-medium">Lớp luyện đề • 40 câu trắc nghiệm</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
