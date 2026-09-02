import { useState } from 'react';
import { 
  ArrowLeft, Clock, GraduationCap, Check, BookOpen, Sparkles, 
  Play, Copy, Send, CreditCard, Building2, Smartphone, ShieldCheck,
  CheckCircle2, Lock, ArrowRight
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
      badge: 'Most Popular'
    },
    {
      bank: 'Telebirr',
      accountName: 'Daniel Wodajo',
      accountNumber: '0911 234 567',
      type: 'Mobile Wallet',
      icon: Smartphone,
      badge: 'Instant Transfer'
    },
    {
      bank: 'Bank of Abyssinia',
      accountName: 'Daniel Wodajo',
      accountNumber: '8912 3041 2001 9',
      type: 'Bank Transfer',
      icon: CreditCard,
      badge: 'Fast Clearance'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-cream-200 min-h-screen">
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
              <>
                <img 
                  src={course.image_url} 
                  alt={course.title} 
                  className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-wine-950/40 to-transparent" />
                
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-20 w-20 rounded-full bg-wine-700 text-cream-100 shadow-2xl hover:scale-110 transition-all active:scale-95 group/btn"
                  aria-label="Play Introduction Video"
                >
                  <Play className="h-8 w-8 fill-cream-100 translate-x-0.5" />
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
              </>
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

        {/* 2. PAYMENT & ENROLLMENT SECTION (REDESIGNED SENIOR UI/UX) */}
        <div className="mb-16 rounded-3xl bg-white border border-wine-700/15 p-6 sm:p-10 shadow-card relative overflow-hidden">
          {/* Subtle ambient glow accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-wine-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-wine-900/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wine-50 text-wine-800 text-xs font-semibold border border-wine-200/60 mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-wine-700" />
                <span>Verified Payment & Direct Instant Access</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-900 tracking-tight">
                How to Enroll & Payment Details
              </h2>
              <p className="mt-1 text-sm text-wine-900/60">
                Complete your transfer to any of our official accounts, then submit your receipt via Telegram.
              </p>
            </div>

            {/* Price Badge */}
            <div className="shrink-0 flex items-center gap-3 bg-wine-950 text-cream-100 px-5 py-3.5 rounded-2xl shadow-md border border-wine-800">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-cream-200/60 font-medium">Total Investment</span>
                <span className="font-serif text-2xl font-bold text-cream-100">{formatPrice(course.price)}</span>
              </div>
              <div className="h-8 w-px bg-wine-800 mx-1" />
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5" /> Full Access
              </span>
            </div>
          </div>

          {/* 2-Step Enrollment Process Visual Bar */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-cream-50 border border-wine-900/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-wine-700 text-cream-100 font-bold text-sm shadow-sm">
                1
              </span>
              <div>
                <h4 className="text-sm font-semibold text-wine-900">Step 1: Send Payment</h4>
                <p className="text-xs text-wine-900/60">Transfer the course fee to any bank listed below.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-wine-50/60 border border-wine-700/15">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-wine-900 text-cream-100 font-bold text-sm shadow-sm">
                2
              </span>
              <div>
                <h4 className="text-sm font-semibold text-wine-900">Step 2: Confirm via Telegram</h4>
                <p className="text-xs text-wine-900/60">Send your screenshot to receive your access link immediately.</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Bank Accounts List (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-wine-900/60">
                    Official Payment Accounts
                  </h3>
                  <span className="text-xs text-wine-700 font-medium flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Holder: <strong className="text-wine-900 font-semibold">Daniel Wodajo</strong>
                  </span>
                </div>

                <div className="space-y-3.5">
                  {bankAccounts.map((acc) => {
                    const AccIcon = acc.icon;
                    const isCopied = copiedAccount === acc.bank;
                    return (
                      <div 
                        key={acc.bank} 
                        className="group relative p-4 sm:p-5 rounded-2xl bg-cream-50/70 border border-wine-900/10 hover:border-wine-700/30 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="p-3.5 rounded-2xl bg-wine-900 text-cream-100 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                            <AccIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-wine-950 text-sm sm:text-base">{acc.bank}</p>
                              {acc.badge && (
                                <span className="px-2 py-0.5 rounded-md bg-wine-100 text-wine-800 text-[10px] font-bold tracking-wide uppercase">
                                  {acc.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-wine-900/60 mt-0.5">
                              Account Name: <span className="font-medium text-wine-900">{acc.accountName}</span>
                            </p>
                            <p className="font-mono text-sm sm:text-base font-bold text-wine-900 mt-1 tracking-wider bg-white/80 px-2.5 py-0.5 rounded-lg border border-wine-900/10 inline-block">
                              {acc.accountNumber}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => copyToClipboard(acc.accountNumber.replace(/\s+/g, ''), acc.bank)}
                          className={`self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                            isCopied 
                              ? 'bg-emerald-600 text-white shadow-sm' 
                              : 'bg-white text-wine-900 border border-wine-700/20 hover:bg-wine-700 hover:text-cream-100 shadow-sm'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Number</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-wine-900/50">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>All transactions are manually verified for immediate course enrollment.</span>
              </div>
            </div>

            {/* Right: Telegram Screenshot Submission Card (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-wine-950 via-wine-900 to-wine-950 text-cream-100 p-6 sm:p-8 shadow-xl border border-wine-800/80 flex flex-col justify-between relative overflow-hidden group">
              {/* Background ambient orb */}
              <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-wine-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-wine-500/30 transition-all duration-700" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md text-cream-100 flex items-center justify-center border border-white/15 shadow-inner">
                    <Send className="h-6 w-6 text-sky-300" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-cream-200 uppercase tracking-wider">
                    Step 2 Confirmation
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-cream-100 tracking-tight">
                  Send Payment Receipt
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/80 mt-2 leading-relaxed">
                  Take a screenshot of your transfer receipt and send it to our official Telegram support channel to get your instant enrollment confirmation.
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[11px] uppercase tracking-wider text-cream-200/60 font-semibold block">Official Telegram Channel</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-base font-bold text-cream-100">@Kadanie_Courses</span>
                    <button
                      onClick={() => copyToClipboard('@Kadanie_Courses', 'telegram')}
                      className="text-xs text-cream-200/80 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {copiedAccount === 'telegram' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedAccount === 'telegram' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-cream-100 px-6 py-4 text-sm font-bold text-wine-950 shadow-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Send className="h-4 w-4 text-sky-600" />
                  Send Receipt on Telegram
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-center text-[11px] text-cream-200/50 mt-3">
                  Average response time: &lt; 15 minutes
                </p>
              </div>
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
