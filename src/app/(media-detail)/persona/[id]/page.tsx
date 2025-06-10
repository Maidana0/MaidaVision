import { MaintenanceNotice } from "maidana07/components/maintenance-notice"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Persona"
}

// const page = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = await params
const page = async () => {
  return (
    <MaintenanceNotice
      type="construction"
      estimatedTime="No sé xd"
    />
  )
}

export default page