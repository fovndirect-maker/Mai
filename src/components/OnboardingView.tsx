import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Download, ArrowRight, FileText, Play, GraduationCap, Award, HelpCircle } from 'lucide-react';
import { MOCK_ONBOARDING_TASKS, MOCK_RESOURCES } from '../data';

interface OnboardingViewProps {
  onStartJobTrack: () => void;
}

export default function OnboardingView({ onStartJobTrack }: OnboardingViewProps) {
  const [tasks, setTasks] = useState(MOCK_ONBOARDING_TASKS);
  const [showToast, setShowToast] = useState<string | null>(null);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, done: !t.done };
      }
      return t;
    }));
  };

  const handleDownload = (title: string) => {
    setShowToast(`Đã tải xuống tài liệu: ${title}`);
    setTimeout(() => {
      setShowToast(null);
    }, 3000);
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div id="onboarding-view" className="space-y-6">
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-slide-up text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <GraduationCap className="w-3.5 h-3.5" /> Onboarding Mới gia nhập ESB
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Chào mừng Trần Minh đến đại gia đình ESB!</h2>
          <p className="text-blue-100 text-sm max-w-xl">
            Hãy thực hiện từng bước kiểm tra theo chỉ định để chuẩn bị tốt thức ăn tinh thần, chứng chỉ pháp lý nghiệp vụ cho hành trình phía trước.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center text-center w-full md:w-36 flex-shrink-0 border border-white/10">
          <div className="text-3xl font-bold">{progressPercent}%</div>
          <div className="text-xs text-blue-100 mt-1">Hoàn thành</div>
          <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Grid of Checklist & Study Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Task Checklist Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Danh sách việc cần làm (Checklist)
              </h3>
              <span className="text-[12px] text-slate-500 font-medium">Lớp định hướng Tháng 5/2026</span>
            </div>

            <p className="text-[12px] text-slate-500 mb-4 bg-slate-50 px-3 py-2 rounded-lg">
              * Click chọn các đầu việc đã thực hiện để cập nhật tiến độ tự động lên DMS.
            </p>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                    task.done
                      ? 'bg-slate-50 border-slate-200 text-slate-400'
                      : task.highlight
                      ? 'bg-indigo-50/70 border-indigo-200 hover:border-indigo-300'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <button className="mt-0.5 flex-shrink-0 focus:outline-none">
                    {task.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                    ) : (
                      <Circle className={`w-5 h-5 ${task.highlight ? 'text-indigo-500' : 'text-slate-400'}`} />
                    )}
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[14px] font-semibold leading-snug ${task.done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </span>
                      {task.deadline === 'Day 1' && (
                        <span className="text-[12px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">Khân</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> Hạn chót: {task.deadline}</span>
                      {task.highlight && !task.done && (
                        <span className="text-indigo-600 font-semibold text-[12px]">Cần làm ngay</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-[12px] text-slate-500">
              Bạn đã hoàn thành <strong className="text-slate-800">{completedCount}</strong> trên <strong className="text-slate-800">{tasks.length}</strong> nhiệm vụ.
            </div>
            {tasks.find(t => t.id === '3' && !t.done) && (
              <button
                onClick={onStartJobTrack}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[14px] font-semibold px-4 py-2.5 rounded-xl transition shadow-xs group"
              >
                Khai báo Job Track ngay <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        {/* Resources & Guideline Panel */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-[16px] font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider text-slate-500">
              Tài nguyên nhập môn
            </h3>

            <div className="space-y-4">
              {MOCK_RESOURCES.map((res, idx) => (
                <div key={idx} className="flex gap-3 hover:bg-slate-50 p-2.5 rounded-xl transition border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    {res.type === 'PDF' && <FileText className="w-5 h-5" />}
                    {res.type === 'VIDEO' && <Play className="w-5 h-5 fill-indigo-600" />}
                    {res.type === 'COURSE' && <Award className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-slate-700 truncate">{res.title}</p>
                    <div className="flex items-center gap-2 text-[12px] text-slate-400 mt-0.5">
                      <span className="uppercase font-semibold text-indigo-500">{res.type}</span>
                      <span>•</span>
                      <span>{res.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(res.title)}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 flex-shrink-0 self-center"
                    title="Tải xuống tài liệu"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-[16px]">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Quy định thời hạn kí nhận
            </div>
            <p className="text-[14px] text-amber-700 leading-relaxed">
              Theo chính sách của văn phòng tổng giám đốc **ESB**, mọi quy trình thiết lập Job Track cho nhân sự mới phải được duyệt trong vòng **7 ngày** đầu tiên kể từ ngày kí hợp đồng thử việc. 
            </p>
            <div className="text-[12px] font-bold text-amber-600">Ban Nhân Sự (HR - ESB Corp)</div>
          </div>

        </div>

      </div>
    </div>
  );
}
