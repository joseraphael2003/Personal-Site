import { getProfileData } from "@/db/queries";
import { HomePage } from "@/components/home-page";

// Option to revalidate data periodically or on every request
export const revalidate = 0; // Dynamic for dev; change to 3600 for prod

export default async function Page() {
  const data = await getProfileData();
  return <HomePage data={data} />;
}
