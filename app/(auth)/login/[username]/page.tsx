'use client' 
import { useState, use } from 'react' 
import { useRouter } from 'next/navigation' 
import { Button } from '@/components/ui/button' 
import { Input } from '@/components/ui/input' 
import { Label } from '@/components/ui/label' 
import { Card } from '@/components/ui/card' 
import { useToast } from '@/components/ui/use-toast' 
import { supabase } from '@/lib/supabase' 

export default function LoginPage({ params }: { params: Promise<{ username: string }> }) { 
  const { username } = use(params)
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [confirmPw, setConfirmPw] = useState('') 
  const [isSignup, setIsSignup] = useState(false) 
  const [loading, setLoading] = useState(false) 
  const router = useRouter() 
  const { toast } = useToast() 

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault() 
    setLoading(true) 

    try { 
      if (isSignup) { 
        if (password !== confirmPw) { 
          toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' }) 
          return 
        } 

        const { data: authData, error: signUpError } = await supabase.auth.signUp({ email, password }) 
        if (signUpError) throw signUpError

        if (authData.user) { 
          await supabase.from('profiles').insert([{ 
            user_id: authData.user.id, 
            username: username, 
            full_name: null, 
            bio: null, 
          }]) 
        } 
      } else { 
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password }) 
        if (signInError) throw signInError
      } 

      toast({ title: 'Success', description: isSignup ? 'Account created' : 'Logged in' }) 
      router.push('/dashboard') 
    } catch (error: any) { 
      toast({ title: 'Error', description: error.message, variant: 'destructive' }) 
    } finally { 
      setLoading(false) 
    } 
  } 

  return ( 
    <Card className="p-8"> 
      <h1 className="text-2xl font-bold mb-2">{isSignup ? 'Create Account' : 'Login'}</h1> 
      <p className="text-gray-600 mb-6">Username: {username}</p> 

      <form onSubmit={handleSubmit} className="space-y-4"> 
        <div> 
          <Label>Email</Label> 
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> 
        </div> 
        <div> 
          <Label>Password</Label> 
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> 
        </div> 
        {isSignup && ( 
          <div> 
            <Label>Confirm Password</Label> 
            <Input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required /> 
          </div> 
        )} 
        <Button type="submit" className="w-full" disabled={loading}> 
          {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Login'} 
        </Button> 
      </form> 

      <button onClick={() => setIsSignup(!isSignup)} className="text-sm text-blue-600 mt-4 hover:underline"> 
        {isSignup ? 'Already have account? Login' : 'Need account? Create one'} 
      </button> 
    </Card> 
  ) 
} 
