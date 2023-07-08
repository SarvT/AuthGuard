export default function UserProfile({params}: any){
    return <div
    className="min-h-screen bg-indigo-700 text-center items-center justify-center text-2xl p-4 font-mono uppercase">
        <h1>This is the profile page.</h1>
        <p className="text-4xl text-left text-cyan-400">Profile Id {params.id}</p>
    </div>
}

