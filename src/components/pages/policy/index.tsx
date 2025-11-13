import { PrivacyPolicy, Message } from "@/components/sections";
import { TPolicy } from "@/types/policy";

type TProps = {
  data: TPolicy
}


const PolicyPage = ({data}: TProps) => {
  return (
    <>
      <PrivacyPolicy {...data}/>
      <Message />
    </>
  )
}

export default PolicyPage;