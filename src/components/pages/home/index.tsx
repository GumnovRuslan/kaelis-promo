import { 
  Hero,
  Subscribe, 
  ArticlesPopular,
  AboutApp,
  Message,
  Questionnaire,
  Test
} from "@/components/sections";

const HomePage = () => {
  return (
    <>
      <Test/>
      <Hero />
      <Subscribe />
      <ArticlesPopular />
      <Questionnaire/>
      <AboutApp />
      <Message textIsShow/>
    </>
  )
}

export default HomePage;