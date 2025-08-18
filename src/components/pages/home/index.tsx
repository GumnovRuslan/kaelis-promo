import { 
  Hero,
  Subscribe, 
  ArticlesPopular,
  AboutApp,
  Message,
} from "@/components/sections";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Subscribe />
      <ArticlesPopular />
      <AboutApp />
      <Message textIsShow/>
    </>
  )
}

export default HomePage;