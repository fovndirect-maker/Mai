import React, { useState } from 'react';
import { Target, Layers, Play, Calendar, CheckSquare, Plus, Trash2, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface Goal {
  id: string;
  category: 'learning' | 'practice';
  text: string;
  targetMonth: string;
  completed: boolean;
}

const INITIAL_IDP_GOALS: Goal[] = [
  { id: '1', category: 'learning', text: 'Hoàn thành khóa học luyện thi Chứng chỉ CFP quốc tế (F1-F4)', targetMonth: 'Tháng 6/2026', completed: false },
  { id: '2', category: 'learning', text: 'Vượt qua bài test nội bộ về Giao dịch phái sinh ký quỹ tại ESB', targetMonth: 'Tháng 7/2026', completed: false },
  { id: '3', category: 'practice', text: 'Thực hành tư vấn và lập kế hoạch tài chính mẫu thành công cho 5 khách hàng Non-IT', targetMonth: 'Tháng 6/2026', completed: true },
  { id: '4', category: 'practice', text: 'Kèm cặp, đồng hành xử lý hồ sơ mở tài khoản số lượng lớn (Block Account) cùng SBU', targetMonth: 'Tháng 7/2026', completed: false }
];

export default function IDPTrackView() {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_IDP_GOALS);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<'learning' | 'practice'>('learning');
  const [newGoalMonth, setNewGoalMonth] = useState('Tháng 06/2026');
  const [submitted, setSubmitted] = useState(false);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      category: newGoalCategory,
      text: newGoalText.trim(),
      targetMonth: newGoalMonth,
      completed: false
    };

    setGoals([...goals, newGoal]);
    setNewGoalText('');
  };

  const handleToggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const handleActionSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Feedback Banner */}
      {submitted && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-xs font-semibold">
            Đã lưu nháp Bản Kế hoạch Phát triển cá nhân IDP! Bạn có thể chỉnh sửa thêm trước khi chính thức gửi phê duyệt sau khi Job Track được kí duyệt.
          </div>
        </div>
      )}

      {/* Main Info Top Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[12px] font-bold uppercase tracking-wider">
            IDP · Kế hoạch Phát triển cá nhân
          </div>
          <h3 className="text-[16px] font-bold text-slate-800">Lộ trình rèn luyện cá nhân thử việc (Your IDP Plan)</h3>
          <p className="text-[14px] text-slate-500 leading-relaxed">
            Individual Development Plan (IDP) là bản phối hợp hành động giữa bạn và Supervisor nhằm cụ thể hóa: Bạn cần **Học thêm lớp gì (Learning)** và **Thực chiến vụ việc gì (Practice)** để đạt đúng ngưỡng năng lực của Span đề ra.
          </p>
        </div>

        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={handleActionSubmit}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[12px] rounded-xl transition"
          >
            Lưu bản nháp IDP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Goals List Panel (Left) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h4 className="text-[16px] font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-1.5">
            <CheckSquare className="w-5 h-5 text-indigo-600" /> Mục tiêu hành động Quý II/2026
          </h4>

          <div className="space-y-3">
            {goals.map((g) => {
              const bgClass = g.completed ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 hover:border-slate-300';
              const badgeClass = g.category === 'learning' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100';
              
              return (
                <div key={g.id} className={`flex items-start gap-3 p-4 rounded-xl border transition ${bgClass}`}>
                  <button
                    onClick={() => handleToggleGoal(g.id)}
                    className="mt-0.5 flex-shrink-0 focus:outline-none"
                    title={g.completed ? "Đánh dấu chưa hoàn thành" : "Đánh dấu hoàn thành"}
                  >
                    {g.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300"></div>
                    )}
                  </button>
                  
                  <div className="flex-1 space-y-1">
                    <p className={`text-[14px] font-bold leading-normal ${g.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {g.text}
                    </p>
                    <div className="flex items-center gap-2 pl-0.5">
                      <span className={`text-[12px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${badgeClass}`}>
                        {g.category === 'learning' ? 'Học tập' : 'Thực chiến'}
                      </span>
                      <span className="text-[12px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Hạn đạt: {g.targetMonth}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteGoal(g.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition flex-shrink-0"
                    title="Xóa mục tiêu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            {goals.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-[12px]">
                Chưa có mục tiêu nào trong kế hoạch. Hãy tạo mục tiêu mới bằng cách dùng form bên tay phải!
              </div>
            )}
          </div>
        </div>

        {/* Add goal form (Right) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h4 className="text-[16px] font-bold text-slate-400 uppercase tracking-widest">Thêm mục tiêu mới</h4>
          
          <form onSubmit={handleAddGoal} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-700">Phân loại</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewGoalCategory('learning')}
                  style={{ fontSize: '12px' }}
                  className={`py-2 text-[12px] font-semibold rounded-xl border text-center transition ${
                    newGoalCategory === 'learning' 
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' 
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Học tập & Chứng chỉ
                </button>
                <button
                  type="button"
                  onClick={() => setNewGoalCategory('practice')}
                  style={{ fontSize: '12px' }}
                  className={`py-2 text-[12px] font-semibold rounded-xl border text-center transition ${
                    newGoalCategory === 'practice' 
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold' 
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Tác nghiệp thực tế
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-700">Chi tiết hành động cụ thể</label>
              <textarea
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                rows={3}
                placeholder="Ví dụ: Thi đạt kết quả Đạt trong bài đánh giá Tư vấn ủy thác của đối tác bảo hiểm AIA..."
                className="w-full p-3 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors font-medium placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-700">Thời hạn mục tiêu</label>
              <select
                value={newGoalMonth}
                onChange={(e) => setNewGoalMonth(e.target.value)}
                style={{ fontSize: '12px' }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-medium text-slate-700 focus:outline-none focus:border-indigo-500"
              >
                <option value="Tháng 06/2026">Tháng 06/2026</option>
                <option value="Tháng 07/2026">Tháng 07/2026</option>
                <option value="Tháng 08/2026">Tháng 08/2026</option>
                <option value="Tháng 09/2026">Tháng 09/2026</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[12px] rounded-xl transition flex items-center justify-center gap-1 tracking-wide"
            >
              <Plus className="w-4 h-4" /> Thêm vào Kế hoạch IDP
            </button>

          </form>

          <div className="border-t border-slate-200 pt-4 space-y-2">
            <div className="flex items-center gap-2 text-[12px] text-amber-700 bg-amber-50 rounded-lg p-2 leading-relaxed">
              <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                Các mục tiêu IDP ban đầu sẽ đóng vai trò dự kiến, bạn có thể thảo luận cùng SM trong các buổi định kỳ Check-in 1-1 hàng tuần.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
