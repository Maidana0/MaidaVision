
import GithubLogin from "./buttons/github-login"
import GoogleLogin from "./buttons/google-login"

const ContinueWith = () => {
  return (<section className="space-y-6">
    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
      <span className="bg-card text-muted-foreground relative z-10 px-2">
        Or continue with
      </span>
    </div>

    <div className="flex flex-col gap-4 max-w-4/6 mx-auto min-w-fit">
      <GithubLogin />
      <GoogleLogin />
    </div>
  </section>
  )
}

export default ContinueWith;