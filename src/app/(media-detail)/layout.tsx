import { headers } from 'next/headers'


export default function MediaLayout({
  children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-red-700" >
    {children}
  </div>
}