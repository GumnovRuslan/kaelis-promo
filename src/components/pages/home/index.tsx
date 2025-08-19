import { 
  Hero,
  Subscribe, 
  ArticlesPopular,
  AboutApp,
  Message,
  DailyCard,
} from "@/components/sections";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Subscribe />
      {/* <DailyCard/> */}
      <ArticlesPopular />
      <AboutApp />
      <Message textIsShow/>
    </>
  )
}

export default HomePage;