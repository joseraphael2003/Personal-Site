import { getProfileData } from "@/db/queries";
import { HomePage } from "@/components/home-page";

// ISR: Serve cached HTML, revalidate every hour
export const revalidate = 3600;

export default async function Page() {
  const data = await getProfileData();
  return <HomePage data={data} />;
}
