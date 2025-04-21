import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

const ButtonLogout = () => {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default ButtonLogout