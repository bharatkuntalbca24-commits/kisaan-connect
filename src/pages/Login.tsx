import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, User, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInWithGoogle, signInWithEmail, registerWithEmail } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mode, setMode] = useState<Mode>('login');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err: any) {
      toast({ title: 'लॉगिन विफल', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        if (!displayName.trim()) throw new Error('कृपया अपना नाम दर्ज करें');
        await registerWithEmail(email, password, displayName, phone);
      }
      navigate('/');
    } catch (err: any) {
      const msg = err.code === 'auth/wrong-password'
        ? 'गलत पासवर्ड। कृपया दोबारा कोशिश करें।'
        : err.code === 'auth/user-not-found'
        ? 'यह ईमेल पंजीकृत नहीं है।'
        : err.code === 'auth/email-already-in-use'
        ? 'यह ईमेल पहले से पंजीकृत है।'
        : err.message;
      toast({ title: 'त्रुटि', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
          <Sprout className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">किसान Connect</h1>
        <p className="text-muted-foreground mt-1">खेती के उपकरण, आपके पास</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-xl border border-border">
        {/* Tab Toggle */}
        <div className="flex rounded-xl bg-secondary p-1 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'login'
                ? 'bg-primary text-primary-foreground shadow'
                : 'text-muted-foreground'
            }`}
          >
            लॉग इन
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'register'
                ? 'bg-primary text-primary-foreground shadow'
                : 'text-muted-foreground'
            }`}
          >
            रजिस्टर
          </button>
        </div>

        {/* Google Sign-In */}
        <Button
          variant="outline"
          className="w-full h-12 gap-3 mb-4 rounded-xl border-border font-medium"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google से जारी रखें
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <hr className="flex-1 border-border" />
          <span className="text-xs text-muted-foreground">या</span>
          <hr className="flex-1 border-border" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'register' && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="पूरा नाम"
                  className="pl-9 h-12 rounded-xl"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="मोबाइल नंबर"
                  type="tel"
                  className="pl-9 h-12 rounded-xl"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ईमेल पता"
              type="email"
              className="pl-9 h-12 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="पासवर्ड"
              type={showPass ? 'text' : 'password'}
              className="pl-9 pr-10 h-12 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-base font-bold mt-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : mode === 'login' ? 'लॉग इन करें' : 'अकाउंट बनाएं'}
          </Button>
        </form>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        उपयोग करके आप हमारी गोपनीयता नीति से सहमत हैं
      </p>
    </div>
  );
}
