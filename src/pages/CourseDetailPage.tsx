import { useState } from 'react';
import { 
  ArrowLeft, Clock, GraduationCap, Check, BookOpen, Sparkles, 
  Play, Copy, Send, CreditCard, Building2, Smartphone, ShieldCheck
} from 'lucide-react';
import { useAsync } from '@/lib/useAsync';
import { useNavigate } from '@/lib/router';
import { MOCK_COURSES } from '@/lib/mockData';
import { formatPrice } from '@/lib/format';
import { Spinner, ErrorState } from '@/components/States';

export default function CourseDetailPage({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const { data: course, error, loading } = useAsync(async () => {
    const c = MOCK_COURSES.find((item) => item.slug === slug);
    if (!c) throw new Error('Course not found');
    return c;
  }, [slug]);

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !course) return <div className="pt-32"><ErrorState message={error ?? 'Could not load this course.'} /></div>;

  const sampleVideoUrl = course.video_url || 'https://assets.mixkit.co/videos/preview/mixkit-decorating-a-hall-for-a-wedding-41584-large.mp4';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const bankAccounts = [
    {
      bank: 'Commercial Bank of Ethiopia (CBE)',
      accountName: 'Daniel Wodajo',
      accountNumber: '1000 4892 3410 8',
      type: 'Bank Transfer',
      icon: Building2,
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      bank: 'Telebirr',
      accountName: 'Daniel Wodajo',
      accountNumber: '0911 234 567',
      type: 'Mobile Wallet',
      icon: Smartphone,
      color: 'bg-blue-50 text-blue-900 border-blue-200'
    },
    {
      bank: 'Bank of Abyssinia',
      accountName: 'Daniel Wodajo',
      accountNumber: '8912 3041 2001 9',
      type: 'Bank Transfer',
      icon: CreditCard,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container-px max-w-6xl mx-auto">
        
        {/* Navigation */}
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 text-sm font-medium text-wine-900/60 hover:text-wine-700 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </button>

        {/* Course Header Info */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
            <span className="rounded-full bg-wine-50 text-wine-700 px-3.5 py-1 text-xs font-semibold border border-wine-100">
              {course.level}
            </span>
            <span className="flex items-center gap-1 text-wine-900/60 text-xs font-medium">
              <Clock className="h-3.5 w-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-1 text-wine-900/60 text-xs font-medium">
              <GraduationCap className="h-3.5 w-3.5" /> Taught by {course.instructor}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-wine-900 tracking-tight leading-tight">
            {course.title}
          </h1>
          <p className="mt-3 text-base text-wine-900/70 max-w-3xl leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* 1. INTRODUCTION VIDEO SECTION (AT THE TOP) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-wine-900 flex items-center gap-2">
              <Play className="h-5 w-5 text-wine-700 fill-wine-700" /> Introduction & Preview Video
            </h2>
            <span className="text-xs font-medium text-wine-900/50 bg-stone-100 px-3 py-1 rounded-full">
              Course Trailer
            </span>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-lg border border-stone-200 group">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={course.image_url} 
                  alt={course.title} 
                  className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-wine-950/40 to-transparent" />
                
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 flex items-center justify-center h-20 w-20 rounded-full bg-wine-700 text-cream-100 shadow-2xl hover:scale-110 transition-transform active:scale-95 group/btn"
                  aria-label="Play Introduction Video"
                >
                  <Play className="h-8 w-8 ml-1 fill-cream-100" />
                </button>
                <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cream-200/80 font-medium">Preview</span>
                    <h3 className="text-lg font-serif text-cream-100 font-semibold">{course.title} Intro</h3>
                  </div>
                  <span className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs text-cream-100 border border-white/10">
                    Watch Introduction (2:45)
                  </span>
                </div>
              </div>
            ) : (
              <video 
                src={sampleVideoUrl} 
                controls 
                autoPlay 
                className="h-full w-full object-cover"
                onEnded={() => setIsPlaying(false)}
              />
            )}
          </div>
        </div>

        {/* 2. PAYMENT & ENROLLMENT SECTION (BELOW THE VIDEO) */}
        <div className="mb-14 rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wine-100 text-wine-800 text-xs font-semibold mb-3">
              <ShieldCheck className="h-4 w-4" /> Official Payment Instructions
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-wine-900">
              Payment & Enrollment Details
            </h2>
            <p className="mt-2 text-sm sm:text-base text-wine-900/70">
              Course Fee: <span className="font-serif text-xl font-bold text-wine-700">{formatPrice(course.price)}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Bank Accounts List */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-wine-900 uppercase tracking-wider mb-1">
                Bank Account Information
              </h3>

              {bankAccounts.map((acc) => {
                const AccIcon = acc.icon;
                const isCopied = copiedAccount === acc.bank;
                return (
                  <div 
                    key={acc.bank} 
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex gap-4 items-start sm:items-center">
                      <div className={`p-3 rounded-xl ${acc.color} shrink-0`}>
                        <AccIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-wine-900 text-sm">{acc.bank}</p>
                        <p className="text-xs text-wine-900/60 mt-0.5">Account Name: <span className="font-medium text-wine-900">{acc.accountName}</span></p>
                        <p className="font-mono text-base font-bold text-wine-900 mt-1">{acc.accountNumber}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(acc.accountNumber.replace(/\s+/g, ''), acc.bank)}
                      className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-wine-700 bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Account</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Telegram Screenshot Submission Card */}
            <div className="lg:col-span-5 rounded-2xl bg-white border-2 border-wine-700/20 p-6 sm:p-8 shadow-card flex flex-col">
              <div className="h-12 w-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-100">
                <Send className="h-6 w-6" />
              </div>
              
              <h3 className="font-serif text-xl font-semibold text-wine-900">
                Send Payment Screenshot
              </h3>
              <p className="text-xs sm:text-sm text-wine-900/70 mt-2 leading-relaxed">
                After completing your payment transfer, please send a screenshot of your payment receipt to our official Telegram account to confirm your enrollment and unlock course materials.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <p className="text-xs text-wine-900/60 font-medium">Telegram Support Handle</p>
                <p className="font-semibold text-wine-900 text-sm sm:text-base mt-0.5">@Kadanie_Courses</p>
              </div>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-wine-700 px-6 py-4 text-sm font-semibold text-cream-100 shadow-soft hover:bg-wine-800 transition-colors"
              >
                <Send className="h-4 w-4" />
                Send Receipt on Telegram
              </a>
            </div>

          </div>
        </div>

        {/* Course Overview & Curriculum Details */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Highlights */}
          {course.highlights && course.highlights.length > 0 && (
            <div className="lg:col-span-6">
              <h2 className="font-serif text-xl font-semibold text-wine-900 flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-wine-600" /> What's Included
              </h2>
              <div className="grid gap-3">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl bg-stone-50 border border-stone-100 p-4">
                    <div className="mt-0.5 rounded-full bg-wine-100 p-1 text-wine-700 shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-wine-900/80">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum */}
          {course.curriculum && course.curriculum.length > 0 && (
            <div className="lg:col-span-6">
              <h2 className="font-serif text-xl font-semibold text-wine-900 flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-wine-600" /> Course Curriculum
              </h2>
              <div className="grid gap-3">
                {course.curriculum.map((c, i) => (
                  <div key={i} className="flex items-center gap-3.5 rounded-2xl border border-stone-100 bg-stone-50 p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-wine-700 text-cream-100 text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-wine-900/80 font-medium">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
