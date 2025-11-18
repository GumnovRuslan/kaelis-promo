import { 
  Hero,
  Subscribe, 
  ArticlesPopular,
  AboutApp,
  Message,
  Questionnaire,
  TestModal,
} from "@/components/sections";
import { TestModalProvider } from "@/context/TestModalContext";

const HomePage = () => {
  return (
    <TestModalProvider>
      <Hero />
      <Subscribe />
      <ArticlesPopular />
      <Questionnaire/>
      <AboutApp />
      <Message textIsShow/>

      <TestModal/>
    </TestModalProvider>
  )
}

export default HomePage;